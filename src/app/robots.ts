import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/kasse", "/warenkorb", "/api/"] },
    sitemap: "https://www.havanasmokersclub.ch/sitemap.xml",
  };
}
