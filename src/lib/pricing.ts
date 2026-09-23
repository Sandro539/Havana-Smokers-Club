import type { PaymentId, PriceTier, ShippingId, Variant } from "./types.ts";

export interface PricedProduct {
  priceSingle: number;
  priceBox?: number;
  boxSize?: number;
  tiers: PriceTier[];
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Stückpreis nach Mengenstaffel (gilt nur für Einzelstücke). */
export function unitPrice(product: PricedProduct, variant: Variant, qty: number): number {
  if (variant === "box") {
    if (product.priceBox === undefined) throw new Error("Produkt hat keine Kiste");
    return product.priceBox;
  }
  let price = product.priceSingle;
  for (const tier of [...product.tiers].sort((a, b) => a.minQty - b.minQty)) {
    if (qty >= tier.minQty) price = tier.price;
  }
  return price;
}

export function lineTotal(product: PricedProduct, variant: Variant, qty: number): number {
  return round2(unitPrice(product, variant, qty) * qty);
}

export const SHIPPING: Record<ShippingId, { title: string; detail: string; price: number; label: string }> = {
  priority: { title: "PostPac Priority", detail: "Morgen, bei Bestellung bis 15 Uhr", price: 9, label: "Porto Priority" },
  economy: { title: "PostPac Economy", detail: "2–3 Werktage", price: 7, label: "Porto Economy" },
  pickup: { title: "Abholung St. Gallen", detail: "Nach Vereinbarung", price: 0, label: "Abholung" },
};

export const PAYMENTS: Record<PaymentId, { title: string; detail: string }> = {
  twint: { title: "TWINT", detail: "Direkt in der App" },
  "postfinance-card": { title: "PostFinance Card", detail: "Debitkarte" },
  "postfinance-efinance": { title: "PostFinance E-Finance", detail: "Im E-Banking" },
  visa: { title: "Visa", detail: "Kreditkarte" },
  mastercard: { title: "Mastercard", detail: "Kreditkarte" },
  invoice: { title: "Rechnung", detail: "Innert 30 Tagen" },
  prepayment: { title: "Vorauskasse", detail: "Versand nach Eingang" },
};

/** Alter in vollen Jahren am Stichtag. */
export function ageOn(birth: { day: number; month: number; year: number }, today: Date): number {
  let age = today.getFullYear() - birth.year;
  const m = today.getMonth() + 1;
  if (m < birth.month || (m === birth.month && today.getDate() < birth.day)) age--;
  return age;
}

/** Prüft, ob Tag/Monat/Jahr ein echtes Kalenderdatum ergeben. */
export function isValidDate(birth: { day: number; month: number; year: number }): boolean {
  const { day, month, year } = birth;
  if (![day, month, year].every(Number.isInteger)) return false;
  if (year < 1900 || month < 1 || month > 12 || day < 1) return false;
  const d = new Date(Date.UTC(year, month - 1, day));
  return d.getUTCFullYear() === year && d.getUTCMonth() === month - 1 && d.getUTCDate() === day;
}

export function isAdult(birth: { day: number; month: number; year: number }, today = new Date()): boolean {
  return isValidDate(birth) && ageOn(birth, today) >= 18;
}
