import type { Metadata } from "next";
import ContactClient from "../../(en)/contact/ContactClient";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description:
    "تحدث مع مهندس، لا مع مركز اتصالات. تواصلوا مع مؤسسة عين النسر التجارية في الرياض عبر الهاتف أو البريد الإلكتروني أو نموذج الاستفسار — مهندس مختص يرد خلال يوم عمل واحد.",
  alternates: {
    canonical: "/ar/contact",
    languages: { en: "/contact", ar: "/ar/contact" },
  },
};

export default function ContactPageAr() {
  return <ContactClient locale="ar" />;
}
