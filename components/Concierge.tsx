"use client";

import { FormEvent, useMemo, useState } from "react";

type Message = { role: "assistant" | "user"; text: string };

const QUICK_ASKS = ["What’s on this week?", "I want a table", "Tell me about Micah", "How do I get there?"];

function fallbackAnswer(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("week") || q.includes("tonight") || q.includes("event") || q.includes("theme")) {
    return "The confirmed weekly programme has not been published yet. Once the theme nights are loaded, I’ll give you the exact night, date and offer here.";
  }
  if (q.includes("table") || q.includes("book") || q.includes("reservation")) {
    return "I can help prepare a table request. Send the date, preferred time and number of guests. Micah’s direct booking channel will be linked here once the venue contact is confirmed.";
  }
  if (q.includes("where") || q.includes("location") || q.includes("direction")) {
    return "The verified map location has not been added to the site yet, so I won’t guess. Once the exact Micah Lounge address is confirmed, I’ll provide one-tap directions.";
  }
  if (q.includes("micah") || q.includes("about")) {
    return "Micah Lounge is being positioned as a premium, energetic nightlife destination centred on music, food, drinks, celebrations and recurring theme nights.";
  }
  return "I can help with theme nights, tables, venue information and directions. Ask me one of those and I’ll keep the answer grounded in Micah Lounge’s published information.";
}

export function Concierge() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Welcome to Micah Lounge. Ask me about this week’s programme, theme nights, tables or venue information.",
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
          The concierge is grounded in the venue’s published information. It can handle event questions and table enquiries without inventing details.
        </p>
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
          />
          <button type="submit" disabled={busy || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
