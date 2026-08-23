"use client";

import { useMemo, useState } from "react";

type EventDraft = {
  day: string;
  title: string;
  detail: string;
};

type Props = {
  events: EventDraft[];
};

const ACCENTS = ["#ff4fd8", "#8f68ff", "#60e6ff", "#f2cc72"];

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines;
}

export function ThemePosterStudio({ events }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = useMemo(
    () => events[selectedIndex] ?? { day: "Theme Night", title: "", detail: "" },
    [events, selectedIndex],
  );

  const accent = ACCENTS[selectedIndex % ACCENTS.length];
  const title = selected.title.trim() || "THEME NIGHT TITLE";
  const detail = selected.detail.trim() || "Music • offer • host • dress cue";
  const day = selected.day.trim() || "Theme Night";

  function downloadPoster() {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 1080, 1350);
    gradient.addColorStop(0, "#0a0810");
    gradient.addColorStop(0.55, "#120d18");
    gradient.addColorStop(1, "#07070a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1350);

    const glow = ctx.createRadialGradient(780, 210, 20, 780, 210, 520);
    glow.addColorStop(0, `${accent}aa`);
    glow.addColorStop(1, `${accent}00`);
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 1080, 800);

    ctx.fillStyle = accent;
    ctx.fillRect(74, 72, 10, 1206);

    ctx.fillStyle = "#f7f2f8";
    ctx.font = "900 54px Arial, sans-serif";
    ctx.fillText("MICAH", 126, 154);
    ctx.fillStyle = accent;
    ctx.font = "800 26px Arial, sans-serif";
    ctx.fillText("LOUNGE", 126, 194);

    ctx.fillStyle = "#f2cc72";
    ctx.font = "800 24px Arial, sans-serif";
    ctx.fillText("OWNER DRAFT • SOCIAL POSTER", 126, 292);

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 78px Arial, sans-serif";
    ctx.fillText(day.toUpperCase(), 126, 422);

    ctx.font = "900 108px Arial, sans-serif";
    const titleLines = wrapText(ctx, title.toUpperCase(), 820).slice(0, 4);
    let titleY = 575;
    for (const line of titleLines) {
      ctx.fillText(line, 126, titleY);
      titleY += 116;
    }

    ctx.fillStyle = "#c8becb";
    ctx.font = "500 35px Arial, sans-serif";
    const detailLines = wrapText(ctx, detail, 800).slice(0, 4);
    let detailY = Math.max(965, titleY + 28);
    for (const line of detailLines) {
      ctx.fillText(line, 126, detailY);
      detailY += 48;
    }

    ctx.strokeStyle = "rgba(255,255,255,.22)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(126, 1195);
    ctx.lineTo(950, 1195);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 28px Arial, sans-serif";
    ctx.fillText("YOUR NIGHT. LIVE.", 126, 1252);
    ctx.fillStyle = accent;
    ctx.fillText("MICAH LOUNGE", 735, 1252);

    const link = document.createElement("a");
    const safeName = `${day}-${title}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "micah-theme-night";
    link.download = `${safeName}-poster.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <section className="poster-studio">
      <div className="poster-studio-head">
        <div>
          <p className="poster-kicker">Campaign Studio</p>
          <h2>Theme-night poster preview</h2>
        </div>
        <button type="button" onClick={downloadPoster}>Download 1080 × 1350 PNG</button>
      </div>

      <div className="poster-tabs" aria-label="Choose theme night">
        {events.map((event, index) => (
          <button
            type="button"
            key={`${event.day}-${index}`}
            className={selectedIndex === index ? "active" : ""}
            onClick={() => setSelectedIndex(index)}
          >
            {event.day || `Event ${index + 1}`}
          </button>
        ))}
      </div>

      <div className="poster-preview" style={{ "--poster-accent": accent } as React.CSSProperties}>
        <span className="poster-edge" />
        <div className="poster-brand"><strong>MICAH</strong><span>LOUNGE</span></div>
        <p className="poster-draft">OWNER DRAFT • SOCIAL POSTER</p>
        <p className="poster-day">{day}</p>
        <h3>{title}</h3>
        <p className="poster-detail">{detail}</p>
        <div className="poster-footer"><strong>YOUR NIGHT. LIVE.</strong><span>MICAH LOUNGE</span></div>
      </div>

      <p className="poster-help">Edit the weekly event fields on the left; this preview updates immediately. The exported poster contains only the information entered in the owner draft.</p>

      <style jsx>{`
        .poster-studio{margin-bottom:26px}.poster-studio-head{display:flex;align-items:end;justify-content:space-between;gap:16px}.poster-studio-head h2{margin:0;font-size:1.3rem}.poster-kicker{margin:0 0 6px;color:#60e6ff;font-size:.68rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.poster-studio-head button{border:1px solid rgba(255,255,255,.14);border-radius:999px;background:#fff;color:#0a0810;padding:10px 13px;font-weight:900;cursor:pointer}.poster-tabs{display:flex;flex-wrap:wrap;gap:7px;margin:18px 0 12px}.poster-tabs button{border:1px solid rgba(255,255,255,.12);background:transparent;color:#b9afbd;padding:8px 11px;border-radius:999px;cursor:pointer}.poster-tabs button.active{border-color:var(--poster-accent,#ff4fd8);color:#fff}.poster-preview{--poster-accent:#ff4fd8;position:relative;aspect-ratio:4/5;overflow:hidden;border:1px solid rgba(255,255,255,.12);border-radius:22px;background:radial-gradient(circle at 78% 13%,color-mix(in srgb,var(--poster-accent) 54%,transparent),transparent 34%),linear-gradient(150deg,#0b0910,#16101b 55%,#07070a);padding:34px 34px 28px 52px;display:flex;flex-direction:column;box-shadow:inset 0 0 70px rgba(0,0,0,.25)}.poster-edge{position:absolute;left:22px;top:22px;bottom:22px;width:5px;background:var(--poster-accent);border-radius:999px}.poster-brand{display:flex;align-items:baseline;gap:8px}.poster-brand strong{font-size:1.75rem;letter-spacing:-.06em}.poster-brand span{font-size:.7rem;font-weight:900;letter-spacing:.26em;color:var(--poster-accent)}.poster-draft{margin:34px 0 0;color:#f2cc72;font-size:.63rem;font-weight:900;letter-spacing:.14em}.poster-day{margin:44px 0 8px;font-size:clamp(2rem,5vw,3.2rem);font-weight:950;text-transform:uppercase;letter-spacing:-.04em}.poster-preview h3{margin:0;max-width:90%;font-size:clamp(2.8rem,7vw,5.4rem);line-height:.86;letter-spacing:-.07em;text-transform:uppercase;overflow-wrap:anywhere}.poster-detail{margin:28px 0 0;max-width:85%;color:#c8becb;line-height:1.55;font-size:.95rem}.poster-footer{margin-top:auto;padding-top:18px;border-top:1px solid rgba(255,255,255,.18);display:flex;justify-content:space-between;gap:16px;font-size:.68rem;letter-spacing:.08em}.poster-footer span{color:var(--poster-accent);font-weight:900}.poster-help{margin:12px 0 0;color:#8f8793;font-size:.78rem;line-height:1.5}@media(max-width:600px){.poster-studio-head{align-items:flex-start;flex-direction:column}.poster-studio-head button{width:100%}.poster-preview{padding-left:46px}.poster-footer{flex-direction:column;gap:5px}}
      `}</style>
    </section>
  );
}
