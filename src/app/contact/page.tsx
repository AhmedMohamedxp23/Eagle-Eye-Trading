import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk to an engineer, not a call centre. Reach Eagle Eye Trading Est. in Riyadh by phone, email or enquiry form — a named engineer responds within one business day.",
};

export default function ContactPage() {
  return <ContactClient />;
}
