import { Atmosphere } from "@/components/Atmosphere";
import { Concierge } from "@/components/Concierge";
import { ThemeBoard } from "@/components/ThemeBoard";
import { siteConfig, venueContentStatus } from "@/lib/site";

export default function HomePage() {
  const verifiedVenueItems = Object.values(venueContentStatus).filter(Boolean).length;

  return (
    <main>
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="Mica Lounge home">
          <span>MICA</span>
          <small>LOUNGE</small>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#theme-nights">Theme nights</a>
          <a href="#atmosphere">The vibe</a>
          <a href="#experience">Experience</a>
          <a href="#concierge">Concierge</a>
        </nav>
        <a className="nav-cta" href="#concierge">Plan your night</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-light light-one" />
        <div className="hero-light light-two" />
        <div className="hero-copy">
          <div className="hero-status-row">
            <p className="eyebrow">{siteConfig.location.label}</p>
            <span className="prototype-pill">Prototype</span>
          </div>
          <h1>
            MICA <span>LOUNGE</span>
          </h1>
          <p className="hero-tagline">{siteConfig.tagline}</p>
          <p className="hero-description">{siteConfig.description}</p>
          <div className="hero-actions">
            <a className="primary-button" href="#theme-nights">See the board</a>
            <a className="ghost-button" href="#atmosphere">See the vibe</a>
          </div>
          <div className="hero-proof" aria-label="Mica Lounge website features">
            <span>Music</span>
            <span>Tables</span>
            <span>Celebrations</span>
            <span>Weekly events</span>
          </div>
        </div>

        <div className="hero-poster" aria-label="Mica Lounge weekly poster concept">
          <div className="poster-header">
            <span className="poster-top">MICA / WEEKLY</span>
            <span className="poster-issue">PROTOTYPE 01</span>
          </div>
          <strong>YOUR<br />NIGHT.<br /><em>LIVE.</em></strong>
          <div className="poster-bottom-wrap">
            <span className="poster-bottom">MUSIC • TABLES • MOMENTS</span>
            <span className="poster-line" />
          </div>
        </div>
      </section>

      <div className="pulse-strip" aria-hidden="true">
        <span>MICA AFTER DARK</span>
        <span>●</span>
        <span>WHAT&apos;S ON THIS WEEK?</span>
        <span>●</span>
        <span>ASK THE CONCIERGE</span>
      </div>

      <ThemeBoard />
      <Atmosphere />

      <section className="experience" id="experience" aria-labelledby="experience-heading">
        <div className="section-heading experience-heading">
          <div>
            <p className="eyebrow">The Mica experience</p>
            <h2 id="experience-heading">Built around the decision to go out.</h2>
          </div>
          <p>
            The website is designed to answer the questions that matter before a guest leaves home: what is happening, what kind of night it is, how to plan a table and how to get there.
          </p>
        </div>

        <div className="feature-grid">
          <article>
            <span>01 / DISCOVER</span>
            <h3>What&apos;s on tonight?</h3>
            <p>The advertising board makes the current programme impossible to miss — especially for visitors arriving from social media.</p>
          </article>
          <article>
            <span>02 / DECIDE</span>
            <h3>Find your kind of night.</h3>
            <p>Each campaign can carry its own music identity, offer, host, DJ, dress cue or special announcement.</p>
          </article>
          <article>
            <span>03 / PLAN</span>
            <h3>Ask. Book. Arrive.</h3>
            <p>The concierge shortens the path from curiosity to a table enquiry instead of sending guests through old posts and flyers.</p>
          </article>
          <article>
            <span>04 / RETURN</span>
            <h3>A reason to come back weekly.</h3>
            <p>Fresh theme-night promotion turns the website into an active sales surface rather than a static digital brochure.</p>
          </article>
        </div>

        {verifiedVenueItems < 4 ? (
          <div className="prototype-note">
            <strong>Venue facts are still being verified.</strong>
            <span>
              Location, contacts, opening hours and the live weekly programme will appear only after Mica Lounge confirms them.
            </span>
          </div>
        ) : null}
      </section>

      <Concierge />

      <section className="closing-cta">
        <p className="eyebrow">Mica Lounge</p>
        <h2>Your night starts before you arrive.</h2>
        <p>See the programme. Ask a question. Plan the table.</p>
        <a className="primary-button" href="#concierge">Ask Mica Concierge</a>
      </section>

      <footer>
        <div className="brand footer-brand"><span>MICA</span><small>LOUNGE</small></div>
        <p>{siteConfig.location.label}</p>
        <p>© {new Date().getFullYear()} Mica Lounge</p>
      </footer>
    </main>
  );
}
