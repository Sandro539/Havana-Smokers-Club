"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product, Variant } from "@/lib/types";
import { chf } from "@/lib/format";
import { unitPrice } from "@/lib/pricing";
import { useCart } from "./CartProvider";

interface Props {
  product: Product;
  stockLabel: string;
  stockTone: "ok" | "low" | "out";
  stockDetail: string;
}

export function BuyBox({ product: p, stockLabel, stockTone, stockDetail }: Props) {
  const { add } = useCart();
  const [variant, setVariant] = useState<Variant>("single");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const hasBox = !!(p.priceBox && p.boxSize);
  const soldOut = stockTone === "out";
  const maxQty = variant === "box" ? Math.max(1, p.stock.boxes) : 99;

  const price = variant === "box" ? p.priceBox! : unitPrice(p, "single", qty);
  const list = p.listPriceSingle ? (variant === "box" ? p.listPriceSingle * (p.boxSize ?? 1) : p.listPriceSingle) : undefined;
  const unitLabel = variant === "box" ? `Kiste à ${p.boxSize}` : "Pro Stück";
  const boxAvailable = hasBox && p.stock.boxes > 0;

  function pick(v: Variant) {
    setVariant(v);
    setQty(1);
    setAdded(false);
  }

  function addToCart() {
    add(p.id, variant, qty);
    setAdded(true);
  }

  return (
    <div className="buybox">
      <p className="pdp-price">
        <span>{chf(price)}</span>
        {list && list > price && (
          <span className="meta">
            statt <s>{chf(list)}</s>
          </span>
        )}
      </p>
      <p className="meta" style={{ marginTop: -6 }}>
        {unitLabel} · inkl. MWST
      </p>

      {hasBox && (
        <div className="variants" role="radiogroup" aria-label="Variante">
          <button type="button" role="radio" aria-checked={variant === "single"} className="variant" onClick={() => pick("single")}>
            <strong>Einzeln</strong>
            <span>{chf(p.priceSingle)} / Stk.</span>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={variant === "box"}
            className="variant"
            onClick={() => pick("box")}
            disabled={!boxAvailable}
          >
            <strong>Kiste à {p.boxSize}</strong>
            <span>{boxAvailable ? chf(p.priceBox!) : "Keine Kiste an Lager"}</span>
          </button>
        </div>
      )}

      {p.tiers.length > 0 && variant === "single" && (
        <dl className="tiers">
          <div>
            <dt>1–{p.tiers[0].minQty - 1} Stück</dt>
            <dd>{chf(p.priceSingle)}</dd>
          </div>
          {p.tiers.map((t) => (
            <div key={t.minQty}>
              <dt>ab {t.minQty} Stück</dt>
              <dd>{chf(t.price)}</dd>
            </div>
          ))}
        </dl>
      )}

      <p className="stock-line">
        <span className={`stamp stamp-flat${stockTone === "out" ? " stamp-red" : ""}`}>{stockLabel}</span>
        <span className="meta">{stockDetail}</span>
      </p>

      <div className="buy-row">
        <div className="stepper" role="group" aria-label="Menge">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Weniger" disabled={qty <= 1}>
            −
          </button>
          <output aria-live="polite">{qty}</output>
          <button type="button" onClick={() => setQty((q) => Math.min(maxQty, q + 1))} aria-label="Mehr" disabled={qty >= maxQty}>
            +
          </button>
        </div>
        <button type="button" className="btn btn-primary buy-btn" onClick={addToCart} disabled={soldOut}>
          {soldOut ? "Ausverkauft" : "In den Warenkorb"}
        </button>
      </div>
      {added && (
        <p className="fieldnote" role="status">
          Im Korb. <Link href="/warenkorb">Zum Warenkorb</Link>
        </p>
      )}

      {/* Mobile: fixierte Leiste */}
      <div className="sticky-buy hide-desktop">
        <span className="pdp-price-sm">{chf(price * qty)}</span>
        <button type="button" className="btn btn-primary" onClick={addToCart} disabled={soldOut}>
          {soldOut ? "Ausverkauft" : added ? "Im Korb ✓" : "In den Korb"}
        </button>
      </div>
    </div>
  );
}
