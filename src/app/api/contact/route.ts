import { NextResponse } from "next/server";
import { EMAIL_FROM, EMAIL_TO, escapeHtml, getResendClient, renderEmailHtml } from "@/lib/email";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, organisation, email, phone, subject, message } = (body ?? {}) as Record<
    string,
    unknown
  >;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !phone.trim() ||
    !message.trim()
  ) {
    return NextResponse.json(
      { error: "Please fill in your name, email, phone and message." },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const resend = getResendClient();
  if (!resend) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Email delivery isn't configured yet. Please call us instead." },
      { status: 500 }
    );
  }

  const html = renderEmailHtml("New website enquiry", [
    ["NAME", escapeHtml(name.trim())],
    ["ORGANISATION", escapeHtml(typeof organisation === "string" ? organisation.trim() || "—" : "—")],
    ["EMAIL", escapeHtml(email.trim())],
    ["PHONE", escapeHtml(phone.trim())],
    ["SUBJECT", escapeHtml(typeof subject === "string" ? subject.trim() || "—" : "—")],
    ["MESSAGE", escapeHtml(message.trim()).replace(/\n/g, "<br/>")],
  ]);

  try {
    const { error } = await resend.emails.send({
      from: `Eagle Eye Trading Est. <${EMAIL_FROM}>`,
      to: EMAIL_TO,
      replyTo: email.trim(),
      subject: `New enquiry: ${typeof subject === "string" && subject.trim() ? subject.trim() : "General"} — ${name.trim()}`,
      html,
    });

    if (error) {
      console.error("Resend error (contact):", error);
      return NextResponse.json({ error: "Failed to send your enquiry." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending contact email:", err);
    return NextResponse.json({ error: "Failed to send your enquiry." }, { status: 502 });
  }
}
