"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ORG_TYPES, SCOPES } from "@/lib/data";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./page.module.css";

const STEP_LABELS = ["Scope", "Project details", "Review & submit"];
const MAX_TOTAL_BYTES = 15 * 1024 * 1024; // 15MB combined, matches the API's cap

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

export default function RfqClient() {
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
        const dir = step > prevStep.current ? 1 : -1;
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
      const pct = (step / STEP_LABELS.length) * 100;
      if (prefersReducedMotion()) {
        bar.style.width = `${pct}%`;
      } else {
        gsap.to(bar, { width: `${pct}%`, duration: 0.5, ease: "power2.out" });
      }
    }
  }, [step]);

  const scopeSummary = picked.length
    ? picked.map((i) => SCOPES[i].title).join(" · ")
    : "No systems selected yet";

  function togglePick(i: number) {
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : p.concat(i)));
  }

  function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    const total = selected.reduce((sum, f) => sum + f.size, 0);
    if (total > MAX_TOTAL_BYTES) {
      setError("Attachments are too large — please keep the total under 15MB.");
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
        setError("Select at least one system before continuing.");
        return;
      }
      setError("");
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!projectName.trim() || !city.trim() || !phone.trim()) {
        setError("Project name, city / region and phone are required.");
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
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong sending your request — please try again or call us directly."
      );
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
      <Header />

      <div className={styles.hero}>
        <div className={styles.rule} />
        <div className={styles.kicker}>REQUEST FOR OFFER</div>
        <h1 className={styles.title}>
          Tell us the scope. We&apos;ll come back with a priced offer.
        </h1>
      </div>

      {submitted ? (
        <div className={styles.confirm}>
          <div className={styles.confirmInner}>
            <div className={styles.confirmKicker}>REQUEST SUBMITTED</div>
            <h2 className={styles.confirmTitle}>
              A named engineer is now on your request.
            </h2>
            <p className={styles.confirmBody}>
              Thank you — we&apos;ve logged your scope for{" "}
              <strong>{projectName || "your project"}</strong>. Our
              engineering team responds to qualified requests within two
              business days.
            </p>
            <button
              type="button"
              className={styles.confirmReset}
              onClick={startOver}
            >
              START A NEW REQUEST
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.steps}>
            {STEP_LABELS.map((label, i) => {
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
                    STEP 0{n}
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
              <h2 className={styles.panelTitle}>Which systems are in scope?</h2>
              <p className={styles.panelSub}>
                Select all that apply. Drawings or a bill of quantities can be
                attached in the next step.
              </p>
              {error && <p className={styles.error}>{error}</p>}
              <div className={styles.scopeGrid}>
                {SCOPES.map((s, i) => {
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
                        {on && (
                          <span className={styles.scopeMark}>SELECTED</span>
                        )}
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
              <h2 className={styles.panelTitle}>Project details</h2>
              <p className={styles.panelSub}>
                Scope selected: <strong>{scopeSummary}</strong>
              </p>
              {error && <p className={styles.error}>{error}</p>}
              <div className={styles.fieldGrid}>
                <div>
                  <label className={styles.label} htmlFor="projectName">
                    PROJECT NAME
                  </label>
                  <input
                    id="projectName"
                    className={styles.input}
                    placeholder="King Abdullah Rd. Facility — Phase 2"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="city">
                    CITY / REGION
                  </label>
                  <input
                    id="city"
                    className={styles.input}
                    placeholder="Riyadh"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="phone">
                    PHONE
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={styles.input}
                    placeholder="+966 5X XXX XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="requiredOn">
                    REQUIRED ON SITE
                  </label>
                  <input
                    id="requiredOn"
                    className={styles.input}
                    placeholder="Q4 2026"
                    value={requiredOn}
                    onChange={(e) => setRequiredOn(e.target.value)}
                  />
                </div>
                <div className={styles.fieldFull}>
                  <span className={styles.label}>ORGANISATION TYPE</span>
                  <div className={styles.pillRow}>
                    {ORG_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={`${styles.pill} ${orgType === t ? styles.pillActive : ""}`}
                        onClick={() => setOrgType(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.fieldFull}>
                  <span className={styles.label}>
                    DRAWINGS / BILL OF QUANTITIES
                  </span>
                  <label className={styles.dropzone}>
                    drop PDF, DWG or XLSX — or browse
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
                      {files.length} file{files.length > 1 ? "s" : ""} ·{" "}
                      {files.map((f) => f.name).join(", ")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Review &amp; submit</h2>
              <p className={styles.panelSub}>
                Our engineering team responds to qualified requests within two
                business days.
              </p>
              {error && <p className={styles.error}>{error}</p>}
              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>SCOPE</span>
                  <span className={styles.summaryValue}>{scopeSummary}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>PROJECT</span>
                  <span className={styles.summaryValue}>
                    {projectName || "—"}
                    {city ? `, ${city}` : ""}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>PHONE</span>
                  <span className={styles.summaryValue}>{phone || "—"}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>CLIENT TYPE</span>
                  <span className={styles.summaryValue}>
                    {orgType || "Not specified"}
                    {requiredOn ? ` · required ${requiredOn}` : ""}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>ATTACHMENTS</span>
                  <span className={styles.summaryValue}>
                    {files.length
                      ? `${files.length} file${files.length > 1 ? "s" : ""} · ${files.map((f) => f.name).join(", ")}`
                      : "None attached"}
                  </span>
                </div>
              </div>
              <div className={styles.note}>
                A named engineer is assigned to every request — you deal with
                the same person from pricing through commissioning.
              </div>
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
              Back
            </button>
            <div className={styles.navRight}>
              <span className={styles.progress}>Step {step} of 3</span>
              <button
                type="button"
                className={styles.nextBtn}
                onClick={goNext}
                disabled={sending}
              >
                {sending ? "Sending…" : step === 3 ? "Submit request" : "Continue"}
              </button>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
}
