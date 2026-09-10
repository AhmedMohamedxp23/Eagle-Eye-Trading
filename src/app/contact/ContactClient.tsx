"use client";

import { FormEvent, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const SUBJECTS = ["New project", "Maintenance", "Partnership"];

export default function ContactClient() {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const organisation = String(form.get("organisation") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    if (!name || !email || !phone || !message) {
      setError("Please fill in your name, email, phone and message.");
      return;
    }
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, organisation, email, phone, subject, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong sending your enquiry — please try again or call us directly."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGradient} />
        <div className={styles.heroVignette} />

        <div className={styles.heroTop}>
          <div className={styles.kicker}>CONTACT US</div>
          <h1 className={styles.title}>
            Talk to an engineer, not a call centre.
          </h1>
        </div>

        <div className={styles.detailsGrid}>
          <div className={styles.detailCard}>
            <div className={styles.detailLabel}>POSTAL</div>
            <div className={styles.detailValue}>
              P.O. Box 325934, Riyadh 11371, Kingdom of Saudi Arabia
            </div>
          </div>
          <div className={styles.detailCard}>
            <div className={styles.detailLabel}>TELEPHONE</div>
            <div className={styles.detailValueMono}>+966 56 200 0048</div>
          </div>
          <div className={styles.detailCard}>
            <div className={styles.detailLabel}>EMAIL</div>
            <div className={styles.detailValueMono}>sales@eagleeye-est.com</div>
          </div>
          <div className={styles.detailCard}>
            <div className={styles.detailLabel}>HOURS</div>
            <div className={styles.detailValue}>
              Sunday – Thursday · 08:00 – 17:00 AST
            </div>
          </div>
        </div>
      </section>

      <div className={styles.formWrap}>
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Send an enquiry</h2>

          {submitted ? (
            <div className={styles.confirm}>
              <h3 className={styles.confirmTitle}>Enquiry received.</h3>
              <p className={styles.confirmBody}>
                Thank you — a named engineer will review your enquiry and
                respond within one business day.
              </p>
              <button
                type="button"
                className={styles.confirmReset}
                onClick={() => setSubmitted(false)}
              >
                SEND ANOTHER ENQUIRY
              </button>
            </div>
          ) : (
            <form className={styles.fields} onSubmit={handleSubmit} noValidate>
              <div>
                <label className={styles.label} htmlFor="name">
                  FULL NAME
                </label>
                <input
                  id="name"
                  name="name"
                  className={styles.input}
                  placeholder="Faisal Al-Harbi"
                />
              </div>
              <div className={styles.fieldRow3}>
                <div>
                  <label className={styles.label} htmlFor="organisation">
                    ORGANISATION
                  </label>
                  <input
                    id="organisation"
                    name="organisation"
                    className={styles.input}
                    placeholder="Riyadh Municipality"
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="email">
                    EMAIL
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={styles.input}
                    placeholder="f.alharbi@example.gov.sa"
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="phone">
                    PHONE
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={styles.input}
                    placeholder="+966 5X XXX XXXX"
                  />
                </div>
              </div>
              <div>
                <span className={styles.label}>SUBJECT</span>
                <div className={styles.subjectRow}>
                  {SUBJECTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`${styles.subjectPill} ${
                        subject === s ? styles.subjectPillActive : ""
                      }`}
                      onClick={() => setSubject(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={styles.label} htmlFor="message">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textarea}
                  placeholder="We are tendering FAS and CCTV works for a two-building facility and would like a scoped offer…"
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <div className={styles.submitRow}>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={sending}
                >
                  {sending ? "Sending…" : "Send enquiry"}
                </button>
                <span className={styles.callNote}>
                  or call +966 56 200 0048
                </span>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
