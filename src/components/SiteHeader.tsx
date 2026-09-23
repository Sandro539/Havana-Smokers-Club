"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "./CartProvider";
import { OriginNav } from "./OriginNav";

export interface NavContext {
  /** slug → aktive Herkunft bzw. Kategorie, für Produkt-, Marken- und Depeschenseiten */
  products: Record<string, string>;
  brands: Record<string, string>;
  dispatches: Record<string, string>;
}

function activeFor(path: string, ctx: NavContext): string | undefined {
  const [, section, slug] = path.split("/");
  if (section === "herkunft") return slug;
  if (section === "humidore" || section === "zubehoer") return section;
  if (section === "produkt") return ctx.products[slug];
  if (section === "marke") return ctx.brands[slug];
  if (section === "depesche") return ctx.dispatches[slug];
  return undefined;
}

export function SiteHeader({ nav }: { nav: NavContext }) {
  const path = usePathname() ?? "/";
  const { count, ready } = useCart();
  const inCheckout = path.startsWith("/kasse") && !path.startsWith("/kasse/danke");

  if (inCheckout) {
    return (
      <header className="site-header" style={{ borderBottom: "1.5px solid var(--ink)" }}>
        <div className="wrap header-bar">
          <Link href="/" className="logo">
            <span className="logo-name">Havana Smokers Club</span>
          </Link>
          <p className="meta hide-mobile" style={{ margin: 0 }}>
            [✓] KORB —— <b style={{ color: "var(--ribbon)" }}>[2] ALTER</b> —— [3] VERSAND —— [4] ZAHLUNG
          </p>
          <span className="meta">SSL</span>
        </div>
      </header>
    );
  }

  return (
    <header className="site-header">
      <div className="wrap">
        <div className="header-bar">
          <Link href="/" className="logo" aria-label="Havana Smokers Club, Startseite">
            <span className="logo-name">Havana Smokers Club</span>
            <span className="logo-tag">Depeschen aus den Tabakregionen · St. Gallen, seit 2003</span>
          </Link>
          <nav className="header-actions" aria-label="Service">
            <Link href="/suche">
              <Search className="ico" size={20} strokeWidth={1.5} aria-hidden="true" />
              <span className="txt">Suche</span>
              <span className="sr-only ico">Suche</span>
            </Link>
            <Link href="/konto">
              <User className="ico" size={20} strokeWidth={1.5} aria-hidden="true" />
              <span className="txt">Konto</span>
              <span className="sr-only ico">Konto</span>
            </Link>
            <Link href="/warenkorb" className="cart-link" aria-label={`Warenkorb, ${ready ? count : 0} Artikel`}>
              <ShoppingBag className="ico" size={20} strokeWidth={1.5} aria-hidden="true" />
              <span className="txt">Korb</span> [{ready ? count : 0}]
            </Link>
          </nav>
        </div>
        <OriginNav active={activeFor(path, nav)} />
      </div>
    </header>
  );
}
