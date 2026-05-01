function ContactPage({
  enquiryEmail,
  contactFormData,
  handleContactFormInput,
  contactFormStatus,
  handleContactSubmit,
}) {
  return (
    <>
      <section className="contact-page-hero" id="contact-page">
        <div className="contact-page-copy">
          <p className="eyebrow">Contact Novel Silks</p>
          <h1>We would love to help you find the perfect saree for your next special occasion.</h1>
          <span>
            Reach out for bridal selections, boutique guidance, collection details, or personalized
            assistance with festive and heritage saree choices.
          </span>
        </div>
      </section>

      <section className="contact-page-section">
        <div className="contact-grid">
          <div className="contact-info-panel">
            <article className="contact-card">
              <p className="eyebrow">Visit</p>
              <h2>Our Boutique</h2>
              <p>Plot No.2, Ground floor, Silver Spring Apartment</p>
              <p>Vijaya Nagar 3rd Street, Sridevi Kupam, Valasaravakam, Chennai - 600087</p>
            </article>
            <article className="contact-card">
              <p className="eyebrow">Call</p>
              <h2>Speak With Us</h2>
              <p>+91-9176243344</p>
              <p>Mon - Sat, 10:00 AM to 7:00 PM</p>
            </article>
            <article className="contact-card">
              <p className="eyebrow">Write</p>
              <h2>Email Enquiries</h2>
              <p>{enquiryEmail}</p>
              <p>We reply with care and styling guidance.</p>
            </article>
          </div>

          <div className="contact-form-panel">
            <div className="contact-form-shell">
              <p className="eyebrow">Enquiry Form</p>
              <h2>Send us your requirement</h2>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <input
                  type="text"
                  name="name"
                  value={contactFormData.name}
                  onChange={handleContactFormInput}
                  placeholder="Your Name"
                  aria-label="Your Name"
                />
                <input
                  type="email"
                  name="email"
                  value={contactFormData.email}
                  onChange={handleContactFormInput}
                  placeholder="Email Address"
                  aria-label="Email Address"
                />
                <input
                  type="tel"
                  name="phone"
                  value={contactFormData.phone}
                  onChange={handleContactFormInput}
                  placeholder="Phone Number"
                  aria-label="Phone Number"
                />
                <select
                  name="enquiryType"
                  value={contactFormData.enquiryType}
                  onChange={handleContactFormInput}
                  aria-label="Select enquiry type"
                >
                  <option value="" disabled>Select Enquiry Type</option>
                  <option>Bridal Sarees</option>
                  <option>Festive Sarees</option>
                  <option>Boutique Appointment</option>
                  <option>General Enquiry</option>
                </select>
                <textarea
                  name="message"
                  value={contactFormData.message}
                  onChange={handleContactFormInput}
                  rows="6"
                  placeholder="Tell us what you are looking for..."
                  aria-label="Your Message"
                />
                {contactFormStatus.message ? (
                  <p className={contactFormStatus.type === 'success' ? 'form-status success' : 'form-status error'}>
                    {contactFormStatus.message}
                  </p>
                ) : null}
                <button type="submit" className="contact-submit-btn">Send Enquiry</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
