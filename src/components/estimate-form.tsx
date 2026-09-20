"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const projectTypes = [
  "Windows",
  "Entry Door",
  "Patio Door",
  "Storm Door",
  "French Door",
  "Exterior Trim / Aluminum Wrapping",
  "Other"
];

const quantities = ["1", "2-3", "4-6", "7-10", "10+", "Not sure yet"];

const timelines = ["As soon as possible", "Within 30 days", "Within 3 months", "Just gathering information"];

type FormState = {
  city: string;
  email: string;
  message: string;
  name: string;
  phone: string;
  quantity: string;
  timeline: string;
  website: string;
};

const initialFormState: FormState = {
  city: "",
  email: "",
  message: "",
  name: "",
  phone: "",
  quantity: "",
  timeline: "",
  website: ""
};

export function EstimateForm({ initialMessage = "", initialTypes = [] }: { initialMessage?: string; initialTypes?: string[] }) {
  const [form, setForm] = useState<FormState>({...initialFormState, message: initialMessage});
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>(initialTypes);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleProjectType = (projectType: string) => {
    setSelectedProjectTypes((current) =>
      current.includes(projectType) ? current.filter((item) => item !== projectType) : [...current, projectType]
    );
  };

  const validateForm = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.city.trim()) {
      return "Please complete the required fields.";
    }

    if (selectedProjectTypes.length === 0) {
      return "Please select at least one project type.";
    }

    return "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, kind: "estimate", projectTypes: selectedProjectTypes })
      });
      if (!response.ok) throw new Error("Delivery not confirmed");
      setIsSubmitted(true);
      setForm(initialFormState);
      setSelectedProjectTypes([]);
    } catch {
      setError("We couldn’t confirm your message was sent. Your information is still here. Please try again or email info@olkorfconstruction.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="estimate-success" role="status">
        <h2>Thank you! We received your estimate request and will contact you shortly.</h2>
        <Link className="cta-button" href="/">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <form className="estimate-form" onSubmit={handleSubmit}>
      <div className="estimate-form__field estimate-form__honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          autoComplete="off"
          id="website"
          name="website"
          onChange={(event) => updateField("website", event.target.value)}
          tabIndex={-1}
          value={form.website}
        />
      </div>

      <div className="estimate-form__grid">
        <div className="estimate-form__field">
          <label htmlFor="name">Name *</label>
          <input
            autoComplete="name"
            id="name"
            name="name"
            onChange={(event) => updateField("name", event.target.value)}
            required
            type="text"
            value={form.name}
          />
        </div>

        <div className="estimate-form__field">
          <label htmlFor="phone">Phone *</label>
          <input
            autoComplete="tel"
            id="phone"
            name="phone"
            onChange={(event) => updateField("phone", event.target.value)}
            required
            type="tel"
            value={form.phone}
          />
        </div>

        <div className="estimate-form__field">
          <label htmlFor="email">Email</label>
          <input
            autoComplete="email"
            id="email"
            name="email"
            onChange={(event) => updateField("email", event.target.value)}
            type="email"
            value={form.email}
          />
        </div>

        <div className="estimate-form__field">
          <label htmlFor="city">City *</label>
          <input
            autoComplete="address-level2"
            id="city"
            name="city"
            onChange={(event) => updateField("city", event.target.value)}
            required
            type="text"
            value={form.city}
          />
        </div>
      </div>

      <fieldset className="estimate-form__fieldset">
        <legend>Project Type *</legend>
        <div className="estimate-form__checkboxes">
          {projectTypes.map((projectType) => (
            <label className="estimate-form__checkbox" key={projectType}>
              <input
                checked={selectedProjectTypes.includes(projectType)}
                onChange={() => toggleProjectType(projectType)}
                type="checkbox"
                value={projectType}
              />
              <span>{projectType}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="estimate-form__grid">
        <div className="estimate-form__field">
          <label htmlFor="quantity">Approximate Quantity</label>
          <select
            id="quantity"
            name="quantity"
            onChange={(event) => updateField("quantity", event.target.value)}
            value={form.quantity}
          >
            <option value="">Select an option</option>
            {quantities.map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </select>
        </div>

        <div className="estimate-form__field">
          <label htmlFor="timeline">When are you planning to start?</label>
          <select
            id="timeline"
            name="timeline"
            onChange={(event) => updateField("timeline", event.target.value)}
            value={form.timeline}
          >
            <option value="">Select an option</option>
            {timelines.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="estimate-form__field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Tell us a little about your project."
          rows={5}
          value={form.message}
        />
      </div>

      {error ? (
        <p className="estimate-form__message estimate-form__message--error" role="alert">
          {error}
        </p>
      ) : null}

      <button className="cta-button estimate-form__submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending Request..." : "Request My Free Estimate →"}
      </button>
    </form>
  );
}
