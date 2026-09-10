import { Resend } from "resend";

export const EMAIL_FROM = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
export const EMAIL_TO = process.env.CONTACT_TO_EMAIL || "sales@eagleeye-est.com";

// Resend's hard cap is 40MB per email (including base64-encoded attachments).
// Base64 inflates raw bytes by ~1.37x, so cap raw attachment payload well under that.
export const MAX_ATTACHMENTS_BYTES = 15 * 1024 * 1024; // 15MB combined, raw

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderEmailHtml(title: string, rows: [string, string][]) {
  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #e3dfd7;font:600 11px 'IBM Plex Mono',monospace;color:#6f767b;letter-spacing:.08em;white-space:nowrap;vertical-align:top">${escapeHtml(
            label
          )}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #e3dfd7;font:400 14px/1.6 -apple-system,sans-serif;color:#1c2226">${value}</td>
        </tr>`
    )
    .join("");

  return `
  <div style="font-family:-apple-system,sans-serif;background:#f7f5f1;padding:32px 16px">
    <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e3dfd7">
      <div style="background:#1c2226;padding:20px 24px;border-top:3px solid #f4c300">
        <span style="font:700 16px/1 -apple-system,sans-serif;color:#fff">Eagle Eye Trading Est.</span>
      </div>
      <div style="padding:20px 24px 4px">
        <h1 style="margin:0;font:700 20px/1.3 -apple-system,sans-serif;color:#1c2226">${escapeHtml(
          title
        )}</h1>
      </div>
      <table role="presentation" style="width:100%;border-collapse:collapse;margin-top:12px">
        ${rowsHtml}
      </table>
      <div style="padding:16px 24px;font:400 12px -apple-system,sans-serif;color:#6f767b">
        Sent automatically from the eagleeye-est.com website.
      </div>
    </div>
  </div>`;
}
