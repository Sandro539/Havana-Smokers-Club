import { productById, stockStatus } from "./catalog.ts";
import { PAYMENTS, SHIPPING, isAdult, isValidDate, lineTotal, unitPrice } from "./pricing.ts";
import type { CartLine, PaymentId, ShippingId } from "./types.ts";

export interface OrderRequest {
  lines: CartLine[];
  birth: { day: number; month: number; year: number };
  ageConfirmed: boolean;
  shipping: ShippingId;
  payment: PaymentId;
  address: {
    name: string;
    street: string;
    zip: string;
    city: string;
    email: string;
    phone?: string;
  };
}

export interface OrderSummary {
  orderNo: string;
  lines: { productId: string; name: string; variant: string; qty: number; unit: number; total: number }[];
  subtotal: number;
  shipping: { id: ShippingId; label: string; price: number };
  payment: { id: PaymentId; title: string };
  total: number;
}

export type ValidationResult = { ok: true; order: OrderSummary } | { ok: false; errors: Record<string, string> };

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Serverseitige Prüfung der Bestellung: Preise werden aus dem Katalog neu berechnet,
 * das Alter wird erneut geprüft (Pflicht nach Tabakproduktegesetz).
 */
export function validateOrder(input: unknown, today = new Date()): ValidationResult {
  const errors: Record<string, string> = {};
  const req = (input ?? {}) as Partial<OrderRequest>;

  const lines = Array.isArray(req.lines) ? req.lines : [];
  if (!lines.length) errors.lines = "Der Warenkorb ist leer.";

  const summaryLines: OrderSummary["lines"] = [];
  for (const l of lines) {
    const p = l && typeof l.productId === "string" ? productById(l.productId) : undefined;
    if (!p || (l.variant !== "single" && l.variant !== "box") || !Number.isInteger(l.qty) || l.qty < 1 || l.qty > 99) {
      errors.lines = "Ein Artikel im Warenkorb ist ungültig.";
      continue;
    }
    if (l.variant === "box" && (!p.priceBox || p.stock.boxes < l.qty)) {
      errors.lines = `${p.name}: nicht genug Kisten an Lager.`;
      continue;
    }
    if (stockStatus(p).tone === "out") {
      errors.lines = `${p.name} ist ausverkauft.`;
      continue;
    }
    summaryLines.push({
      productId: p.id,
      name: p.name,
      variant: l.variant === "box" ? `Kiste à ${p.boxSize}` : "Einzeln",
      qty: l.qty,
      unit: unitPrice(p, l.variant, l.qty),
      total: lineTotal(p, l.variant, l.qty),
    });
  }

  const b = req.birth;
  const birth = b ? { day: Number(b.day), month: Number(b.month), year: Number(b.year) } : undefined;
  if (!birth || !isValidDate(birth)) errors.birth = "Bitte ein gültiges Geburtsdatum eintragen.";
  else if (!isAdult(birth, today)) errors.birth = "Tabakwaren verkaufen wir nur an Personen ab 18 Jahren.";
  if (req.ageConfirmed !== true) errors.ageConfirmed = "Bitte bestätigen Sie Ihre Volljährigkeit.";

  const shipping = req.shipping && req.shipping in SHIPPING ? req.shipping : undefined;
  if (!shipping) errors.shipping = "Bitte eine Versandart wählen.";
  const payment = req.payment && req.payment in PAYMENTS ? req.payment : undefined;
  if (!payment) errors.payment = "Bitte eine Zahlungsart wählen.";

  const a = req.address ?? ({} as Partial<OrderRequest["address"]>);
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  if (str(a.name).length < 2) errors.name = "Bitte Vor- und Nachnamen angeben.";
  if (!/^\S+@\S+\.\S+$/.test(str(a.email))) errors.email = "Bitte eine gültige E-Mail-Adresse angeben.";
  if (shipping !== "pickup") {
    if (str(a.street).length < 3) errors.street = "Bitte Strasse und Nummer angeben.";
    if (!/^\d{4}$/.test(str(a.zip))) errors.zip = "Bitte eine Schweizer Postleitzahl (4 Ziffern) angeben.";
    if (str(a.city).length < 2) errors.city = "Bitte den Ort angeben.";
  }

  if (Object.keys(errors).length || !shipping || !payment) return { ok: false, errors };

  const subtotal = round2(summaryLines.reduce((s, l) => s + l.total, 0));
  const ship = SHIPPING[shipping];
  const orderNo = `HSC-${today.getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  return {
    ok: true,
    order: {
      orderNo,
      lines: summaryLines,
      subtotal,
      shipping: { id: shipping, label: ship.label, price: ship.price },
      payment: { id: payment, title: PAYMENTS[payment].title },
      total: round2(subtotal + ship.price),
    },
  };
}
