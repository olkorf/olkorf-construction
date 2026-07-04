"use client";

import { FormEvent, useMemo, useState } from "react";

const subjects = ["General Question", "Window Installation", "Door Installation", "Existing Project", "Warranty / Service", "Other"];

type ContactFormState = {
  email: string;
  message: string;
  name: string;
  phone: string;
  subject: string;
  website: string;
};

const initialFormState: ContactFormState = {
  email: "",
  message: "",
  name: "",
  phone: "",
  subject: "",
  website: ""
};

export function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emailBody = useMemo(
    () =>
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone || "Not provided"}`,
        `Subject: ${form.subject || "General Question"}`,
        "",
        "Message:",
        form.message
      ].join("\n"),
    [form]
  );

  const updateField = (field: keyof ContactFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const validateForm = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return "Please complete the required fields.";
    }

    return "";
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (form.website.trim()) {
      setIsSubmitted(true);
      return;
    }

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const mailtoUrl = new URL("mailto:info@olkorfconstruction.com");
      mailtoUrl.searchParams.set("subject", "New Contact Form Message");
      mailtoUrl.searchParams.set("body", emailBody);
      window.location.href = mailtoUrl.toString();

      window.setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setForm(initialFormState);
      }, 650);
    } catch {
      setIsSubmitting(false);
      setError("Something went wrong while preparing your message. Please call or email us directly.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="contact-success" role="status">
        <h2>Thank you!</h2>
        <p>Your message has been sent successfully.</p>
        <p>We will get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__field contact-form__honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          autoComplete="off"
          id="contact-website"
          name="website"
          onChange={(event) => updateField("website", event.target.value)}
          tabIndex={-1}
          value={form.website}
        />
      </div>

      <div className="contact-form__grid">
        <div className="contact-form__field">
          <label htmlFor="contact-name">Name *</label>
          <input
            autoComplete="name"
            id="contact-name"
            name="name"
            onChange={(event) => updateField("name", event.target.value)}
            required
            type="text"
            value={form.name}
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-email">Email *</label>
          <input
            autoComplete="email"
            id="contact-email"
            name="email"
            onChange={(event) => updateField("email", event.target.value)}
            required
            type="email"
            value={form.email}
          />
        </div>
      </div>

      <div className="contact-form__grid">
        <div className="contact-form__field">
          <label htmlFor="contact-phone">Phone</label>
          <input
            autoComplete="tel"
            id="contact-phone"
            name="phone"
            onChange={(event) => updateField("phone", event.target.value)}
            type="tel"
            value={form.phone}
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-subject">Subject</label>
          <select
            id="contact-subject"
            name="subject"
            onChange={(event) => updateField("subject", event.target.value)}
            value={form.subject}
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message">Message *</label>
        <textarea
          id="contact-message"
          name="message"
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Tell us how we can help."
          required
          rows={7}
          value={form.message}
        />
      </div>

      {error ? (
        <p className="contact-form__message contact-form__message--error" role="alert">
          {error}
        </p>
      ) : null}

      <button className="cta-button contact-form__submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending Message..." : "Send Message →"}
      </button>
    </form>
  );
}
