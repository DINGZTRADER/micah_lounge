import { boardMessages, themeNights } from "@/lib/site";

export function ThemeBoard() {
  const active = themeNights.filter((night) => night.active);

  return (
    <section className="board-shell" id="theme-nights" aria-labelledby="board-heading">
      <div className="section-heading compact">
        <p className="eyebrow">Live advertising board</p>
        <h2 id="board-heading">This week at Micah</h2>
      </div>

      <div className="marquee" aria-label="Micah Lounge announcements">
        <div className="marquee-track">
          {[...boardMessages, ...boardMessages].map((message, index) => (
            <span key={`${message}-${index}`}>{message}</span>
          ))}
        </div>
      </div>

      {active.length > 0 ? (
        <div className="event-grid">
          {active.map((night) => (
            <article className="event-card" key={`${night.day}-${night.title}`}>
              <p className="event-day">{night.day}</p>
              <p className="event-kicker">{night.kicker}</p>
              <h3>{night.title}</h3>
              <p>{night.detail}</p>
              <a href="#concierge">{night.cta}</a>
            </article>
          ))}
        </div>
      ) : (
        <div className="board-empty">
          <strong>Weekly theme-night programme ready to publish.</strong>
          <span>
            Add the confirmed night, date, headline and offer in <code>lib/site.ts</code>; the board updates automatically.
          </span>
        </div>
      )}
    </section>
  );
}
