"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { Vitola } from "@/components/Vitola";
import { brandById } from "@/lib/catalog";
import { chf } from "@/lib/format";

export function CartView() {
  const { rows, subtotal, setQty, remove, ready } = useCart();

  return (
    <div className="wrap section">
      <p className="kicker">[1] Korb · Inhalt der Sendung</p>
      <h1 className="page-title" style={{ marginBottom: 24 }}>
        Warenkorb
      </h1>

      {!ready ? null : rows.length === 0 ? (
        <div className="notecard" style={{ maxWidth: 560 }}>
          <p>Der Korb ist leer.</p>
          <p className="fieldnote">Jede Depesche beginnt mit einer Herkunft.</p>
          <Link href="/#herkunft" className="btn btn-primary">
            Nach Herkunft reisen
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <ul className="cart-lines">
            {rows.map((r) => {
              const brand = brandById(r.product.brandId);
              return (
                <li key={r.productId + r.variant} className="cart-line">
                  <div className="cl-visual">
                    {r.product.lengthMm && r.product.ringGauge ? (
                      <Vitola length={r.product.lengthMm} ring={r.product.ringGauge} scale={0.9} />
                    ) : (
                      <span className="capacity-num" style={{ fontSize: 36 }}>
                        {r.product.capacity?.value}
                      </span>
                    )}
                  </div>
                  <div className="cl-main">
                    <Link href={`/produkt/${r.product.slug}`} className="cl-name">
                      {r.product.category === "zigarren" && brand ? `${brand.name} ` : ""}
                      {r.product.name}
                    </Link>
                    <span className="meta">
                      {r.variant === "box" ? `Kiste à ${r.product.boxSize}` : "Einzeln"} · {chf(r.unit)} / {r.variant === "box" ? "Kiste" : "Stk."}
                    </span>
                  </div>
                  <div className="stepper" role="group" aria-label={`Menge ${r.product.name}`}>
                    <button type="button" onClick={() => setQty(r.productId, r.variant, r.qty - 1)} aria-label="Weniger">
                      −
                    </button>
                    <output>{r.qty}</output>
                    <button
                      type="button"
                      onClick={() => setQty(r.productId, r.variant, r.qty + 1)}
                      aria-label="Mehr"
                      disabled={r.variant === "box" && r.qty >= r.product.stock.boxes}
                    >
                      +
                    </button>
                  </div>
                  <span className="cl-total">{chf(r.total)}</span>
                  <button type="button" className="cl-remove" onClick={() => remove(r.productId, r.variant)} aria-label={`${r.product.name} entfernen`}>
                    ✕
                  </button>
                </li>
              );
            })}
          </ul>
          <aside className="summary">
            <p className="summary-title">Zwischenstand</p>
            <div className="sum-row">
              <span>ZWISCHENSUMME</span>
              <span>{chf(subtotal)}</span>
            </div>
            <p className="meta">Mengenstaffeln sind bereits eingerechnet. Porto folgt in der Kasse.</p>
            <Link href="/kasse" className="btn btn-primary btn-block">
              Zur Kasse
            </Link>
            <p className="meta" style={{ marginTop: 12 }}>
              Käuferschutz bis CHF 4&apos;000.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
