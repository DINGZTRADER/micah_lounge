"use client";

import { FormEvent, useMemo, useState } from "react";

import { confirmedThemeNights, conceptThemeNights, siteConfig } from "@/lib/site";

type Message = { role: "assistant" | "user"; text: string };

const QUICK_ASKS = [
  "What can you help me with?",
  "Show me the theme-night ideas",
  "I want a table",
  "What are your opening hours?",
];

function fallbackAnswer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("idea") || q.includes("theme") || q.includes("week") || q.includes("event")) {
    if (confirmedThemeNights.length > 0) {
      return confirmedThemeNights
        .map((night) => `${night.day}: ${night.title} — ${night.detail}`)
        .join("\n");
    }

    return `The live weekly programme has not been confirmed yet. The prototype currently demonstrates these campaign ideas: ${conceptThemeNights
      .map((night) => `${night.day} — ${night.title}`)
      .join(", ")}. They are concepts for owner approval, not advertised events.`;
  }

  if (q.includes("table") || q.includes("book") || q.includes("reservation")) {
    return "I can prepare a table request. Tell me the date, preferred arrival time and number of guests. The direct booking button will activate as soon as Mica Lounge's verified WhatsApp or phone number is added.";
  }

  if (q.includes("hour") || q.includes("open") || q.includes("close")) {
    return siteConfig.openingHours.length > 0
      ? `Published opening hours: ${siteConfig.openingHours.join("; ")}.`
      : "Mica Lounge's verified opening hours have not been added yet, so I will not guess.";
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
      : "Mica Lounge's verified map location has not been added yet, so I will not guess. Once confirmed, this will become one-tap directions.";
  }

  if (q.includes("help") || q.includes("what can")) {
    return "I can explain the weekly programme, help organise a table request, answer venue questions and provide opening hours, contacts and directions once those details are verified and published.";
  }

  if (q.includes("mica") || q.includes("about")) {
    return `${siteConfig.name} is being presented as a mobile-first lounge experience centred on music, tables, celebrations and recurring theme-night campaigns.`;
  }

  return "Ask me about theme nights, table planning, opening hours, contacts or directions. I only use Mica Lounge information that has been confirmed in the website data.";
}

export function Concierge() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Welcome to Mica Lounge. I can help with the weekly programme, table planning and venue information — without making up details.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const transcript = useMemo(() => messages.slice(-8), [messages]);

  async function ask(question: string) {
    const clean = question.trim().slice(0, 300);
    if (!clean || busy) return;

    setMessages((current) => [...current, { role: "user", text: clean }]);
    setInput("");
    setBusy(true);

    try {
      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: clean, history: transcript }),
      });

      if (!response.ok) throw new Error("Concierge unavailable");

      const data = (await response.json()) as { answer?: string };
      const answer = data.answer?.trim() || fallbackAnswer(clean);
      setMessages((current) => [...current, { role: "assistant", text: answer }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", text: fallbackAnswer(clean) }]);
    } finally {
      setBusy(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  return (
    <section className="concierge-shell" id="concierge" aria-labelledby="concierge-heading">
      <div className="concierge-copy">
        <p className="eyebrow">Mica intelligent concierge</p>
        <h2 id="concierge-heading">Ask before you arrive.</h2>
        <p>
          One place for programme questions, table planning and venue information. The concierge is deliberately grounded so it does not invent prices, artists, offers, opening hours or contact details.
        </p>
        <div className="concierge-trust-row" aria-label="Concierge safeguards">
          <span>Concierge ready</span>
          <span>Fact grounded</span>
          <span>Mobile first</span>
        </div>
        <div className="quick-asks" aria-label="Quick questions">
          {QUICK_ASKS.map((question) => (
            <button key={question} type="button" onClick={() => void ask(question)} disabled={busy}>
              {question}
            </button>
          ))}
        </div>
      </div>

      <div className="chat-card" aria-live="polite">
        <div className="chat-topline">
          <span className="status-dot" />
          MICA CONCIERGE
          <span className="chat-mode">ONLINE</span>
        </div>
        <div className="messages">
          {messages.map((message, index) => (
            <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
              {message.text}
            </div>
          ))}
          {busy ? <div className="message assistant">Checking Mica Lounge information…</div> : null}
        </div>
        <form onSubmit={submit} className="chat-form">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Mica…"
            aria-label="Ask Mica Concierge"
            maxLength={300}
            autoComplete="off"
          />
          <button type="submit" disabled={busy || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
