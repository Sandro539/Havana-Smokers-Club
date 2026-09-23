"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { brandById, origins, stockStatus } from "@/lib/catalog";
import { fromPrice } from "@/lib/product-utils";
import { ProductCard } from "./ProductCard";

type FacetKey = "origin" | "brand" | "format" | "ring" | "length" | "strength";

const RING = [
  { id: "s", label: "bis 46", test: (r: number) => r <= 46 },
  { id: "m", label: "47–52", test: (r: number) => r > 46 && r <= 52 },
  { id: "l", label: "ab 53", test: (r: number) => r > 52 },
];
const LENGTH = [
  { id: "s", label: "< 120 mm", test: (l: number) => l < 120 },
  { id: "m", label: "120–150 mm", test: (l: number) => l >= 120 && l <= 150 },
  { id: "l", label: "> 150 mm", test: (l: number) => l > 150 },
];
const STRENGTH = [
  { id: "mild", label: "■□□ mild", test: (s: number) => s <= 2 },
  { id: "mittel", label: "■■□ mittel", test: (s: number) => s === 3 },
  { id: "kraeftig", label: "■■■ kräftig", test: (s: number) => s >= 4 },
];

const SORTS = {
  "length-asc": { label: "Länge ↑", fn: (a: Product, b: Product) => (a.lengthMm ?? 0) - (b.lengthMm ?? 0) },
  "price-asc": { label: "Preis ↑", fn: (a: Product, b: Product) => fromPrice(a).price - fromPrice(b).price },
  "price-desc": { label: "Preis ↓", fn: (a: Product, b: Product) => fromPrice(b).price - fromPrice(a).price },
  "strength-asc": { label: "Stärke ↑", fn: (a: Product, b: Product) => (a.strength ?? 0) - (b.strength ?? 0) },
} as const;
type SortKey = keyof typeof SORTS;

type Selected = Record<FacetKey, string[]>;
const empty: Selected = { origin: [], brand: [], format: [], ring: [], length: [], strength: [] };

interface Props {
  products: Product[];
  /** Pfad für die Ergebniszeile, z. B. "NICARAGUA / NICARAO" */
  scope: string;
  facets?: FacetKey[];
  query?: string;
  noun?: [string, string];
}

export function ProductBrowser({ products, scope, facets = ["origin", "brand", "format", "ring", "length", "strength"], query = "", noun = ["Vitola", "Vitolas"] }: Props) {
  const [sel, setSel] = useState<Selected>(empty);
  const [inStock, setInStock] = useState(false);
  const priceBounds = useMemo(() => {
    const prices = products.map((p) => fromPrice(p).price);
    return prices.length ? { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) } : { min: 0, max: 0 };
  }, [products]);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [sort, setSort] = useState<SortKey>("length-asc");
  const [sheet, setSheet] = useState(false);

  useEffect(() => setMaxPrice(priceBounds.max), [priceBounds.max]);

  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheet(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [sheet]);

  const options = useMemo(() => {
    const uniq = <T,>(xs: T[]) => [...new Set(xs)];
    return {
      origin: uniq(products.map((p) => p.origin).filter(Boolean) as string[]).map((id) => ({ id, label: origins.find((o) => o.id === id)?.name ?? id })),
      brand: uniq(products.map((p) => p.brandId)).map((id) => ({ id, label: brandById(id)?.name ?? id })),
      format: uniq(products.map((p) => p.format).filter(Boolean) as string[]).sort().map((f) => ({ id: f, label: f })),
      ring: RING.filter((r) => products.some((p) => p.ringGauge && r.test(p.ringGauge))),
      length: LENGTH.filter((r) => products.some((p) => p.lengthMm && r.test(p.lengthMm))),
      strength: STRENGTH.filter((r) => products.some((p) => p.strength && r.test(p.strength))),
    };
  }, [products]);

  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    const match = (key: FacetKey, p: Product) => {
      const v = sel[key];
      if (!v.length) return true;
      switch (key) {
        case "origin":
          return !!p.origin && v.includes(p.origin);
        case "brand":
          return v.includes(p.brandId);
        case "format":
          return !!p.format && v.includes(p.format);
        case "ring":
          return !!p.ringGauge && RING.some((r) => v.includes(r.id) && r.test(p.ringGauge!));
        case "length":
          return !!p.lengthMm && LENGTH.some((r) => v.includes(r.id) && r.test(p.lengthMm!));
        case "strength":
          return !!p.strength && STRENGTH.some((r) => v.includes(r.id) && r.test(p.strength!));
      }
    };
    return products
      .filter((p) => {
        if (q) {
          const hay = [p.name, brandById(p.brandId)?.name, p.format, p.origin, p.region, p.wrapper, p.line].join(" ").toLowerCase();
          if (!q.split(/\s+/).every((w) => hay.includes(w))) return false;
        }
        if (inStock && stockStatus(p).tone === "out") return false;
        if (fromPrice(p).price > maxPrice) return false;
        return (Object.keys(sel) as FacetKey[]).every((k) => match(k, p));
      })
      .sort(SORTS[sort].fn);
  }, [products, sel, inStock, maxPrice, sort, q]);

  const toggle = (key: FacetKey, id: string) =>
    setSel((s) => ({ ...s, [key]: s[key].includes(id) ? s[key].filter((x) => x !== id) : [...s[key], id] }));

  const chips = (Object.keys(sel) as FacetKey[]).flatMap((k) =>
    sel[k].map((id) => ({ k, id, label: (options[k] as { id: string; label: string }[]).find((o) => o.id === id)?.label ?? id })),
  );
  const activeCount = chips.length + (inStock ? 1 : 0) + (maxPrice < priceBounds.max ? 1 : 0);

  const resetAll = () => {
    setSel(empty);
    setInStock(false);
    setMaxPrice(priceBounds.max);
  };

  const titles: Record<FacetKey, string> = { origin: "Herkunft", brand: "Marke", format: "Format", ring: "Ringmass", length: "Länge", strength: "Stärke" };

  const panel = (
    <div className="filters">
      {facets.map((key) =>
        options[key].length > 1 ? (
          <fieldset key={key}>
            <legend>{titles[key]}</legend>
            {(options[key] as { id: string; label: string }[]).map((o) => {
              const on = sel[key].includes(o.id);
              return (
                <label key={o.id} className="checkline">
                  <input type="checkbox" checked={on} onChange={() => toggle(key, o.id)} />
                  <span className="mark" aria-hidden="true">
                    {on ? "[✕]" : "[ ]"}
                  </span>
                  <span>{o.label}</span>
                </label>
              );
            })}
          </fieldset>
        ) : null,
      )}
      <fieldset>
        <legend>Lager</legend>
        <label className="checkline">
          <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
          <span className="mark" aria-hidden="true">
            {inStock ? "[✕]" : "[ ]"}
          </span>
          <span>nur an Lager</span>
        </label>
      </fieldset>
      {priceBounds.max > priceBounds.min && (
        <fieldset>
          <legend>Preis</legend>
          <label className="price-range">
            <span className="sr-only">Höchstpreis</span>
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={1}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <span className="meta">
              CHF {priceBounds.min} – {maxPrice}
            </span>
          </label>
        </fieldset>
      )}
      {activeCount > 0 && (
        <button type="button" className="link-arrow as-button" onClick={resetAll}>
          Alle Filter löschen
        </button>
      )}
    </div>
  );

  return (
    <div className="browser">
      <aside className="browser-side hide-mobile" aria-label="Filter">
        <p className="filters-title">Filter</p>
        {panel}
      </aside>

      <div className="browser-main">
        <div className="chip-row hide-desktop">
          <button type="button" className="chip" onClick={() => setSheet(true)} aria-haspopup="dialog">
            Filter [{activeCount}]
          </button>
          <label className="chip">
            <span className="sr-only">Sortierung</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
              {Object.entries(SORTS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className={`chip${inStock ? " on" : ""}`} aria-pressed={inStock} onClick={() => setInStock((v) => !v)}>
            An Lager
          </button>
        </div>

        <div className="result-bar">
          <span aria-live="polite">
            {results.length} {results.length === 1 ? "Eintrag" : "Einträge"} · {scope}
            {inStock ? " / AN LAGER" : ""}
          </span>
          <label className="hide-mobile">
            SORTIERUNG:{" "}
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
              {Object.entries(SORTS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {chips.length > 0 && (
          <ul className="active-chips" aria-label="Aktive Filter">
            {chips.map((c) => (
              <li key={c.k + c.id}>
                <button type="button" className="chip on" onClick={() => toggle(c.k, c.id)} aria-label={`Filter ${c.label} entfernen`}>
                  {c.label} ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        {results.length ? (
          <div className="card-grid cols-3 as-list">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} metaRight={p.line?.toUpperCase()} />
            ))}
          </div>
        ) : (
          <div className="empty-note">
            <p className="fieldnote">Keine Einträge für diese Auswahl.</p>
            <button type="button" className="btn" onClick={resetAll}>
              Filter löschen
            </button>
          </div>
        )}
      </div>

      {sheet && (
        <div className="sheet-backdrop" onClick={() => setSheet(false)}>
          <div className="sheet" role="dialog" aria-modal="true" aria-label="Filter" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-head">
              <p className="filters-title" style={{ margin: 0 }}>
                Filter
              </p>
              <button type="button" className="chip" onClick={() => setSheet(false)} aria-label="Schliessen">
                ✕
              </button>
            </div>
            {panel}
            <button type="button" className="btn btn-primary btn-block sheet-cta" onClick={() => setSheet(false)}>
              {results.length} {results.length === 1 ? noun[0] : noun[1]} zeigen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
