import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact OLKORF Construction about windows, doors, installation, service areas, and project questions."
};

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-heading" className="contact-page">
      <div className="contact-page__inner">
        <div className="contact-page__header">
          <p className="home-section__eyebrow">Contact Us</p>
          <h1 id="contact-heading">Let&apos;s Talk About Your Project</h1>
          <p>
            Have a question about windows, doors, installation, or service areas? We&apos;d be happy to help.
          </p>
        </div>

        <div className="contact-layout">
          <div className="contact-info-column">
            <article className="contact-card">
              <h2>Get In Touch</h2>

              <div className="contact-info-list">
                <div>
                  <span>Phone:</span>
                  <a href="tel:6084089259">608-408-9259</a>
                </div>
                <div>
                  <span>Email:</span>
                  <a href="mailto:info@olkorfconstruction.com">info@olkorfconstruction.com</a>
                </div>
                <div>
                  <span>Service Area:</span>
                  <p>Madison &amp; Southern Wisconsin</p>
                </div>
                <div>
                  <span>Business Hours:</span>
                  <p>
                    Monday - Friday
                    <br />
                    8:00 AM - 6:00 PM
                  </p>
                  <p>
                    Saturday
                    <br />
                    By Appointment
                  </p>
                  <p>
                    Sunday
                    <br />
                    Closed
                  </p>
                </div>
              </div>
            </article>

            <aside className="contact-callout">
              <h2>Prefer to talk?</h2>
              <p>Call or text us directly and we&apos;ll be happy to answer your questions.</p>
              <a href="tel:6084089259">608-408-9259</a>
            </aside>
          </div>

          <article className="contact-card contact-card--form">
            <h2>Send Us a Message</h2>
            <ContactForm />
          </article>
        </div>
      </div>
    </section>
  );
}
