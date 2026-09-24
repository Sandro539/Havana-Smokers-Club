import { test } from "node:test";
import assert from "node:assert/strict";
import { validateOrder } from "../src/lib/order.ts";

const today = new Date(2026, 8, 23);
const base = {
  lines: [
    { productId: "partagas-serie-d-no-4", variant: "box", qty: 1 },
    { productId: "nicarao-especial-gordo", variant: "single", qty: 5 },
  ],
  birth: { day: 14, month: 3, year: 1968 },
  ageConfirmed: true,
  shipping: "priority",
  payment: "twint",
  address: { name: "Max Muster", street: "Bahnhofstrasse 1", zip: "9000", city: "St. Gallen", email: "max@example.ch" },
};

test("gültige Bestellung wird serverseitig neu berechnet", () => {
  const r = validateOrder(base, today);
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(r.order.subtotal, 536.25 + 57.5);
  assert.equal(r.order.shipping.price, 9);
  assert.equal(r.order.total, 602.75);
});

test("Minderjährige werden abgewiesen", () => {
  const r = validateOrder({ ...base, birth: { day: 1, month: 1, year: 2010 } }, today);
  assert.equal(r.ok, false);
  if (r.ok) return;
  assert.match(r.errors.birth, /18 Jahren/);
});

test("fehlende Bestätigung, falsche PLZ und unbekannte Produkte", () => {
  const r = validateOrder(
    { ...base, ageConfirmed: false, address: { ...base.address, zip: "12" }, lines: [{ productId: "gibts-nicht", variant: "single", qty: 1 }] },
    today,
  );
  assert.equal(r.ok, false);
  if (r.ok) return;
  assert.ok(r.errors.ageConfirmed && r.errors.zip && r.errors.lines);
});

test("Abholung braucht keine Adresse", () => {
  const r = validateOrder({ ...base, shipping: "pickup", address: { name: "Max Muster", email: "max@example.ch" } }, today);
  assert.ok(r.ok);
});
