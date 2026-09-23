import type { Metadata } from "next";
import RfqClient from "../../(en)/rfq/RfqClient";

export const metadata: Metadata = {
  title: "اطلب عرض سعر",
  description:
    "أخبرنا بنطاق المشروع وسنعود إليكم بعرض سعر مُحدَّد. يرد فريقنا الهندسي على الطلبات المؤهلة خلال يومَي عمل.",
  alternates: {
    canonical: "/ar/rfq",
    languages: { en: "/rfq", ar: "/ar/rfq" },
  },
};

export default function RfqPageAr() {
  return <RfqClient locale="ar" />;
}
