function AboutPage({ aboutImages }) {
  return (
    <>
      <section className="about-page-hero" id="about-page">
        <div className="about-page-copy">
          <p className="eyebrow">About Novel Silks</p>
          <h1>Celebrating heritage drapes with a boutique sense of luxury.</h1>
          <span>
            Novel Silks is imagined as a destination for timeless sarees, premium craftsmanship,
            and a shopping experience shaped by grace, warmth, and Indian tradition.
          </span>
        </div>
        <div className="about-page-image-wrap">
          <img src={aboutImages[0]} alt="Novel Silks heritage saree collection" className="about-page-image" />
        </div>
      </section>

      <section className="about-story-section">
        <div className="about-story-grid">
          <div className="about-story-card">
            <p className="eyebrow">Our Story</p>
            <h2>A premium saree house inspired by artistry, rituals, and celebration.</h2>
            <p>
              Novel Silks brings together the romance of silk, the beauty of zari, and the deep
              emotional value of traditional drapes. Every saree is chosen to feel worthy of weddings,
              festive gatherings, gifting moments, and the family occasions that stay in memory.
            </p>
            <p>
              We believe luxury should not feel distant. It should feel warm, refined, and deeply personal,
              with each collection presented in a way that is elegant, easy to explore, and rooted in culture.
            </p>
          </div>
          <div className="about-story-stats">
            <div className="about-stat">
              <strong>Heritage</strong>
              <span>Curated with respect for timeless Indian weaving traditions.</span>
            </div>
            <div className="about-stat">
              <strong>Luxury</strong>
              <span>Premium presentation, graceful textures, and rich occasion-led styling.</span>
            </div>
            <div className="about-stat">
              <strong>Warmth</strong>
              <span>A boutique experience designed to feel intimate and reassuring.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values-section">
        <div className="section-heading centered">
          <p className="eyebrow">Why Novel Silks</p>
          <h2>Designed for women who love tradition with a polished, luxury finish.</h2>
        </div>
        <div className="about-values-grid">
          <article className="about-value-card">
            <h3>Curated Weaves</h3>
            <p>From bridal Kancheepurams to softer festive fabrics, every edit is made with occasion and elegance in mind.</p>
          </article>
          <article className="about-value-card">
            <h3>Premium Experience</h3>
            <p>We present collections with clarity, softness, and richness so shopping feels calm, premium, and memorable.</p>
          </article>
          <article className="about-value-card">
            <h3>Rooted In Pride</h3>
            <p>Our identity celebrates woven heritage and the beauty of wearing tradition with confidence and joy.</p>
          </article>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
