import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { infoPages } from "@/lib/info";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return Object.keys(infoPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const page = infoPages[(await params).slug];
  return page ? { title: page.title } : {};
}

export default async function InfoPage({ params }: { params: Promise<Params> }) {
  const page = infoPages[(await params).slug];
  if (!page) notFound();
  return (
    <div className="wrap section" style={{ maxWidth: 760 }}>
      <p className="kicker">{page.kicker}</p>
      <h1 className="page-title" style={{ marginBottom: 24 }}>
        {page.title}
      </h1>
      {page.draft && <p className="fieldnote fieldnote-block">Entwurf: Inhalt vor dem Launch durch den Betreiber prüfen und ergänzen.</p>}
      {page.sections.map((s) => (
        <section key={s.heading ?? s.body[0]} style={{ marginBottom: 24 }}>
          {s.heading && <h2 className="section-title" style={{ fontSize: 26, marginBottom: 8 }}>{s.heading}</h2>}
          {s.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
      ))}
    </div>
  );
}
