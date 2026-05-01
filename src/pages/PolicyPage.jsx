function PolicyPage({ activePolicyKey, activePolicyPage }) {
  return (
    <>
      <section className="policy-page-hero" id={`policy-${activePolicyKey}`}>
        <div className="policy-page-copy">
          <p className="eyebrow">{activePolicyPage.eyebrow}</p>
          <h1>{activePolicyPage.title}</h1>
          <span>{activePolicyPage.intro}</span>
        </div>
      </section>

      <section className="policy-page-section">
        <div className="policy-page-grid">
          <aside className="policy-side-nav">
            <p className="eyebrow">Policy Pages</p>
            <a href="#policy-shipping">Shipping Policy</a>
            <a href="#policy-returns">Return &amp; Exchange Policy</a>
            <a href="#policy-terms">Terms &amp; Conditions</a>
            <a href="#policy-privacy">Privacy Policy</a>
            <a href="#policy-faqs">FAQs</a>
          </aside>

          <div className="policy-content">
            {activePolicyPage.sections?.map((section) => (
              <article className="policy-section" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul className="policy-list">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}

            {activePolicyPage.faqs ? (
              <div className="policy-faq-list">
                {activePolicyPage.faqs.map((item) => (
                  <article className="policy-faq-item" key={item.question}>
                    <h2>{item.question}</h2>
                    <p>{item.answer}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}

export default PolicyPage;
