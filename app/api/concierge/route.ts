import { NextRequest, NextResponse } from "next/server";
import { siteConfig, themeNights } from "@/lib/site";

export const runtime = "edge";

const MAX_HISTORY = 8;
const MAX_QUESTION = 300;
const TIMEOUT_MS = 8_000;

type IncomingMessage = { role?: unknown; text?: unknown };

function sanitizeHistory(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .slice(-MAX_HISTORY)
    .map((item: IncomingMessage) => ({
      role: item?.role === "assistant" ? "assistant" : "user",
      text: typeof item?.text === "string" ? item.text.slice(0, 500) : "",
    }))
    .filter((item) => item.text.length > 0);
}

function deterministicFallback(question: string) {
  const q = question.toLowerCase();
  if (q.includes("week") || q.includes("tonight") || q.includes("event") || q.includes("theme")) {
    return themeNights.some((night) => night.active)
      ? themeNights
          .filter((night) => night.active)
          .map((night) => `${night.day}: ${night.title} — ${night.detail}`)
          .join("\n")
      : "The confirmed weekly programme has not been published yet. I’ll only advertise a theme night once Micah Lounge has confirmed it.";
  }
  if (q.includes("table") || q.includes("book") || q.includes("reservation")) {
    return "Send the date, preferred time and number of guests and I’ll help structure a table request. The direct booking channel will appear here once the venue contact is confirmed.";
  }
  if (q.includes("where") || q.includes("location") || q.includes("direction")) {
    return siteConfig.contact.address
      ? `${siteConfig.name} is at ${siteConfig.contact.address}.`
      : "The verified venue address has not been published in the site content yet, so I won’t guess.";
  }
  return `${siteConfig.name} is being presented as a nightlife destination for music, food, drinks, celebrations and recurring theme nights.`;
}

export async function POST(request: NextRequest) {
  let body: { question?: unknown; history?: unknown };
  try {
    body = (await request.json()) as { question?: unknown; history?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const question = typeof body.question === "string" ? body.question.trim().slice(0, MAX_QUESTION) : "";
  if (!question) return NextResponse.json({ error: "Question is required" }, { status: 400 });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ answer: deterministicFallback(question), mode: "grounded-fallback" });

  const history = sanitizeHistory(body.history);
  const confirmedNights = themeNights.filter((night) => night.active);
  const venueFacts = {
    name: siteConfig.name,
    city: siteConfig.city,
    country: siteConfig.country,
    description: siteConfig.description,
    address: siteConfig.contact.address || "NOT CONFIRMED",
    phone: siteConfig.contact.phone || "NOT CONFIRMED",
    whatsapp: siteConfig.contact.whatsapp || "NOT CONFIRMED",
    themeNights: confirmedNights.length ? confirmedNights : "NO CONFIRMED THEME NIGHTS PUBLISHED",
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
        max_output_tokens: 180,
        input: [
          {
            role: "system",
            content:
              "You are Micah Lounge Concierge. Be warm, concise and commercially useful. Use ONLY the supplied venue facts. Never invent event dates, offers, prices, opening hours, phone numbers, addresses or artists. If a fact is not confirmed, say it is not yet published. Encourage a table enquiry when relevant. Keep answers under 90 words.",
          },
          {
            role: "user",
            content: `VENUE FACTS:\n${JSON.stringify(venueFacts)}\n\nRECENT CHAT:\n${JSON.stringify(history)}\n\nQUESTION:\n${question}`,
          },
        ],
      }),
      signal: controller.signal,
    });

    if (!upstream.ok) {
      return NextResponse.json({ answer: deterministicFallback(question), mode: "grounded-fallback" });
    }

    const data = (await upstream.json()) as {
      output_text?: string;
      output?: Array<{ content?: Array<{ text?: string }> }>;
    };
    const answer =
      data.output_text?.trim() || data.output?.flatMap((item) => item.content ?? []).map((item) => item.text ?? "").join(" ").trim();

    return NextResponse.json({ answer: answer || deterministicFallback(question), mode: "ai" });
  } catch {
    return NextResponse.json({ answer: deterministicFallback(question), mode: "grounded-fallback" });
  } finally {
    clearTimeout(timeout);
  }
}
