import Link from "next/link";
import { origins } from "@/lib/catalog";

export function OriginNav({ active }: { active?: string }) {
  return (
    <nav className="origin-nav" aria-label="Nach Herkunft">
      {origins.map((o) => (
        <Link key={o.id} href={`/herkunft/${o.id}`} className="on-cell" aria-current={active === o.id ? "page" : undefined}>
          <span className="on-name">{o.name}</span>
          <span className="on-coord on-coord-full">{o.coord}</span>
          <span className="on-coord on-coord-lat">{o.lat}</span>
        </Link>
      ))}
      <Link href="/humidore" className="on-extra" aria-current={active === "humidore" ? "page" : undefined}>
        Humidore
      </Link>
      <Link href="/zubehoer" className="on-extra" aria-current={active === "zubehoer" ? "page" : undefined}>
        Zubehör
      </Link>
    </nav>
  );
}
