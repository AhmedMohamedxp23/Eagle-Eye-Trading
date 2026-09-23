"use client";

import { FormEvent, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

type Locale = "en" | "ar";

const COPY = {
  en: {
    subjects: ["New project", "Maintenance", "Partnership"],
    kicker: "CONTACT US",
    title: "Talk to an engineer, not a call centre.",
    postal: "POSTAL",
    postalValue: "P.O. Box 325934, Riyadh 11371, Kingdom of Saudi Arabia",
    telephone: "TELEPHONE",
    email: "EMAIL",
    hours: "HOURS",
    hoursValue: "Sunday – Thursday · 08:00 – 17:00 AST",
    formTitle: "Send an enquiry",
    confirmTitle: "Enquiry received.",
    confirmBody:
      "Thank you — a named engineer will review your enquiry and respond within one business day.",
    confirmReset: "SEND ANOTHER ENQUIRY",
    fullName: "FULL NAME",
    namePlaceholder: "Faisal Al-Harbi",
    organisation: "ORGANISATION",
    orgPlaceholder: "Riyadh Municipality",
    emailPlaceholder: "f.alharbi@example.gov.sa",
    phone: "PHONE",
    phonePlaceholder: "+966 5X XXX XXXX",
    subject: "SUBJECT",
    message: "MESSAGE",
    messagePlaceholder:
      "We are tendering FAS and CCTV works for a two-building facility and would like a scoped offer…",
    send: "Send enquiry",
    sending: "Sending…",
    callNote: "or call +966 56 200 0048",
    requiredError: "Please fill in your name, email, phone and message.",
    genericError:
      "Something went wrong sending your enquiry — please try again or call us directly.",
  },
  ar: {
    subjects: ["مشروع جديد", "صيانة", "شراكة"],
    kicker: "تواصل معنا",
    title: "تحدث مع مهندس، لا مع مركز اتصالات.",
    postal: "العنوان البريدي",
    postalValue: "ص.ب. 325934، الرياض 11371، المملكة العربية السعودية",
    telephone: "الهاتف",
    email: "البريد الإلكتروني",
    hours: "أوقات العمل",
    hoursValue: "الأحد – الخميس · 08:00 – 17:00 بتوقيت السعودية",
    formTitle: "أرسل استفسارك",
    confirmTitle: "تم استلام الاستفسار.",
    confirmBody:
      "شكرًا لتواصلكم — سيراجع مهندس مختص استفساركم ويرد خلال يوم عمل واحد.",
    confirmReset: "إرسال استفسار آخر",
    fullName: "الاسم الكامل",
    namePlaceholder: "فيصل الحربي",
    organisation: "الجهة",
    orgPlaceholder: "أمانة منطقة الرياض",
    emailPlaceholder: "f.alharbi@example.gov.sa",
    phone: "الهاتف",
    phonePlaceholder: "+966 5X XXX XXXX",
    subject: "الموضوع",
    message: "الرسالة",
    messagePlaceholder:
      "نقوم بطرح مناقصة لأعمال إنذار الحريق وكاميرات المراقبة لمنشأة من مبنيين، ونرغب بعرض سعر محدد النطاق…",
    send: "إرسال الاستفسار",
    sending: "جارٍ الإرسال…",
    callNote: "أو اتصل على +966 56 200 0048",
    requiredError: "يرجى تعبئة الاسم والبريد الإلكتروني والهاتف والرسالة.",
    genericError:
      "حدث خطأ أثناء إرسال استفساركم — يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.",
  },
};

export default function ContactClient({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale];
  const [subject, setSubject] = useState(t.subjects[0]);
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
      setError(t.requiredError);
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
        throw new Error(data.error || t.genericError);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.genericError);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Header locale={locale} />

      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGradient} />
        <div className={styles.heroVignette} />

        <div className={styles.heroTop}>
          <div className={styles.kicker}>{t.kicker}</div>
          <h1 className={styles.title}>{t.title}</h1>
        </div>

        <div className={styles.detailsGrid}>
          <div className={styles.detailCard}>
            <div className={styles.detailLabel}>{t.postal}</div>
            <div className={styles.detailValue}>{t.postalValue}</div>
          </div>
          <div className={styles.detailCard}>
            <div className={styles.detailLabel}>{t.telephone}</div>
            <div className={styles.detailValueMono} dir="ltr">
              +966 56 200 0048
            </div>
          </div>
          <div className={styles.detailCard}>
            <div className={styles.detailLabel}>{t.email}</div>
            <div className={styles.detailValueMono} dir="ltr">
              sales@eagleeye-est.com
            </div>
          </div>
          <div className={styles.detailCard}>
            <div className={styles.detailLabel}>{t.hours}</div>
            <div className={styles.detailValue}>{t.hoursValue}</div>
          </div>
        </div>
      </section>

      <div className={styles.formWrap}>
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>{t.formTitle}</h2>

          {submitted ? (
            <div className={styles.confirm}>
              <h3 className={styles.confirmTitle}>{t.confirmTitle}</h3>
              <p className={styles.confirmBody}>{t.confirmBody}</p>
              <button
                type="button"
                className={styles.confirmReset}
                onClick={() => setSubmitted(false)}
              >
                {t.confirmReset}
              </button>
            </div>
          ) : (
            <form className={styles.fields} onSubmit={handleSubmit} noValidate>
              <div>
                <label className={styles.label} htmlFor="name">
                  {t.fullName}
                </label>
                <input
                  id="name"
                  name="name"
                  className={styles.input}
                  placeholder={t.namePlaceholder}
                />
              </div>
              <div className={styles.fieldRow3}>
                <div>
                  <label className={styles.label} htmlFor="organisation">
                    {t.organisation}
                  </label>
                  <input
                    id="organisation"
                    name="organisation"
                    className={styles.input}
                    placeholder={t.orgPlaceholder}
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="email">
                    {t.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={styles.input}
                    placeholder={t.emailPlaceholder}
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="phone">
                    {t.phone}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={styles.input}
                    placeholder={t.phonePlaceholder}
                    dir="ltr"
                  />
                </div>
              </div>
              <div>
                <span className={styles.label}>{t.subject}</span>
                <div className={styles.subjectRow}>
                  {t.subjects.map((s) => (
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
                  {t.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textarea}
                  placeholder={t.messagePlaceholder}
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <div className={styles.submitRow}>
                <button type="submit" className={styles.submitBtn} disabled={sending}>
                  {sending ? t.sending : t.send}
                </button>
                <span className={styles.callNote}>{t.callNote}</span>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer locale={locale} />
    </>
  );
}
