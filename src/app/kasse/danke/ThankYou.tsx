"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { chf } from "@/lib/format";
import type { OrderSummary } from "@/lib/order";

export function ThankYou({ orderNo }: { orderNo: string }) {
  const [order, setOrder] = useState<OrderSummary | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("hsc-last-order");
      const parsed = raw ? (JSON.parse(raw) as OrderSummary) : null;
      if (parsed?.orderNo === orderNo) setOrder(parsed);
    } catch {
      /* nur Nummer anzeigen */
    }
  }, [orderNo]);

  return (
    <div className="wrap section" style={{ maxWidth: 760 }}>
      <p className="kicker">Depesche aufgegeben · {orderNo || "—"}</p>
      <h1 className="page-title">Danke. Ihre Depesche ist aufgegeben.</h1>
      <p style={{ marginTop: 18 }}>
        Wir haben Ihre Bestellung erhalten und melden uns, sobald das Paket bei der Post ist.
      </p>
      {order && (
        <div className="summary" style={{ marginTop: 24 }}>
          <p className="summary-title">Frachtzettel {order.orderNo}</p>
          {order.lines.map((l) => (
            <div key={l.productId + l.variant} className="sum-row">
              <span>
                {l.qty} × {l.name} ({l.variant})
              </span>
              <span>{chf(l.total)}</span>
            </div>
          ))}
          <div className="sum-row">
            <span>{order.shipping.label.toUpperCase()}</span>
            <span>{chf(order.shipping.price)}</span>
          </div>
          <div className="sum-row sum-total">
            <span>TOTAL INKL. MWST</span>
            <span>{chf(order.total)}</span>
          </div>
          <p className="meta">Zahlungsart: {order.payment.title}</p>
        </div>
      )}
      <span className="stamp" style={{ margin: "28px 0" }}>
        Volljährig bestätigt
      </span>
      <p>
        <Link href="/" className="link-arrow">
          Zurück zur Startseite
        </Link>
      </p>
    </div>
  );
}
