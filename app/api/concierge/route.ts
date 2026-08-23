import { NextRequest, NextResponse } from "next/server";

import {
  conceptThemeNights,
  confirmedThemeNights,
  siteConfig,
} from "@/lib/site";

export const runtime = "nodejs";

const MAX_HISTORY = 8;
const MAX_QUESTION = 300;
const MAX_BODY_BYTES = 12_000;
const TIMEOUT_MS = 8_000;

type IncomingMessage = { role?: unknown; text?: unknown };

type ResponsePayload = {
  output_text?: string;
  output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
};

function sanitizeHistory(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .slice(-MAX_HISTORY)
    .map((item: IncomingMessage) => ({
      role: item?.role === "assistant" ? "assistant" : "user",
      text: typeof item?.text === "string" ? item.text.trim().slice(0, 500) : "",
    }))
    .filter((item) => item.text.length > 0);
}

function deterministicFallback(question: string) {
  const q = question.toLowerCase();

  if (q.includes("week") || q.includes("tonight") || q.includes("event") || q.includes("theme") || q.includes("idea")) {
    if (confirmedThemeNights.length > 0) {
      return confirmedThemeNights
        .map((night) => `${night.day}: ${night.title} — ${night.detail}`)
        .join("\n");
    }

    return `Mica Lounge has not published a confirmed weekly programme in this prototype yet. The advertising board currently demonstrates concept ideas only: ${conceptThemeNights
      .map((night) => `${night.day} — ${night.title}`)
      .join(", ")}.`;
  }

  if (q.includes("table") || q.includes("book") || q.includes("reservation")) {
    return "Send the date, preferred arrival time and number of guests and I can structure a table request. The direct booking channel will activate once Mica Lounge's verified contact is added.";
  }

  if (q.includes("hour") || q.includes("open") || q.includes("close")) {
    return siteConfig.openingHours.length > 0
      ? `Published opening hours: ${siteConfig.openingHours.join("; ")}.`
      : "Mica Lounge's verified opening hours have not been published in the prototype yet, so I will not guess.";
  }

  if (q.includes("phone") || q.includes("whatsapp") || q.includes("contact") || q.includes("number")) {
    if (siteConfig.contact.whatsapp || siteConfig.contact.phone) {
      return `Published contact details: ${siteConfig.contact.whatsapp || siteConfig.contact.phone}.`;
    }
    return "Mica Lounge's verified phone or WhatsApp number has not been published in the prototype yet.";
  }

  if (q.includes("where") || q.includes("location") || q.includes("direction")) {
    return siteConfig.location.address
      ? `${siteConfig.name} is at ${siteConfig.location.address}.`
      : "Mica Lounge's verified address has not been published in the prototype yet, so I will not guess.";
  }

  if (q.includes("help") || q.includes("what can")) {
    return "I can explain the weekly programme, help organise a table request, answer venue questions and provide opening hours, contacts and directions once Mica Lounge's verified details are published.";
  }

  return `${siteConfig.name} is being presented as a lounge experience focused on music, tables, celebrations and recurring theme-night campaigns.`;
}

function extractAnswer(data: ResponsePayload): string {
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  return (data.output ?? [])
    .flatMap((item) => item.content ?? [])
    .filter((item) => item.type === "output_text" || typeof item.text === "string")
    .map((item) => item.text ?? "")
    .join(" ")
    .trim();
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  let body: { question?: unknown; history?: unknown };

  try {
    body = (await request.json()) as { question?: unknown; history?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const question =
    typeof body.question === "string"
      ? body.question.trim().slice(0, MAX_QUESTION)
      : "";

  if (!question) {
    return NextResponse.json({ error: "Question is required" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { answer: deterministicFallback(question), mode: "grounded-fallback" },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const history = sanitizeHistory(body.history);
  const venueFacts = {
    name: siteConfig.name,
    description: siteConfig.description,
    locationStatus: siteConfig.location.status,
    locationLabel: siteConfig.location.label,
    address: siteConfig.location.address || "NOT CONFIRMED",
    phone: siteConfig.contact.phone || "NOT CONFIRMED",
    whatsapp: siteConfig.contact.whatsapp || "NOT CONFIRMED",
    openingHours: siteConfig.openingHours.length > 0 ? siteConfig.openingHours : "NOT CONFIRMED",
    confirmedThemeNights:
      confirmedThemeNights.length > 0 ? confirmedThemeNights : "NONE PUBLISHED",
    prototypeConcepts:
      confirmedThemeNights.length === 0 ? conceptThemeNights : "NOT NEEDED",
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
        reasoning: { effort: "low" },
        input: [
          {
            role: "developer",
            content:
              "You are Mica Lounge Concierge. Be warm, concise and commercially useful. Use ONLY the supplied venue facts. Never invent event dates, offers, prices, opening hours, phone numbers, addresses, DJs, artists or social handles. Prototype concepts are NOT confirmed events: if mentioning one, explicitly call it a prototype idea. If a fact is not confirmed, say it is not yet published. Encourage a table enquiry when relevant. Keep answers under 90 words.",
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
      return NextResponse.json(
        { answer: deterministicFallback(question), mode: "grounded-fallback" },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const data = (await upstream.json()) as ResponsePayload;
    const answer = extractAnswer(data) || deterministicFallback(question);

    return NextResponse.json(
      { answer, mode: "ai" },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { answer: deterministicFallback(question), mode: "grounded-fallback" },
      { headers: { "Cache-Control": "no-store" } },
    );
  } finally {
    clearTimeout(timeout);
  }
}
