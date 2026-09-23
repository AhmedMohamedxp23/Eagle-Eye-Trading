import type { Metadata } from "next";
import ProductsClient from "../../(en)/products/ProductsClient";

export const metadata: Metadata = {
  title: "منتجاتنا",
  description:
    "مجموعة متكاملة من الحلول الكهربائية والأمنية عبر خمس فئات منتجات — الأمن، تقنية المعلومات والاتصالات، الذكاء الاصطناعي، أنظمة إنذار الحريق، وتجهيزات الإنارة.",
  alternates: {
    canonical: "/ar/products",
    languages: { en: "/products", ar: "/ar/products" },
  },
};

export default function ProductsPageAr() {
  return <ProductsClient locale="ar" />;
}
