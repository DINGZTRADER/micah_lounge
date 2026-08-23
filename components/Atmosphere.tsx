"use client";

const MEDIA = {
  video: "https://videos.pexels.com/video-files/4781570/4781570-hd_1920_1080_25fps.mp4",
  lounge: "https://images.pexels.com/videos/4781570/club-drinks-dubai-girls-4781570.jpeg?auto=compress&dpr=1&h=750&w=1260",
  cocktails: "https://images.pexels.com/videos/7271830/pexels-photo-7271830.jpeg?auto=compress&dpr=1&h=750&w=1260",
  dancefloor: "https://images.pexels.com/videos/9429657/alcohol-club-dance-drink-9429657.jpeg?auto=compress&dpr=1&h=750&w=1260",
} as const;

const gallery = [
  {
    src: MEDIA.lounge,
    alt: "Guests enjoying a lively lounge atmosphere",
    title: "Social energy",
    copy: "A night designed around music, conversation and moments worth staying for.",
  },
  {
    src: MEDIA.cocktails,
    alt: "Bartender serving drinks in a modern nightlife setting",
    title: "Drinks & hospitality",
    copy: "A strong bar experience helps turn a casual visit into a full night out.",
  },
  {
    src: MEDIA.dancefloor,
    alt: "Crowd dancing under colourful nightclub lighting",
    title: "After-dark movement",
    copy: "Theme nights, DJs and changing weekly energy give guests a reason to return.",
  },
] as const;

export function Atmosphere() {
  return (
    <section className="atmosphere" id="atmosphere" aria-labelledby="atmosphere-heading">
      <div className="atmosphere-heading">
        <div>
          <p className="atmosphere-kicker">The vibe</p>
          <h2 id="atmosphere-heading">See the night before you arrive.</h2>
        </div>
        <p>
          A visual atmosphere preview for the Mica Lounge prototype. Genuine venue photography can replace these
          reference visuals without changing the layout.
        </p>
      </div>

      <div className="video-shell">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={MEDIA.lounge}
          aria-label="Nightlife atmosphere preview"
        >
          <source src={MEDIA.video} type="video/mp4" />
        </video>
        <div className="video-shade" />
        <div className="video-copy">
          <span>Atmosphere preview</span>
          <strong>MICA AFTER DARK</strong>
          <p>Music. Tables. Drinks. Movement.</p>
        </div>
      </div>

      <div className="media-grid">
        {gallery.map((item) => (
          <article className="media-card" key={item.src}>
            <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        .atmosphere{width:min(calc(100% - 32px),1180px);margin:0 auto;padding:34px 0 96px}.atmosphere-heading{display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:end;margin-bottom:28px}.atmosphere-kicker{margin:0 0 12px;color:#ff4fd8;font-size:.76rem;font-weight:900;letter-spacing:.2em;text-transform:uppercase}.atmosphere-heading h2{margin:0;font-size:clamp(2.5rem,5.8vw,5.3rem);line-height:.9;letter-spacing:-.065em}.atmosphere-heading>p{margin:0;color:#b9afbd;line-height:1.7;max-width:520px}.video-shell{position:relative;min-height:520px;overflow:hidden;border:1px solid rgba(255,255,255,.12);border-radius:28px;background:#100d14;box-shadow:0 32px 90px rgba(0,0,0,.38)}.video-shell video{width:100%;height:100%;min-height:520px;object-fit:cover}.video-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,7,10,.08),rgba(8,7,10,.2) 46%,rgba(8,7,10,.82))}.video-copy{position:absolute;left:clamp(22px,5vw,58px);right:24px;bottom:clamp(22px,5vw,48px);z-index:2}.video-copy span{display:inline-block;margin-bottom:10px;color:#f2cc72;font-size:.67rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.video-copy strong{display:block;font-size:clamp(2.6rem,7vw,6.5rem);line-height:.84;letter-spacing:-.07em}.video-copy p{margin:14px 0 0;color:#ddd5df;font-weight:700;letter-spacing:.04em}.media-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:14px}.media-card{overflow:hidden;border:1px solid rgba(255,255,255,.12);border-radius:20px;background:linear-gradient(160deg,rgba(255,255,255,.065),rgba(255,255,255,.015))}.media-card img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block;transition:transform .35s ease}.media-card:hover img{transform:scale(1.025)}.media-card>div{padding:20px}.media-card h3{margin:0 0 7px;font-size:1.25rem;letter-spacing:-.035em}.media-card p{margin:0;color:#b9afbd;line-height:1.55;font-size:.88rem}@media(max-width:850px){.atmosphere-heading{grid-template-columns:1fr;gap:18px}.video-shell,.video-shell video{min-height:430px}.media-grid{grid-template-columns:1fr 1fr}.media-card:last-child{grid-column:1/-1}}@media(max-width:600px){.atmosphere{padding-bottom:72px}.video-shell,.video-shell video{min-height:360px}.media-grid{grid-template-columns:1fr}.media-card:last-child{grid-column:auto}.video-copy strong{font-size:clamp(2.5rem,15vw,4.2rem)}}@media(prefers-reduced-motion:reduce){.media-card img{transition:none}.video-shell video{display:none}.video-shell{background-image:linear-gradient(180deg,rgba(8,7,10,.05),rgba(8,7,10,.8)),url(${MEDIA.lounge});background-size:cover;background-position:center}}
      `}</style>
    </section>
  );
}
