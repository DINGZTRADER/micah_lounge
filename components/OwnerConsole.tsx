"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "micah-owner-draft-v1";

type EventDraft = {
  day: string;
  title: string;
  detail: string;
};

type OwnerDraft = {
  address: string;
  mapUrl: string;
  whatsapp: string;
  phone: string;
  email: string;
  openingHours: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  events: EventDraft[];
};

const EMPTY_DRAFT: OwnerDraft = {
  address: "",
  mapUrl: "",
  whatsapp: "",
  phone: "",
  email: "",
  openingHours: "",
  instagram: "",
  facebook: "",
  tiktok: "",
  events: [
    { day: "Wednesday", title: "", detail: "" },
    { day: "Thursday", title: "", detail: "" },
    { day: "Friday", title: "", detail: "" },
    { day: "Saturday", title: "", detail: "" },
  ],
};

export function OwnerConsole() {
  const [draft, setDraft] = useState<OwnerDraft>(EMPTY_DRAFT);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      setDraft(JSON.parse(saved) as OwnerDraft);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const payload = useMemo(
    () => ({
      venue: {
        address: draft.address.trim(),
        mapUrl: draft.mapUrl.trim(),
        contact: {
          whatsapp: draft.whatsapp.trim(),
          phone: draft.phone.trim(),
          email: draft.email.trim(),
        },
        openingHours: draft.openingHours
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
        social: {
          instagram: draft.instagram.trim(),
          facebook: draft.facebook.trim(),
          tiktok: draft.tiktok.trim(),
        },
      },
      confirmedThemeNights: draft.events
        .map((event) => ({
          day: event.day.trim(),
          title: event.title.trim(),
          detail: event.detail.trim(),
        }))
        .filter((event) => event.day && event.title),
    }),
    [draft],
  );

  const completion = useMemo(() => {
    const checks = [
      draft.address.trim(),
      draft.whatsapp.trim() || draft.phone.trim(),
      draft.openingHours.trim(),
      draft.events.some((event) => event.title.trim()),
    ];
    return checks.filter(Boolean).length;
  }, [draft]);

  function update<K extends keyof OwnerDraft>(key: K, value: OwnerDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function updateEvent(index: number, key: keyof EventDraft, value: string) {
    setDraft((current) => ({
      ...current,
      events: current.events.map((event, eventIndex) =>
        eventIndex === index ? { ...event, [key]: value } : event,
      ),
    }));
  }

  function saveDraft() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    setNotice("Draft saved on this device.");
  }

  async function copyPayload() {
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setNotice("Venue payload copied. Send it to the developer to publish.");
  }

  function downloadPayload() {
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "micah-lounge-content.json";
    link.click();
    URL.revokeObjectURL(url);
    setNotice("micah-lounge-content.json created.");
  }

  function resetDraft() {
    window.localStorage.removeItem(STORAGE_KEY);
    setDraft(EMPTY_DRAFT);
    setNotice("Draft reset.");
  }

  return (
    <main className="owner-shell">
      <style jsx global>{`
        :root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#09080b;color:#f7f2f8;font-family:Inter,system-ui,sans-serif}.owner-shell{width:min(1180px,calc(100% - 28px));margin:0 auto;padding:32px 0 80px}.owner-top{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;padding-bottom:26px;border-bottom:1px solid rgba(255,255,255,.12)}.owner-kicker{margin:0 0 8px;color:#ff4fd8;font-size:.72rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase}.owner-top h1{margin:0;font-size:clamp(2.4rem,7vw,5.8rem);letter-spacing:-.07em;line-height:.9}.owner-top p{max-width:650px;color:#b9afbd;line-height:1.6}.status{border:1px solid rgba(242,204,114,.3);background:rgba(242,204,114,.07);color:#f2cc72;border-radius:999px;padding:8px 12px;font-size:.72rem;font-weight:900;white-space:nowrap}.owner-grid{display:grid;grid-template-columns:1fr .78fr;gap:20px;margin-top:26px}.panel{border:1px solid rgba(255,255,255,.12);border-radius:20px;background:#121017;padding:22px}.panel h2{margin:0 0 6px;font-size:1.3rem}.panel-intro{margin:0 0 20px;color:#9f96a3;line-height:1.55}.field-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.field{display:grid;gap:7px}.field.full{grid-column:1/-1}.field label{font-size:.72rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#c9c1cc}.field input,.field textarea{width:100%;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:#0d0b10;color:#fff;padding:12px 13px;outline:none}.field input:focus,.field textarea:focus{border-color:rgba(255,79,216,.65)}.field textarea{min-height:92px;resize:vertical}.events{display:grid;gap:10px}.event-row{display:grid;grid-template-columns:110px .9fr 1.4fr;gap:10px}.event-row input{width:100%;border:1px solid rgba(255,255,255,.12);border-radius:10px;background:#0d0b10;color:#fff;padding:11px}.actions{display:flex;flex-wrap:wrap;gap:9px;margin-top:20px}.actions button{border:1px solid rgba(255,255,255,.13);border-radius:999px;background:transparent;color:#fff;padding:10px 14px;font-weight:800;cursor:pointer}.actions button.primary{border:0;background:linear-gradient(110deg,#ff4fd8,#8f68ff)}.actions button:hover{transform:translateY(-1px)}.checklist{display:grid;gap:10px;margin:18px 0}.check{display:flex;justify-content:space-between;gap:20px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);color:#b9afbd}.check strong{color:#fff}.payload{width:100%;min-height:360px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:#08070a;color:#c9c1cc;padding:14px;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:.76rem;line-height:1.5;resize:vertical}.notice{margin:14px 0 0;color:#59f2a8;font-size:.86rem}.owner-note{margin-top:18px;border-left:3px solid #f2cc72;padding:14px 16px;background:rgba(242,204,114,.05);color:#c7beca;line-height:1.55}.owner-note strong{color:#f2cc72}.back{display:inline-block;margin-top:20px;color:#f2cc72;font-weight:800}@media(max-width:860px){.owner-grid{grid-template-columns:1fr}.owner-top{flex-direction:column}.event-row{grid-template-columns:1fr}.field-grid{grid-template-columns:1fr}.field.full{grid-column:auto}}`}</style>

      <header className="owner-top">
        <div>
          <p className="owner-kicker">Micah Lounge / Owner Console</p>
          <h1>Prepare the live venue content.</h1>
          <p>
            Enter only confirmed Micah Lounge information. This console saves a draft on this device and produces a clean content file for publication.
          </p>
        </div>
        <span className="status">{completion}/4 launch groups ready</span>
      </header>

      <div className="owner-grid">
        <section className="panel">
          <h2>Venue details</h2>
          <p className="panel-intro">These fields replace the current “to be confirmed” placeholders.</p>
          <div className="field-grid">
            <div className="field full"><label>Exact address</label><input value={draft.address} onChange={(e) => update("address", e.target.value)} placeholder="Full venue address" /></div>
            <div className="field full"><label>Google Maps URL</label><input value={draft.mapUrl} onChange={(e) => update("mapUrl", e.target.value)} placeholder="https://maps.google.com/..." /></div>
            <div className="field"><label>WhatsApp</label><input value={draft.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="+256..." /></div>
            <div className="field"><label>Phone</label><input value={draft.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+256..." /></div>
            <div className="field full"><label>Email</label><input value={draft.email} onChange={(e) => update("email", e.target.value)} placeholder="bookings@..." /></div>
            <div className="field full"><label>Opening hours — one line per schedule</label><textarea value={draft.openingHours} onChange={(e) => update("openingHours", e.target.value)} placeholder={"Mon–Thu: 5pm–2am\nFri–Sat: 5pm–4am"} /></div>
            <div className="field"><label>Instagram</label><input value={draft.instagram} onChange={(e) => update("instagram", e.target.value)} /></div>
            <div className="field"><label>Facebook</label><input value={draft.facebook} onChange={(e) => update("facebook", e.target.value)} /></div>
            <div className="field full"><label>TikTok</label><input value={draft.tiktok} onChange={(e) => update("tiktok", e.target.value)} /></div>
          </div>

          <h2 style={{ marginTop: 28 }}>Weekly theme nights</h2>
          <p className="panel-intro">Replace the concept board with confirmed weekly promotions.</p>
          <div className="events">
            {draft.events.map((event, index) => (
              <div className="event-row" key={index}>
                <input aria-label={`Event ${index + 1} day`} value={event.day} onChange={(e) => updateEvent(index, "day", e.target.value)} placeholder="Day" />
                <input aria-label={`Event ${index + 1} title`} value={event.title} onChange={(e) => updateEvent(index, "title", e.target.value)} placeholder="Theme-night title" />
                <input aria-label={`Event ${index + 1} detail`} value={event.detail} onChange={(e) => updateEvent(index, "detail", e.target.value)} placeholder="Music / offer / host / dress cue" />
              </div>
            ))}
          </div>

          <div className="actions">
            <button className="primary" type="button" onClick={saveDraft}>Save draft</button>
            <button type="button" onClick={copyPayload}>Copy content</button>
            <button type="button" onClick={downloadPayload}>Download JSON</button>
            <button type="button" onClick={resetDraft}>Reset</button>
          </div>
          {notice ? <p className="notice">{notice}</p> : null}
        </section>

        <aside className="panel">
          <h2>Launch checklist</h2>
          <p className="panel-intro">The public website should stay in prototype mode until these are confirmed.</p>
          <div className="checklist">
            <div className="check"><strong>Location</strong><span>{draft.address.trim() ? "Ready" : "Missing"}</span></div>
            <div className="check"><strong>Contact</strong><span>{draft.whatsapp.trim() || draft.phone.trim() ? "Ready" : "Missing"}</span></div>
            <div className="check"><strong>Opening hours</strong><span>{draft.openingHours.trim() ? "Ready" : "Missing"}</span></div>
            <div className="check"><strong>Weekly programme</strong><span>{draft.events.some((e) => e.title.trim()) ? "Ready" : "Missing"}</span></div>
          </div>

          <h2>Publication payload</h2>
          <p className="panel-intro">This is the exact structured information needed to switch Micah from prototype to live venue mode.</p>
          <textarea className="payload" readOnly value={JSON.stringify(payload, null, 2)} aria-label="Micah Lounge publication payload" />

          <div className="owner-note"><strong>Important:</strong> this page does not publish changes directly. It intentionally keeps owner drafts separate from the public site until the details are reviewed.</div>
          <a className="back" href="/">← Back to public prototype</a>
        </aside>
      </div>
    </main>
  );
}
