import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductBrowser } from "@/components/ProductBrowser";
import { brandsByOrigin, originById, origins, productsByOrigin } from "@/lib/catalog";
import { dispatches } from "@/lib/dispatches";

type Params = { origin: string };

export function generateStaticParams(): Params[] {
  return origins.map((o) => ({ origin: o.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const o = originById((await params).origin);
  if (!o) return {};
  const name = o.id === "dom-rep" ? "der Dominikanischen Republik" : o.id === "no-name" ? "ohne Band (No Name)" : `aus ${o.name}`;
  return { title: `Zigarren ${name}`, description: `${o.teaser} ${o.intro}` };
}

export default async function OriginPage({ params }: { params: Promise<Params> }) {
  const o = originById((await params).origin);
  if (!o) notFound();
  const items = productsByOrigin(o.id);
  const brands = brandsByOrigin(o.id);
  const index = origins.indexOf(o) + 1;
  const dispatch = dispatches.find((d) => d.origin === o.id);

  return (
    <>
      <section className="wrap section brand-head">
        <div className="brand-meta">
          <p className="kicker" style={{ marginBottom: 6 }}>
            Depesche {String(index).padStart(2, "0")} / {o.name}
          </p>
          <p>REGION: {o.region}</p>
          <p>{o.regionCoord}</p>
          <p>MARKEN: {brands.length}</p>
          <p>VITOLAS: {items.length}</p>
        </div>
        <div className="brand-story">
          <h1 className="page-title">{o.name}</h1>
          <p className="brand-subline">{o.teaser}</p>
          <p className="prose">{o.intro}</p>
          {brands.length > 0 && (
            <p className="mono" style={{ fontSize: 14 }}>
              Marken:{" "}
              {brands.map((b, i) => (
                <span key={b.id}>
                  {i > 0 && " · "}
                  <Link href={`/marke/${b.id}`}>{b.name}</Link>
                </span>
              ))}
            </p>
          )}
        </div>
        <div className="brand-margin">
          {dispatch && (
            <p className="fieldnote">
              <Link href={`/depesche/${dispatch.slug}`} style={{ color: "inherit" }}>
                Depesche Nr. {dispatch.no}: {dispatch.title}
              </Link>
            </p>
          )}
          <span className="stamp">{o.coord}</span>
        </div>
      </section>
      <hr className="dashed" />
      <section className="wrap section" aria-label="Sortiment">
        <ProductBrowser products={items} scope={o.name.toUpperCase()} facets={["brand", "format", "ring", "length", "strength"]} />
      </section>
    </>
  );
}
