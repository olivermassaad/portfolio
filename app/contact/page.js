export const metadata = {
  title: "Contact - Oliver Massaad",
};

export default async function ContactPage({ searchParams }) {
  const params = await searchParams;
  const sent = params?.sent === "1";
  const hasError = Boolean(params?.error);

  return (
    <>
      <header className="page-header hero-flat">
        <h1>Contact</h1>
        <p>Get in touch for opportunities or collaboration.</p>
      </header>

      {sent ? (
        <div className="msg-success" role="alert">
          Thanks! Your message has been sent. I&apos;ll get back to you soon.
        </div>
      ) : null}
      {hasError ? (
        <div className="msg-error" role="alert">
          Message could not be sent right now. Please email me directly at{" "}
          <a href="mailto:olimasad@gmail.com">olimasad@gmail.com</a>.
        </div>
      ) : null}

      <div className="contact-layout">
        <div className="contact-block">
          <h2>Direct contact</h2>
          <p>
            <strong>Phone</strong> <a href="tel:+14182628434">+1 418-262-8434</a>
          </p>
          <p>
            <strong>Email</strong> <a href="mailto:olimasad@gmail.com">olimasad@gmail.com</a>
          </p>
          <p>
            <strong>GitHub</strong>{" "}
            <a href="https://github.com/olivermassaad" target="_blank" rel="noopener">
              github.com/olivermassaad
            </a>
          </p>
          <div className="contact-links contact-links-spaced">
            <a href="https://github.com/olivermassaad" target="_blank" rel="noopener" className="btn btn-secondary">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/oliver-massaad-9765a0276/"
              target="_blank"
              rel="noopener"
              className="btn btn-secondary"
            >
              LinkedIn
            </a>
            <a href="https://www.instagram.com/oliver_massaad/" target="_blank" rel="noopener" className="btn btn-secondary">
              Instagram
            </a>
            <button type="button" className="btn btn-secondary" id="emailbutton">
              Copy Email
            </button>
          </div>
        </div>

        <section className="form-section">
          <h2>Send a message</h2>
          <form action="/api/contact" method="POST">
            <fieldset>
              <p>
                <label htmlFor="name">Full name</label>
                <input type="text" id="name" name="name" required />
              </p>
              <p>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </p>
              <p>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required />
              </p>
              <button type="submit" className="btn btn-primary">
                Send message
              </button>
            </fieldset>
          </form>
        </section>
      </div>
    </>
  );
}
