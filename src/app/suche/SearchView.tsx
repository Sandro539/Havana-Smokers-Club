"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductBrowser } from "@/components/ProductBrowser";
import { products } from "@/lib/catalog";

export function SearchView({ initialQuery }: { initialQuery: string }) {
  const [q, setQ] = useState(initialQuery);
  const router = useRouter();

  return (
    <>
      <section className="wrap section">
        <p className="kicker">Suche · Das ganze Lager</p>
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            router.replace(q ? `/suche?q=${encodeURIComponent(q)}` : "/suche", { scroll: false });
          }}
        >
          <label htmlFor="q" className="sr-only">
            Suchbegriff
          </label>
          <input
            id="q"
            className="search-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Marke, Format, Herkunft …"
            autoComplete="off"
            type="search"
          />
        </form>
      </section>
      <section className="wrap" style={{ paddingBottom: "var(--section)" }}>
        <ProductBrowser products={products} scope={q ? `«${q.toUpperCase()}»` : "GANZES LAGER"} query={q} noun={["Eintrag", "Einträge"]} />
      </section>
    </>
  );
}
