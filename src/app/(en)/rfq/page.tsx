import type { Metadata } from "next";
import RfqClient from "./RfqClient";

export const metadata: Metadata = {
  title: "Request for Offer",
  description:
    "Tell us the scope and we'll come back with a priced offer. Our engineering team responds to qualified requests within two business days.",
  alternates: {
    canonical: "/rfq",
    languages: { en: "/rfq" }, // ar: "/ar/rfq" — disabled at client's request
  },
};

export default function RfqPage() {
  return <RfqClient />;
}
