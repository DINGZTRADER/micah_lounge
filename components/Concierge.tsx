"use client";

import { FormEvent, useMemo, useState } from "react";

import { confirmedThemeNights, conceptThemeNights, siteConfig } from "@/lib/site";

type Message = { role: "assistant" | "user"; text: string };

const QUICK_ASKS = [
  "What can you help me with?",
  "Show me the theme-night ideas",
  "I want a table",
  "Where is Micah Lounge?",
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
    return "I can prepare a table request. Tell me the date, preferred arrival time and number of guests. The direct booking button will activate as soon as Micah Lounge's verified WhatsApp or phone number is added.";
  }

  if (q.includes("where") || q.includes("location") || q.includes("direction")) {
    return siteConfig.contact.address
      ? `${siteConfig.name} is at ${siteConfig.contact.address}.`
      : "Micah Lounge's verified map location has not been added yet, so I will not guess. Once confirmed, this will become one-tap directions.";
  }

  if (q.includes("help") || q.includes("what can")) {
    return "I can explain the weekly programme, help organise a table request, answer venue questions and give directions once the verified venue details are published.";
  }

  if (q.includes("micah") || q.includes("about")) {
    return `${siteConfig.name} is being presented as a mobile-first Kampala lounge experience centred on music, tables, celebrations and recurring theme-night campaigns.`;
  }

  return "Ask me about theme nights, table planning, venue information or directions. I only use Micah Lounge information that has been confirmed in the website data.";
}

export function Concierge() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Welcome to Micah Lounge. I can help with the weekly programme, table planning and venue information — without making up details.",
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
        <p className="eyebrow">Micah intelligent concierge</p>
        <h2 id="concierge-heading">Ask before you arrive.</h2>
        <p>
          One place for programme questions, table planning and venue information. The AI is deliberately grounded so it does not invent prices, artists, offers or contact details.
        </p>
        <div className="concierge-trust-row" aria-label="Concierge safeguards">
          <span>AI assisted</span>
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
          MICAH CONCIERGE
          <span className="chat-mode">ONLINE</span>
        </div>
        <div className="messages">
          {messages.map((message, index) => (
            <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
              {message.text}
            </div>
          ))}
          {busy ? <div className="message assistant">Checking Micah Lounge information…</div> : null}
        </div>
        <form onSubmit={submit} className="chat-form">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Micah…"
            aria-label="Ask Micah Concierge"
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
