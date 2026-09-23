import type { Metadata } from "next";
import { ProductBrowser } from "@/components/ProductBrowser";
import { products } from "@/lib/catalog";

export const metadata: Metadata = { title: "Humidore", description: "Zeder, Hygrometer, Geduld. Damit die Zigarre so bleibt, wie sie ankam." };

export default function Page() {
  const items = products.filter((p) => p.category === "humidore");
  return (
    <>
      <section className="wrap section">
        <p className="kicker">Ausrüstung · St. Gallen</p>
        <h1 className="page-title">Humidore</h1>
        <p className="brand-subline">Zeder, Hygrometer, Geduld. Damit die Zigarre so bleibt, wie sie ankam.</p>
      </section>
      <hr className="dashed" />
      <section className="wrap section">
        <ProductBrowser products={items} scope="HUMIDORE" facets={[]} noun={["Artikel", "Artikel"]} />
      </section>
    </>
  );
}
