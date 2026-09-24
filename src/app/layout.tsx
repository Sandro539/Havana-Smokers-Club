import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Courier_Prime, Lora } from "next/font/google";
import "./globals.css";
import "./pages.css";
import { AgeGate } from "@/components/AgeGate";
import { CartProvider } from "@/components/CartProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, type NavContext } from "@/components/SiteHeader";
import { brands, products } from "@/lib/catalog";
import { dispatches } from "@/lib/dispatches";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const lora = Lora({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-lora", display: "swap" });
const courier = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--font-courier", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.havanasmokersclub.ch"),
  title: {
    default: "Havana Smokers Club · Zigarren aus St. Gallen, seit 2003",
    template: "%s · Havana Smokers Club",
  },
  description:
    "Zigarren nach Herkunft: Kuba, Nicaragua, Dominikanische Republik, Honduras, Costa Rica, Afrika. Persönliche Beratung und schneller Versand mit der Post, aus St. Gallen seit 2003.",
  openGraph: { locale: "de_CH", siteName: "Havana Smokers Club", type: "website" },
};

export const viewport: Viewport = { themeColor: "#F2EEE4" };

const nav: NavContext = {
  products: Object.fromEntries(products.map((p) => [p.slug, p.category === "zigarren" ? (p.origin ?? "") : p.category])),
  brands: Object.fromEntries(brands.map((b) => [b.id, b.origin])),
  dispatches: Object.fromEntries(dispatches.map((d) => [d.slug, d.origin])),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH" className={`${cormorant.variable} ${lora.variable} ${courier.variable}`}>
      <body>
        <a href="#inhalt" className="skip-link">
          Zum Inhalt
        </a>
        <CartProvider>
          <SiteHeader nav={nav} />
          <main id="inhalt">{children}</main>
          <SiteFooter />
          <AgeGate />
        </CartProvider>
      </body>
    </html>
  );
}
