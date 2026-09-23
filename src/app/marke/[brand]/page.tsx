import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductBrowser } from "@/components/ProductBrowser";
import { brandById, brands, brandsByOrigin, originById, productsByBrand } from "@/lib/catalog";

type Params = { brand: string };

export function generateStaticParams(): Params[] {
  return brands.filter((b) => productsByBrand(b.id).some((p) => p.category === "zigarren")).map((b) => ({ brand: b.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const b = brandById((await params).brand);
  if (!b) return {};
  return { title: `${b.name} Zigarren`, description: `${b.subline} ${b.story[0] ?? ""}` };
}

export default async function BrandPage({ params }: { params: Promise<Params> }) {
  const b = brandById((await params).brand);
  if (!b) notFound();
  const origin = originById(b.origin)!;
  const items = productsByBrand(b.id).filter((p) => p.category === "zigarren");
  if (!items.length) notFound();
  const siblings = brandsByOrigin(b.origin);
  const lines = new Set(items.map((p) => p.line).filter(Boolean));

  return (
    <>
      <section className="wrap section brand-head">
        <div className="brand-meta">
          <p className="kicker" style={{ marginBottom: 6 }}>
            <Link href={`/herkunft/${origin.id}`} style={{ color: "inherit", textDecoration: "none" }}>
              {origin.name}
            </Link>{" "}
            / N° {siblings.indexOf(b) + 1} von {siblings.length}
          </p>
          <p>ORT: {b.place}</p>
          <p>{b.coord}</p>
          {b.altitude && <p>HÖHE: {b.altitude}</p>}
          {lines.size > 0 && <p>LINIEN: {lines.size}</p>}
          <p>VITOLAS: {items.length}</p>
        </div>
        <div className="brand-story">
          <h1 className="page-title">{b.name}</h1>
          <p className="brand-subline">{b.subline}</p>
          {b.story.map((para) => (
            <p key={para} className="prose">
              {para}
            </p>
          ))}
        </div>
        <div className="brand-margin">
          {b.fieldNotes.map((n) => (
            <p key={n} className="fieldnote">
              {n}
            </p>
          ))}
          {b.stamp && <span className="stamp stamp-red">{b.stamp}</span>}
        </div>
      </section>
      <hr className="dashed" />
      <section className="wrap section" aria-label="Sortiment">
        <ProductBrowser
          products={items}
          scope={`${origin.name.toUpperCase()} / ${b.name.toUpperCase()}`}
          facets={["format", "ring", "length", "strength"]}
        />
      </section>
    </>
  );
}
