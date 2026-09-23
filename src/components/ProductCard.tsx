import Link from "next/link";
import type { Product } from "@/lib/types";
import { brandById, stockStatus } from "@/lib/catalog";
import { chf, productNo, strengthBoxes } from "@/lib/format";
import { fromPrice, shortLat, specLine } from "@/lib/product-utils";
import { Vitola } from "./Vitola";

/** Gemeinsamer Massstab aller Silhouetten in Karten (px/mm). */
export const CARD_SCALE = 1.2;

export function ProductCard({ product: p, metaRight }: { product: Product; metaRight?: string }) {
  const brand = brandById(p.brandId);
  const stock = stockStatus(p);
  const { price, isFrom } = fromPrice(p);
  const spec = specLine(p);
  const photo = p.images.find((i) => i.kind === "single") ?? p.images[0];

  return (
    <Link href={`/produkt/${p.slug}`} className="pcard">
      <span className="pcard-meta">
        <span>{productNo(p.no)}</span>
        <span>{metaRight ?? (shortLat(p.coord) || (p.category === "humidore" ? "HUMIDOR" : "ZUBEHÖR"))}</span>
      </span>
      {brand && p.category === "zigarren" && <span className="pcard-brand">{brand.name}</span>}
      <span className="pcard-name">{p.name}</span>
      <span className="pcard-visual">
        {photo ? (
          <span className="enclosure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt={photo.alt} className={photo.kind === "single" ? "img-single" : "img-box"} loading="lazy" />
          </span>
        ) : p.lengthMm && p.ringGauge ? (
          <Vitola length={p.lengthMm} ring={p.ringGauge} scale={CARD_SCALE} />
        ) : p.capacity ? (
          <span className="capacity">
            <span className="capacity-num">{p.capacity.value}</span>
            <span className="capacity-label">{p.capacity.label}</span>
          </span>
        ) : null}
      </span>
      {spec ? (
        <span className="pcard-spec">
          {spec}
          <br />
          STÄRKE <span aria-label={`${p.strength} von 5`}>{strengthBoxes(p.strength ?? 0)}</span>
        </span>
      ) : (
        <span className="pcard-spec" style={{ textTransform: "none", fontFamily: "var(--text)", fontSize: 14, color: "var(--pencil)" }}>
          {p.description}
        </span>
      )}
      <span className="pcard-foot">
        <span className="pcard-price">{chf(price, { from: isFrom })}</span>
        <span className={`stock${stock.tone === "out" ? " stock-out" : ""}`}>{stock.label}</span>
      </span>
    </Link>
  );
}
