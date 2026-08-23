import { Concierge } from "@/components/Concierge";
import { ThemeBoard } from "@/components/ThemeBoard";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <main>
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="Micah Lounge home">
          <span>MICAH</span>
          <small>LOUNGE</small>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#theme-nights">Theme nights</a>
          <a href="#experience">Experience</a>
          <a href="#concierge">Concierge</a>
        </nav>
        <a className="nav-cta" href="#concierge">Plan your night</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-light light-one" />
        <div className="hero-light light-two" />
        <div className="hero-copy">
          <p className="eyebrow">{siteConfig.city} • {siteConfig.country}</p>
          <h1>
            MICAH <span>LOUNGE</span>
          </h1>
          <p className="hero-tagline">{siteConfig.tagline}</p>
          <p className="hero-description">{siteConfig.description}</p>
          <div className="hero-actions">
            <a className="primary-button" href="#theme-nights">See what’s on</a>
            <a className="ghost-button" href="#concierge">Ask Micah</a>
          </div>
        </div>
        <div className="hero-poster" aria-label="Micah Lounge live poster">
          <span className="poster-top">WEEKLY</span>
          <strong>THEME<br />NIGHTS</strong>
          <span className="poster-bottom">MUSIC • FOOD • DRINKS</span>
        </div>
      </section>

      <ThemeBoard />

      <section className="experience" id="experience" aria-labelledby="experience-heading">
        <div className="section-heading">
          <p className="eyebrow">Built for the night</p>
          <h2 id="experience-heading">One destination. Multiple reasons to return.</h2>
        </div>
        <div className="feature-grid">
          <article><span>01</span><h3>Music-led nights</h3><p>A site structure designed to put the current night, DJ or special programme first.</p></article>
          <article><span>02</span><h3>Theme-night advertising</h3><p>The programme board is intentionally prominent so weekly campaigns become the homepage sales engine.</p></article>
          <article><span>03</span><h3>Concierge conversion</h3><p>Guests can ask questions before they arrive instead of searching through social posts and old flyers.</p></article>
          <article><span>04</span><h3>Mobile first</h3><p>Fast, touch-friendly presentation designed for customers arriving from WhatsApp, Instagram and TikTok.</p></article>
        </div>
      </section>

      <Concierge />

      <section className="closing-cta">
        <p className="eyebrow">Micah Lounge</p>
        <h2>Make tonight easy to choose.</h2>
        <a className="primary-button" href="#concierge">Ask the concierge</a>
      </section>

      <footer>
        <div className="brand footer-brand"><span>MICAH</span><small>LOUNGE</small></div>
        <p>{siteConfig.city}, {siteConfig.country}</p>
        <p>© {new Date().getFullYear()} Micah Lounge</p>
      </footer>
    </main>
  );
}
