import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/BuyBox";
import { ChronikList } from "@/components/Chronik";
import { SpecBlock } from "@/components/SpecBlock";
import { Vitola } from "@/components/Vitola";
import { brandById, originById, productBySlug, products, productsByBrand, stockStatus } from "@/lib/catalog";
import { chf, productNo } from "@/lib/format";
import { fromPrice, shortLat } from "@/lib/product-utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return {};
  const brand = brandById(p.brandId);
  const title = p.category === "zigarren" ? `${brand?.name} ${p.name}` : p.name;
  return {
    title,
    description: p.format
      ? `${title}: ${p.format}, ${p.lengthMm} mm × ${p.ringGauge}. ${chf(fromPrice(p).price, { from: fromPrice(p).isFrom })}. Versand aus St. Gallen.`
      : `${title}. ${p.description ?? ""}`,
  };
}

/** Massstab so wählen, dass auch lange Formate ins Feld passen. */
const fit = (lengthMm: number, max: number, width: number) => Math.min(max, width / lengthMm);

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();

  const brand = brandById(p.brandId);
  const origin = p.origin ? originById(p.origin) : undefined;
  const stock = stockStatus(p);
  const isCigar = p.category === "zigarren" && p.lengthMm && p.ringGauge;
  const photo = p.images.find((i) => i.kind === "box") ?? p.images[0];

  const stockDetail =
    stock.tone === "out"
      ? "Wir bestellen nach. Fragen Sie uns."
      : [
          p.boxSize ? `${p.stock.boxes} ${p.stock.boxes === 1 ? "Kiste" : "Kisten"}` : null,
          `${p.stock.singles} Stück`,
          "Versand morgen",
        ]
          .filter(Boolean)
          .join(" · ");

  const related = isCigar
    ? productsByBrand(p.brandId)
        .filter((r) => r.id !== p.id && r.lengthMm && r.ringGauge && (!p.line || r.line === p.line))
        .sort((a, b) => a.lengthMm! - b.lengthMm!)
    : [];

  const desktopScale = isCigar ? fit(p.lengthMm!, 4.4, 540) : 4;
  const mobileScale = isCigar ? fit(p.lengthMm!, 2.4, 300) : 2;
  const relatedScale = 1.5;

  const crumbs = [
    origin ? { href: `/herkunft/${origin.id}`, label: origin.name } : { href: `/${p.category}`, label: p.category === "humidore" ? "Humidore" : "Zubehör" },
    origin && p.region ? { href: `/herkunft/${origin.id}`, label: p.region } : null,
    brand && p.category === "zigarren" ? { href: `/marke/${brand.id}`, label: brand.name } : null,
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <div className="wrap pdp-wrap">
      <nav className="crumbs" aria-label="Pfad">
        {crumbs.map((c) => (
          <span key={c.label}>
            <Link href={c.href}>{c.label}</Link> /{" "}
          </span>
        ))}
        <span aria-current="page">{p.name}</span>
      </nav>

      <div className="pdp">
        <div className="pdp-left">
          {isCigar ? (
            <>
              <div className="graph pdp-graph hide-mobile" style={{ ["--s" as string]: `${desktopScale}px` }}>
                <span className="graph-caption">1 Kästchen = 1 cm · massstabsgetreu</span>
                {photo && (
                  <figure className="taped">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.src} alt={photo.alt} />
                    <figcaption className="meta">Beilage · {photo.kind === "box" ? `Kiste à ${p.boxSize}` : "Einzelstück"}</figcaption>
                  </figure>
                )}
                <div className="pdp-vitola">
                  <Vitola length={p.lengthMm!} ring={p.ringGauge!} scale={desktopScale} dims />
                </div>
                {photo && <p className="fieldnote pdp-photo-note">Foto zeigt die {photo.kind === "box" ? "Kiste" : "Zigarre"}, die Zeichnung das Mass.</p>}
              </div>
              <div className="graph pdp-graph-m hide-desktop" style={{ ["--s" as string]: `${mobileScale}px` }}>
                <Vitola length={p.lengthMm!} ring={p.ringGauge!} scale={mobileScale} dims />
              </div>
            </>
          ) : (
            <div className="graph pdp-graph pdp-graph-acc" style={{ ["--s" as string]: "4px" }}>
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo.src} alt={photo.alt} />
              ) : (
                <span className="capacity">
                  <span className="capacity-num" style={{ fontSize: 140 }}>
                    {p.capacity?.value}
                  </span>
                  <span className="capacity-label">{p.capacity?.label}</span>
                </span>
              )}
            </div>
          )}

          {(p.tastingNotes || p.pairings) && (
            <div className="pdp-notes hide-mobile">
              {p.tastingNotes && (
                <div className="notecard">
                  <p className="kicker">Feldnotiz · Degustation</p>
                  {p.tastingNotes.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
              )}
              {p.pairings && (
                <div className="notecard">
                  <p className="kicker">Feldnotiz · Dazu</p>
                  {p.pairings.map((t) => (
                    <p key={t}>→ {t}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          {brand && brand.chronicle.length > 0 && p.category === "zigarren" && (
            <div className="pdp-chronik hide-mobile">
              <p className="kicker">Chronik der Marke</p>
              <ChronikList entries={brand.chronicle.map((c) => ({ year: c.label, text: c.text }))} />
            </div>
          )}
        </div>

        <div className="pdp-right">
          <p className="kicker">
            {[brand && p.category === "zigarren" ? brand.name : null, origin?.name, p.coord && p.coord !== origin?.name ? p.coord : null]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <h1 className="pdp-title">{p.name}</h1>
          {p.description && <p>{p.description}</p>}

          <BuyBox product={p} stockLabel={stock.label} stockTone={stock.tone} stockDetail={stockDetail} />

          <SpecBlock product={p} title={p.category === "zigarren" ? "Frachtbrief · Steckbrief" : "Steckbrief"} />
          <p className="meta" style={{ marginTop: 14, textTransform: "uppercase" }}>
            Käuferschutz bis CHF 4&apos;000 · <Link href="/info/kontakt">Beratung</Link> · Seit 2003
          </p>

          {(p.tastingNotes || p.fieldNote) && (
            <div className="notecard hide-desktop" style={{ marginTop: 18 }}>
              <p className="kicker">Feldnotiz</p>
              {p.tastingNotes ? p.tastingNotes.slice(1, 4).map((t) => <p key={t}>{t}</p>) : <p>{p.fieldNote}</p>}
              {p.pairings && <p>→ {p.pairings.slice(0, 2).join(", ")}</p>}
            </div>
          )}
          {p.placeholder && (
            <p className="fieldnote" style={{ marginTop: 18 }}>
              Platzhalterdaten ({productNo(p.no)}): Preis, Lager und Masse vor dem Launch prüfen.
            </p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="section" aria-labelledby="related-title">
          <div className="section-head">
            <h2 id="related-title" className="section-title">
              Weitere Formate {p.line ? "der Serie" : "der Marke"}
            </h2>
          </div>
          <ul className="related-strip">
            {related.map((r) => (
              <li key={r.id}>
                <Link href={`/produkt/${r.slug}`}>
                  <span className="rs-vitola">
                    <Vitola length={r.lengthMm!} ring={r.ringGauge!} scale={relatedScale} />
                  </span>
                  <span className="rs-name">
                    {r.name}{" "}
                    <span className="meta" style={{ textTransform: "uppercase" }}>
                      {r.format} · {r.lengthMm} × {r.ringGauge}
                    </span>
                  </span>
                  <span className="rs-price">{chf(r.priceSingle)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="fieldnote" style={{ marginTop: 10 }}>
            Gleicher Massstab. Linien alle 10 mm.
          </p>
        </section>
      )}
    </div>
  );
}
