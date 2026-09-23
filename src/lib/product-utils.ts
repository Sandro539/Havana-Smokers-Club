import type { Product } from "./types";

/** Einzelpreis; «ab CHF …», sobald Staffel oder Kiste günstiger sein können. */
export function fromPrice(p: Product): { price: number; isFrom: boolean } {
  return { price: p.priceSingle, isFrom: p.tiers.length > 0 || !!p.priceBox };
}

export function shortLat(coord?: string): string {
  return coord ? coord.split(" ")[0] : "";
}

export function specLine(p: Product): string | null {
  if (!p.format || !p.lengthMm || !p.ringGauge) return null;
  return `${p.format} · ${p.lengthMm} × ${p.ringGauge}`;
}
