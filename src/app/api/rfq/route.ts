import { NextResponse } from "next/server";
import {
  EMAIL_FROM,
  EMAIL_TO,
  MAX_ATTACHMENTS_BYTES,
  escapeHtml,
  getResendClient,
  renderEmailHtml,
} from "@/lib/email";

type IncomingAttachment = {
  filename: string;
  base64: string;
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { scopeSummary, projectName, city, phone, orgType, requiredOn, attachments } = (body ??
    {}) as Record<string, unknown>;

  if (
    typeof projectName !== "string" ||
    typeof city !== "string" ||
    typeof phone !== "string" ||
    !projectName.trim() ||
    !city.trim() ||
    !phone.trim()
  ) {
    return NextResponse.json(
      { error: "Project name, city / region and phone are required." },
      { status: 400 }
    );
  }

  const scopeText =
    typeof scopeSummary === "string" && scopeSummary.trim()
      ? scopeSummary.trim()
      : "No systems selected";

  const attachmentList: IncomingAttachment[] = Array.isArray(attachments)
    ? attachments.filter(
        (a): a is IncomingAttachment =>
          !!a &&
          typeof a === "object" &&
          typeof (a as Record<string, unknown>).filename === "string" &&
          typeof (a as Record<string, unknown>).base64 === "string"
      )
    : [];

  let totalBytes = 0;
  for (const a of attachmentList) {
    // base64 -> raw byte estimate
    totalBytes += Math.ceil((a.base64.length * 3) / 4);
  }
  if (totalBytes > MAX_ATTACHMENTS_BYTES) {
    return NextResponse.json(
      { error: "Attachments are too large — please keep the total under 15MB." },
      { status: 413 }
    );
  }

  const resend = getResendClient();
  if (!resend) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Email delivery isn't configured yet. Please call us instead." },
      { status: 500 }
    );
  }

  const html = renderEmailHtml("New Request for Offer", [
    ["SCOPE", escapeHtml(scopeText)],
    ["PROJECT", escapeHtml(`${projectName.trim()}, ${city.trim()}`)],
    ["PHONE", escapeHtml(phone.trim())],
    [
      "CLIENT TYPE",
      escapeHtml(typeof orgType === "string" && orgType.trim() ? orgType.trim() : "Not specified"),
    ],
    [
      "REQUIRED ON SITE",
      escapeHtml(typeof requiredOn === "string" && requiredOn.trim() ? requiredOn.trim() : "—"),
    ],
    [
      "ATTACHMENTS",
      attachmentList.length
        ? escapeHtml(attachmentList.map((a) => a.filename).join(", "))
        : "None attached",
    ],
  ]);

  try {
    const { error } = await resend.emails.send({
      from: `Eagle Eye Trading Est. <${EMAIL_FROM}>`,
      to: EMAIL_TO,
      subject: `New RFQ: ${projectName.trim()} (${city.trim()})`,
      html,
      attachments: attachmentList.map((a) => ({
        filename: a.filename,
        content: Buffer.from(a.base64, "base64"),
      })),
    });

    if (error) {
      console.error("Resend error (rfq):", error);
      return NextResponse.json({ error: "Failed to send your request." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending RFQ email:", err);
    return NextResponse.json({ error: "Failed to send your request." }, { status: 502 });
  }
}
