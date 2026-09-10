import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "A complete range of electrical and security solutions across five product families — security, ICT, AI, fire alarm systems and lighting fixtures.",
};

export default function ProductsPage() {
  return <ProductsClient />;
}
