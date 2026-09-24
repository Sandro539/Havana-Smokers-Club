import Link from "next/link";
import { Chronik } from "@/components/Chronik";
import { NewsletterForm } from "@/components/NewsletterForm";
import { OriginMap } from "@/components/OriginMap";
import { ProductCard } from "@/components/ProductCard";
import { QuoteBand } from "@/components/QuoteBand";
import { TrustStamps } from "@/components/TrustStamps";
import { Vitola } from "@/components/Vitola";
import { chronicle, newArrivals, origins, productBySlug } from "@/lib/catalog";
import { chf } from "@/lib/format";

export default function HomePage() {
  const featured = productBySlug("partagas-serie-d-no-4")!;
  const arrivals = newArrivals();

  return (
    <>
      {/* Hero */}
      <section className="wrap section hero">
        <div>
          <p className="kicker">Depesche Nr. 41 · Pinar del Río · 22°25′N 83°41′W</p>
          <h1 className="display">Tabak aus Vuelta Abajo. Mehr braucht es nicht.</h1>
          <p className="hero-lead">Sieben Herkunftsländer, rund 120 Marken. Wählen Sie eine Region, wir erzählen den Rest.</p>
          <div className="btn-row">
            <Link href="#herkunft" className="btn btn-primary">
              Nach Herkunft reisen
            </Link>
            <Link href="/info/kontakt" className="btn">
              Beratung
            </Link>
          </div>
        </div>
        <OriginMap />
      </section>

      {/* Empfehlung */}
      <div className="wrap">
        <hr className="dashed" />
      </div>
      <section className="wrap section featured" aria-labelledby="featured-title">
        <p className="fieldnote fieldnote-block featured-note">Notiz: {featured.fieldNote}</p>
        <div>
          <p className="kicker">Aus dem Feld · Empfehlung</p>
          <h2 id="featured-title" className="featured-title">
            <Link href={`/produkt/${featured.slug}`}>Partagás {featured.name}</Link>
          </h2>
          <p className="meta" style={{ textTransform: "uppercase", margin: "8px 0 14px" }}>
            {featured.format} · {featured.lengthMm} mm × {featured.ringGauge} · Kuba
          </p>
          <p className="featured-price">
            {chf(featured.priceSingle)} {featured.listPriceSingle && <s className="price-strike">{chf(featured.listPriceSingle)}</s>}
          </p>
        </div>
        <Link href={`/produkt/${featured.slug}`} className="graph featured-graph" style={{ ["--s" as string]: "3px" }} aria-label="Zum Produkt">
          <Vitola length={featured.lengthMm!} ring={featured.ringGauge!} scale={2.6} dims />
        </Link>
      </section>

      {/* Frisch eingetroffen */}
      <section className="wrap section" aria-labelledby="arrivals-title">
        <div className="section-head">
          <h2 id="arrivals-title" className="section-title">
            Frisch eingetroffen
          </h2>
          <Link href="/suche" className="link-arrow">
            Alle Eingänge
          </Link>
        </div>
        <div className="card-grid cols-4 as-list">
          {arrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <Chronik entries={chronicle} kicker="Chronik · Tabak und Kuba" note="Jede Depesche beginnt irgendwo auf dieser Linie." />

      {/* Herkünfte */}
      <section id="herkunft" className="wrap section" aria-label="Herkünfte">
        <ol className="origins-strip">
          {origins.map((o, i) => (
            <li key={o.id}>
              <Link href={`/herkunft/${o.id}`}>
                <span className="kicker" style={{ fontSize: 10, marginBottom: 4 }}>
                  Depesche {String(i + 1).padStart(2, "0")}
                </span>
                <span className="os-name">{o.name}</span>
                <span className="meta">{o.coord}</span>
                <span className="os-text">{o.teaser}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <QuoteBand />

      {/* Über uns */}
      <section className="wrap section two-col story" aria-labelledby="story-title">
        <figure className="photo-placeholder story-photo">
          <span className="stamp stamp-flat" style={{ position: "absolute", right: 20, top: 20, transform: "rotate(-6deg)" }}>
            ST. GALLEN · 2003
          </span>
          <figcaption>Foto · Versandtisch in St. Gallen, Kisten mit Frachtzetteln</figcaption>
        </figure>
        <div>
          <p className="kicker">Über uns</p>
          <h2 id="story-title" className="section-title" style={{ marginBottom: 16 }}>
            Seit 2003. Aus St. Gallen.
          </h2>
          <p>
            Wir reisen nicht jedes Jahr nach Estelí. Aber wir kennen die Leute, die es tun, und wir probieren jede neue
            Kiste, bevor sie in den Shop kommt. Was nicht überzeugt, schicken wir zurück.
          </p>
          <p className="fieldnote">Beratung: Mo–Fr, am Telefon oder per E-Mail.</p>
        </div>
      </section>

      <section className="wrap" aria-label="Unsere Versprechen">
        <TrustStamps />
      </section>

      <div className="wrap section">
        <NewsletterForm />
      </div>
    </>
  );
}
