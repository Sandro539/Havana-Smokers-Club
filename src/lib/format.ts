/** Schweizer Preisformat: CHF 22.35, Tausender mit Apostroph: CHF 4'000.00 */
export function chf(amount: number, opts: { from?: boolean; noDecimals?: boolean } = {}): string {
  const fixed = amount.toFixed(opts.noDecimals ? 0 : 2);
  const [int, dec] = fixed.split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  const value = dec ? `${grouped}.${dec}` : grouped;
  return `${opts.from ? "ab " : ""}CHF ${value}`;
}

/** Durchmesser in mm aus dem Ringmass (1/64 Zoll) */
export function ringToMm(ring: number): number {
  return (ring * 25.4) / 64;
}

export function strengthBoxes(strength: number): string {
  const s = Math.max(0, Math.min(5, Math.round(strength)));
  return "■".repeat(s) + "□".repeat(5 - s);
}

export const strengthLabels: Record<number, string> = {
  1: "mild",
  2: "mild-mittel",
  3: "mittel",
  4: "mittel-kräftig",
  5: "kräftig",
};

export function productNo(no: number): string {
  return `№ ${String(no).padStart(4, "0")}`;
}
