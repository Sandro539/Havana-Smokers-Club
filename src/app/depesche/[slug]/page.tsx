import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { productById } from "@/lib/catalog";
import { dispatchBySlug, dispatches } from "@/lib/dispatches";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return dispatches.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const d = dispatchBySlug((await params).slug);
  if (!d) return {};
  return { title: `${d.title} · Depesche Nr. ${d.no}`, description: d.subline };
}

export default async function DispatchPage({ params }: { params: Promise<Params> }) {
  const d = dispatchBySlug((await params).slug);
  if (!d) notFound();
  const enclosed = d.enclosed.map(productById).filter((p) => !!p);

  return (
    <article>
      <header className="wrap section dispatch-head">
        <div>
          <p className="kicker">
            Depesche Nr. {d.no} · {d.place} · {d.coord}
          </p>
          <h1 className="page-title">{d.title}</h1>
          <p className="brand-subline">{d.subline}</p>
        </div>
        <aside className="regions" aria-label="Regionen">
          <p className="kicker" style={{ fontWeight: 700 }}>
            Regionen
          </p>
          <dl>
            {d.regions.map((r) => (
              <div key={r.name}>
                <dt>{r.name}</dt>
                <dd>{r.coord}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </header>

      <div className="wrap">
        <figure className="photo-placeholder dispatch-photo">
          <span className="stamp stamp-round stamp-red" style={{ position: "absolute", right: 24, top: 18 }}>
            {d.stamp}
          </span>
          <figcaption>{d.photoCaption}</figcaption>
        </figure>
      </div>

      <div className="wrap section dispatch-body">
        <aside className="brand-meta">
          <p>VON: {d.author}</p>
          <p>LESEZEIT: {d.readingTime}</p>
          <p>STAND: {d.updated}</p>
        </aside>
        <div className="dispatch-text">
          {d.body.map((b, i) =>
            typeof b === "string" ? (
              <p key={i} className="prose">
                {i === 0 && <span className="dateline">{d.dateline} </span>}
                {b}
              </p>
            ) : (
              <blockquote key={i} className="pullquote">
                {b.quote}
              </blockquote>
            ),
          )}
        </div>
        <aside className="brand-margin">
          {d.notes.map((n) => (
            <p key={n} className="fieldnote fieldnote-block">
              {n}
            </p>
          ))}
        </aside>
      </div>

      <section className="wrap section" aria-labelledby="enclosed">
        <div className="section-head">
          <h2 id="enclosed" className="section-title">
            Beigelegt: drei Zigarren aus {d.regions[0].name}
          </h2>
          <Link href={`/herkunft/${d.origin}`} className="link-arrow">
            Alle Marken
          </Link>
        </div>
        <div className="card-grid cols-3 as-list">
          {enclosed.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </article>
  );
}
