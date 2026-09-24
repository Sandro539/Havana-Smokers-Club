import type { Metadata } from "next";
import { ProductBrowser } from "@/components/ProductBrowser";
import { products } from "@/lib/catalog";

export const metadata: Metadata = { title: "Zubehör", description: "Cutter, Feuer, Späne. Was wir selbst benutzen." };

export default function Page() {
  const items = products.filter((p) => p.category === "zubehoer");
  return (
    <>
      <section className="wrap section">
        <p className="kicker">Ausrüstung · St. Gallen</p>
        <h1 className="page-title">Zubehör</h1>
        <p className="brand-subline">Cutter, Feuer, Späne. Was wir selbst benutzen.</p>
      </section>
      <hr className="dashed" />
      <section className="wrap section">
        <ProductBrowser products={items} scope="ZUBEHöR" facets={[]} noun={["Artikel", "Artikel"]} />
      </section>
    </>
  );
}
