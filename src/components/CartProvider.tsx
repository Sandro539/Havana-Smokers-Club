"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartLine, Product, Variant } from "@/lib/types";
import { productById } from "@/lib/catalog";
import { lineTotal, unitPrice } from "@/lib/pricing";

const STORAGE_KEY = "hsc-cart-v1";

export interface CartRow extends CartLine {
  product: Product;
  unit: number;
  total: number;
}

interface CartContextValue {
  lines: CartLine[];
  rows: CartRow[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (productId: string, variant: Variant, qty: number) => void;
  setQty: (productId: string, variant: Variant, qty: number) => void;
  remove: (productId: string, variant: Variant) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function sanitize(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (l): l is CartLine =>
      !!l &&
      typeof l.productId === "string" &&
      (l.variant === "single" || l.variant === "box") &&
      Number.isInteger(l.qty) &&
      l.qty > 0 &&
      !!productById(l.productId),
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setLines(sanitize(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")));
    } catch {
      /* Speicher nicht verfügbar: Korb bleibt leer */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignorieren */
    }
  }, [lines, ready]);

  const setQty = useCallback((productId: string, variant: Variant, qty: number) => {
    setLines((prev) => {
      const q = Math.max(0, Math.min(99, Math.floor(qty)));
      const rest = prev.filter((l) => !(l.productId === productId && l.variant === variant));
      if (q === 0) return rest;
      const idx = prev.findIndex((l) => l.productId === productId && l.variant === variant);
      if (idx === -1) return [...prev, { productId, variant, qty: q }];
      return prev.map((l, i) => (i === idx ? { ...l, qty: q } : l));
    });
  }, []);

  const add = useCallback((productId: string, variant: Variant, qty: number) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId && l.variant === variant);
      if (existing) {
        return prev.map((l) => (l === existing ? { ...l, qty: Math.min(99, l.qty + qty) } : l));
      }
      return [...prev, { productId, variant, qty: Math.min(99, qty) }];
    });
  }, []);

  const remove = useCallback((productId: string, variant: Variant) => setQty(productId, variant, 0), [setQty]);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const rows: CartRow[] = lines.flatMap((l) => {
      const product = productById(l.productId);
      if (!product) return [];
      return [{ ...l, product, unit: unitPrice(product, l.variant, l.qty), total: lineTotal(product, l.variant, l.qty) }];
    });
    const subtotal = Math.round(rows.reduce((s, r) => s + r.total, 0) * 100) / 100;
    const count = lines.reduce((s, l) => s + l.qty, 0);
    return { lines, rows, count, subtotal, ready, add, setQty, remove, clear };
  }, [lines, ready, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart ausserhalb von CartProvider");
  return ctx;
}
