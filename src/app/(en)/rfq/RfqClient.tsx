"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ORG_TYPES, SCOPES } from "@/lib/data";
import { ORG_TYPES_AR, SCOPES_AR } from "@/lib/data.ar";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./page.module.css";

type Locale = "en" | "ar";

const MAX_TOTAL_BYTES = 15 * 1024 * 1024; // 15MB combined, matches the API's cap

const COPY = {
  en: {
    stepLabels: ["Scope", "Project details", "Review & submit"],
    kicker: "REQUEST FOR OFFER",
    title: "Tell us the scope. We'll come back with a priced offer.",
    submittedKicker: "REQUEST SUBMITTED",
    submittedTitle: "A named engineer is now on your request.",
    submittedBodyPrefix: "Thank you — we've logged your scope for",
    submittedBodySuffix:
      "Our engineering team responds to qualified requests within two business days.",
    defaultProject: "your project",
    startOver: "START A NEW REQUEST",
    stepPrefix: "STEP 0",
    step1Title: "Which systems are in scope?",
    step1Sub:
      "Select all that apply. Drawings or a bill of quantities can be attached in the next step.",
    selected: "SELECTED",
    step2Title: "Project details",
    scopeSelectedLabel: "Scope selected:",
    noSystemsSelected: "No systems selected yet",
    projectName: "PROJECT NAME",
    projectNamePlaceholder: "King Abdullah Rd. Facility — Phase 2",
    cityRegion: "CITY / REGION",
    cityPlaceholder: "Riyadh",
    phone: "PHONE",
    phonePlaceholder: "+966 5X XXX XXXX",
    requiredOnSite: "REQUIRED ON SITE",
    requiredOnPlaceholder: "Q4 2026",
    orgType: "ORGANISATION TYPE",
    drawings: "DRAWINGS / BILL OF QUANTITIES",
    dropzone: "drop PDF, DWG or XLSX — or browse",
    filesLabel: (n: number) => `${n} file${n > 1 ? "s" : ""}`,
    step3Title: "Review & submit",
    step3Sub:
      "Our engineering team responds to qualified requests within two business days.",
    scope: "SCOPE",
    project: "PROJECT",
    clientType: "CLIENT TYPE",
    attachments: "ATTACHMENTS",
    notSpecified: "Not specified",
    requiredSuffix: (d: string) => ` · required ${d}`,
    noneAttached: "None attached",
    note: "A named engineer is assigned to every request — you deal with the same person from pricing through commissioning.",
    back: "Back",
    stepOf: (n: number) => `Step ${n} of 3`,
    sending: "Sending…",
    submit: "Submit request",
    continue: "Continue",
    dash: "—",
    errRequiredAttachments:
      "Attachments are too large — please keep the total under 15MB.",
    errSelectScope: "Select at least one system before continuing.",
    errProjectFields: "Project name, city / region and phone are required.",
    errGeneric: "Something went wrong. Please try again.",
    errGenericFallback:
      "Something went wrong sending your request — please try again or call us directly.",
  },
  ar: {
    stepLabels: ["النطاق", "تفاصيل المشروع", "المراجعة والإرسال"],
    kicker: "طلب عرض سعر",
    title: "أخبرنا بنطاق المشروع، وسنعود إليك بعرض سعر مُحدَّد.",
    submittedKicker: "تم إرسال الطلب",
    submittedTitle: "مهندس مختص مُكلَّف بطلبكم الآن.",
    submittedBodyPrefix: "شكرًا لكم — تم تسجيل النطاق الخاص بـ",
    submittedBodySuffix:
      "يرد فريقنا الهندسي على الطلبات المؤهلة خلال يومَي عمل.",
    defaultProject: "مشروعكم",
    startOver: "إرسال طلب جديد",
    stepPrefix: "الخطوة 0",
    step1Title: "ما هي الأنظمة المطلوبة ضمن النطاق؟",
    step1Sub:
      "اختر كل ما ينطبق. يمكن إرفاق المخططات أو جدول الكميات في الخطوة التالية.",
    selected: "تم الاختيار",
    step2Title: "تفاصيل المشروع",
    scopeSelectedLabel: "النطاق المختار:",
    noSystemsSelected: "لم يتم اختيار أي أنظمة بعد",
    projectName: "اسم المشروع",
    projectNamePlaceholder: "منشأة طريق الملك عبدالله — المرحلة 2",
    cityRegion: "المدينة / المنطقة",
    cityPlaceholder: "الرياض",
    phone: "الهاتف",
    phonePlaceholder: "+966 5X XXX XXXX",
    requiredOnSite: "الموعد المطلوب للموقع",
    requiredOnPlaceholder: "الربع الرابع 2026",
    orgType: "نوع الجهة",
    drawings: "المخططات / جدول الكميات",
    dropzone: "اسحب ملف PDF أو DWG أو XLSX — أو تصفّح",
    filesLabel: (n: number) => `${n} ملف${n > 1 ? "ات" : ""}`,
    step3Title: "المراجعة والإرسال",
    step3Sub: "يرد فريقنا الهندسي على الطلبات المؤهلة خلال يومَي عمل.",
    scope: "النطاق",
    project: "المشروع",
    clientType: "نوع العميل",
    attachments: "المرفقات",
    notSpecified: "غير محدد",
    requiredSuffix: (d: string) => ` · مطلوب ${d}`,
    noneAttached: "لا يوجد مرفقات",
    note: "يُكلَّف مهندس مختص بكل طلب — وتتعاملون معه شخصيًا من مرحلة التسعير وحتى التشغيل التجريبي.",
    back: "رجوع",
    stepOf: (n: number) => `الخطوة ${n} من 3`,
    sending: "جارٍ الإرسال…",
    submit: "إرسال الطلب",
    continue: "متابعة",
    dash: "—",
    errRequiredAttachments:
      "حجم المرفقات كبير جدًا — يرجى إبقاء الإجمالي أقل من 15 ميجابايت.",
    errSelectScope: "اختر نظامًا واحدًا على الأقل قبل المتابعة.",
    errProjectFields: "اسم المشروع والمدينة/المنطقة والهاتف حقول مطلوبة.",
    errGeneric: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    errGenericFallback:
      "حدث خطأ أثناء إرسال طلبكم — يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.",
  },
};

async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

export default function RfqClient({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale];
  const scopes = locale === "ar" ? SCOPES_AR : SCOPES;
  const orgTypes = locale === "ar" ? ORG_TYPES_AR : ORG_TYPES;

  const [step, setStep] = useState(1);
  const [picked, setPicked] = useState<number[]>([]);
  const [projectName, setProjectName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [orgType, setOrgType] = useState("");
  const [requiredOn, setRequiredOn] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const prevStep = useRef(step);

  useEffect(() => {
    const el = panelRef.current;
    if (el) {
      if (prefersReducedMotion()) {
        prevStep.current = step;
      } else {
        const forward = step > prevStep.current ? 1 : -1;
        const dir = locale === "ar" ? -forward : forward;
        gsap.fromTo(
          el,
          { opacity: 0, x: 24 * dir },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
        );
        prevStep.current = step;
      }
    }
    const bar = progressRef.current;
    if (bar) {
      const pct = (step / t.stepLabels.length) * 100;
      if (prefersReducedMotion()) {
        bar.style.width = `${pct}%`;
      } else {
        gsap.to(bar, { width: `${pct}%`, duration: 0.5, ease: "power2.out" });
      }
    }
  }, [step, locale, t.stepLabels.length]);

  const scopeSummary = picked.length
    ? picked.map((i) => scopes[i].title).join(" · ")
    : t.noSystemsSelected;

  function togglePick(i: number) {
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : p.concat(i)));
  }

  function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    const total = selected.reduce((sum, f) => sum + f.size, 0);
    if (total > MAX_TOTAL_BYTES) {
      setError(t.errRequiredAttachments);
      e.target.value = "";
      return;
    }
    setError("");
    setFiles(selected);
  }

  function goBack() {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  }

  async function goNext() {
    if (step === 1) {
      if (picked.length === 0) {
        setError(t.errSelectScope);
        return;
      }
      setError("");
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!projectName.trim() || !city.trim() || !phone.trim()) {
        setError(t.errProjectFields);
        return;
      }
      setError("");
      setStep(3);
      return;
    }

    setError("");
    setSending(true);
    try {
      const attachments = await Promise.all(
        files.map(async (f) => ({ filename: f.name, base64: await fileToBase64(f) }))
      );
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scopeSummary,
          projectName,
          city,
          phone,
          orgType,
          requiredOn,
          attachments,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || t.errGeneric);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errGenericFallback);
    } finally {
      setSending(false);
    }
  }

  function startOver() {
    setStep(1);
    setPicked([]);
    setProjectName("");
    setCity("");
    setPhone("");
    setOrgType("");
    setRequiredOn("");
    setFiles([]);
    setError("");
    setSubmitted(false);
  }

  return (
    <>
      <Header locale={locale} />

      <div className={styles.hero}>
        <div className={styles.rule} />
        <div className={styles.kicker}>{t.kicker}</div>
        <h1 className={styles.title}>{t.title}</h1>
      </div>

      {submitted ? (
        <div className={styles.confirm}>
          <div className={styles.confirmInner}>
            <div className={styles.confirmKicker}>{t.submittedKicker}</div>
            <h2 className={styles.confirmTitle}>{t.submittedTitle}</h2>
            <p className={styles.confirmBody}>
              {t.submittedBodyPrefix}{" "}
              <strong>{projectName || t.defaultProject}</strong>.{" "}
              {t.submittedBodySuffix}
            </p>
            <button type="button" className={styles.confirmReset} onClick={startOver}>
              {t.startOver}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.steps}>
            {t.stepLabels.map((label, i) => {
              const n = i + 1;
              const active = n === step;
              const done = n < step;
              return (
                <div
                  key={label}
                  className={styles.step}
                  style={{ background: active ? "#f4c300" : "#22282c" }}
                >
                  <div
                    className={styles.stepNum}
                    style={{
                      color: active
                        ? "rgba(0,0,0,.6)"
                        : done
                          ? "#f4c300"
                          : "rgba(255,255,255,.5)",
                    }}
                  >
                    {t.stepPrefix}
                    {n}
                  </div>
                  <div
                    className={styles.stepLabel}
                    style={{
                      color: active
                        ? "#1c2226"
                        : done
                          ? "#fff"
                          : "rgba(255,255,255,.55)",
                    }}
                  >
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.stepsProgress}>
            <div className={styles.stepsProgressFill} ref={progressRef} />
          </div>

          <div ref={panelRef}>
          {step === 1 && (
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>{t.step1Title}</h2>
              <p className={styles.panelSub}>{t.step1Sub}</p>
              {error && <p className={styles.error}>{error}</p>}
              <div className={styles.scopeGrid}>
                {scopes.map((s, i) => {
                  const on = picked.includes(i);
                  return (
                    <button
                      key={s.title}
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      className={`${styles.scopeCard} ${on ? styles.scopeCardActive : ""}`}
                      onClick={() => togglePick(i)}
                    >
                      <div className={styles.scopeHead}>
                        <span className={styles.scopeTitle}>{s.title}</span>
                        {on && <span className={styles.scopeMark}>{t.selected}</span>}
                      </div>
                      <p className={styles.scopeHint}>{s.hint}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>{t.step2Title}</h2>
              <p className={styles.panelSub}>
                {t.scopeSelectedLabel} <strong>{scopeSummary}</strong>
              </p>
              {error && <p className={styles.error}>{error}</p>}
              <div className={styles.fieldGrid}>
                <div>
                  <label className={styles.label} htmlFor="projectName">
                    {t.projectName}
                  </label>
                  <input
                    id="projectName"
                    className={styles.input}
                    placeholder={t.projectNamePlaceholder}
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="city">
                    {t.cityRegion}
                  </label>
                  <input
                    id="city"
                    className={styles.input}
                    placeholder={t.cityPlaceholder}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="phone">
                    {t.phone}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={styles.input}
                    placeholder={t.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="requiredOn">
                    {t.requiredOnSite}
                  </label>
                  <input
                    id="requiredOn"
                    className={styles.input}
                    placeholder={t.requiredOnPlaceholder}
                    value={requiredOn}
                    onChange={(e) => setRequiredOn(e.target.value)}
                  />
                </div>
                <div className={styles.fieldFull}>
                  <span className={styles.label}>{t.orgType}</span>
                  <div className={styles.pillRow}>
                    {orgTypes.map((o) => (
                      <button
                        key={o}
                        type="button"
                        className={`${styles.pill} ${orgType === o ? styles.pillActive : ""}`}
                        onClick={() => setOrgType(o)}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.fieldFull}>
                  <span className={styles.label}>{t.drawings}</span>
                  <label className={styles.dropzone}>
                    {t.dropzone}
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.dwg,.xlsx"
                      onChange={handleFiles}
                      style={{ display: "none" }}
                    />
                  </label>
                  {files.length > 0 && (
                    <div className={styles.dropzoneFiles}>
                      {t.filesLabel(files.length)} ·{" "}
                      {files.map((f) => f.name).join(", ")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>{t.step3Title}</h2>
              <p className={styles.panelSub}>{t.step3Sub}</p>
              {error && <p className={styles.error}>{error}</p>}
              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>{t.scope}</span>
                  <span className={styles.summaryValue}>{scopeSummary}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>{t.project}</span>
                  <span className={styles.summaryValue}>
                    {projectName || t.dash}
                    {city ? `, ${city}` : ""}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>{t.phone}</span>
                  <span className={styles.summaryValue} dir="ltr">
                    {phone || t.dash}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>{t.clientType}</span>
                  <span className={styles.summaryValue}>
                    {orgType || t.notSpecified}
                    {requiredOn ? t.requiredSuffix(requiredOn) : ""}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>{t.attachments}</span>
                  <span className={styles.summaryValue}>
                    {files.length
                      ? `${t.filesLabel(files.length)} · ${files.map((f) => f.name).join(", ")}`
                      : t.noneAttached}
                  </span>
                </div>
              </div>
              <div className={styles.note}>{t.note}</div>
            </div>
          )}
          </div>

          <div className={styles.nav}>
            <button
              type="button"
              className={styles.backBtn}
              onClick={goBack}
              disabled={step === 1 || sending}
            >
              {t.back}
            </button>
            <div className={styles.navRight}>
              <span className={styles.progress}>{t.stepOf(step)}</span>
              <button
                type="button"
                className={styles.nextBtn}
                onClick={goNext}
                disabled={sending}
              >
                {sending ? t.sending : step === 3 ? t.submit : t.continue}
              </button>
            </div>
          </div>
        </>
      )}

      <Footer locale={locale} />
    </>
  );
}
