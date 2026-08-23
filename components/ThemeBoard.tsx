import {
  boardMessages,
  confirmedThemeNights,
  publishedThemeNights,
} from "@/lib/site";

export function ThemeBoard() {
  const isPrototypeProgramme = confirmedThemeNights.length === 0;

  return (
    <section className="board-shell" id="theme-nights" aria-labelledby="board-heading">
      <div className="section-heading board-heading-row">
        <div>
          <p className="eyebrow">Theme-night advertising board</p>
          <h2 id="board-heading">Pick your night.</h2>
        </div>
        <span className={`programme-badge ${isPrototypeProgramme ? "prototype" : "live"}`}>
          {isPrototypeProgramme ? "Prototype programme" : "Live programme"}
        </span>
      </div>

      <div className="marquee" aria-label="Micah Lounge announcements">
        <div className="marquee-track">
          {[...boardMessages, ...boardMessages].map((message, index) => (
            <span key={`${message}-${index}`}>{message}</span>
          ))}
        </div>
      </div>

      <div className="event-grid four-up">
        {publishedThemeNights.map((night) => (
          <article
            className="event-card"
            data-accent={night.accent}
            key={night.id}
          >
            <div className="event-meta">
              <p className="event-day">{night.day}</p>
              <p className="event-kicker">{night.kicker}</p>
            </div>
            <h3>{night.title}</h3>
            <p>{night.detail}</p>
            <a href="#concierge">{night.cta}</a>
          </article>
        ))}
      </div>

      {isPrototypeProgramme ? (
        <div className="prototype-note">
          <strong>These four nights are visual concepts, not published Micah Lounge events.</strong>
          <span>
            They show the owner exactly how weekly promotions will appear. Once the real programme is supplied,
            only the event data changes — the advertising system stays intact.
          </span>
        </div>
      ) : null}
    </section>
  );
}
