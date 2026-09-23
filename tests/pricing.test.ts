import { test } from "node:test";
import assert from "node:assert/strict";
import { chf, ringToMm, strengthBoxes } from "../src/lib/format.ts";
import { ageOn, isAdult, isValidDate, lineTotal, unitPrice } from "../src/lib/pricing.ts";

const partagas = {
  priceSingle: 22.35,
  priceBox: 536.25,
  boxSize: 25,
  tiers: [
    { minQty: 5, price: 21.9 },
    { minQty: 10, price: 21.45 },
  ],
};

test("chf formatiert Schweizer Preise", () => {
  assert.equal(chf(22.35), "CHF 22.35");
  assert.equal(chf(4000), "CHF 4'000.00");
  assert.equal(chf(1234567.5), "CHF 1'234'567.50");
  assert.equal(chf(11.9, { from: true }), "ab CHF 11.90");
});

test("Ringmass in Durchmesser", () => {
  assert.equal(ringToMm(50).toFixed(1), "19.8");
  assert.equal(strengthBoxes(4), "■■■■□");
});

test("Mengenstaffel greift automatisch", () => {
  assert.equal(unitPrice(partagas, "single", 1), 22.35);
  assert.equal(unitPrice(partagas, "single", 4), 22.35);
  assert.equal(unitPrice(partagas, "single", 5), 21.9);
  assert.equal(unitPrice(partagas, "single", 10), 21.45);
  assert.equal(lineTotal(partagas, "single", 5), 109.5);
  assert.equal(lineTotal(partagas, "box", 1), 536.25);
});

test("Altersprüfung", () => {
  const today = new Date(2026, 8, 23); // 23.09.2026
  assert.equal(ageOn({ day: 14, month: 3, year: 1968 }, today), 58);
  assert.equal(isAdult({ day: 23, month: 9, year: 2008 }, today), true);
  assert.equal(isAdult({ day: 24, month: 9, year: 2008 }, today), false);
  assert.equal(isValidDate({ day: 31, month: 2, year: 1990 }), false);
  assert.equal(isValidDate({ day: 29, month: 2, year: 2000 }), true);
});
