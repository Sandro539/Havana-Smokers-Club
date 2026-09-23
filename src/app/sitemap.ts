import type { MetadataRoute } from "next";
import { brands, origins, products, productsByBrand } from "@/lib/catalog";
import { dispatches } from "@/lib/dispatches";

const base = "https://www.havanasmokersclub.ch";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/humidore",
    "/zubehoer",
    "/info/versand",
    "/info/ueber-uns",
    ...origins.map((o) => `/herkunft/${o.id}`),
    ...brands.filter((b) => productsByBrand(b.id).some((p) => p.category === "zigarren")).map((b) => `/marke/${b.id}`),
    ...products.map((p) => `/produkt/${p.slug}`),
    ...dispatches.map((d) => `/depesche/${d.slug}`),
  ].map((path) => ({ url: `${base}${path}` }));
}
