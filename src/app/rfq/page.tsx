import type { Metadata } from "next";
import RfqClient from "./RfqClient";

export const metadata: Metadata = {
  title: "Request for Offer",
  description:
    "Tell us the scope and we'll come back with a priced offer. Our engineering team responds to qualified requests within two business days.",
};

export default function RfqPage() {
  return <RfqClient />;
}
