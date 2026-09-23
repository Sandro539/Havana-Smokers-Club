import Link from "next/link";
import { mapPoints } from "@/lib/catalog";

/** Karibik-Karte, equirektangulär: lon −90…−65, lat 5…25, Gradnetz 5°. */
export function OriginMap() {
  const x = (lon: number) => ((lon + 90) / 25) * 100;
  const y = (lat: number) => ((25 - lat) / 20) * 100;
  const lons = [-85, -80, -75, -70];
  const lats = [20, 15, 10];

  return (
    <figure style={{ margin: 0 }}>
      <div className="map" role="group" aria-label="Karte der Anbauregionen in der Karibik">
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
          {lons.map((l) => (
            <line key={l} x1={`${x(l)}%`} x2={`${x(l)}%`} y1="0" y2="100%" stroke="rgba(30,30,28,.2)" strokeWidth="1" />
          ))}
          {lats.map((l) => (
            <line key={l} y1={`${y(l)}%`} y2={`${y(l)}%`} x1="0" x2="100%" stroke="rgba(30,30,28,.2)" strokeWidth="1" />
          ))}
        </svg>
        <span className="map-axis" style={{ right: 6, top: 4 }}>25°N</span>
        <span className="map-axis" style={{ left: 6, bottom: 4 }}>90°W</span>
        <span className="map-axis" style={{ right: 6, bottom: 4 }}>65°W</span>
        {mapPoints.map((p) => (
          <div key={p.name}>
            <span className="map-dot" style={{ left: `${x(p.lon)}%`, top: `${y(p.lat)}%` }} aria-hidden="true" />
            <Link
              href={`/herkunft/${p.origin}`}
              className="map-label"
              style={
                p.side === "r"
                  ? { left: `calc(${x(p.lon)}% + 10px)`, top: `${y(p.lat)}%` }
                  : { right: `calc(${100 - x(p.lon)}% + 10px)`, top: `${y(p.lat)}%`, textAlign: "right" }
              }
            >
              <strong>{p.name}</strong>
              <small>{p.coord}</small>
            </Link>
          </div>
        ))}
      </div>
      <figcaption className="meta" style={{ display: "flex", justifyContent: "space-between", gap: 16, marginTop: 8 }}>
        <span>Karibik, Gradnetz 5° · Punkte nach realen Koordinaten</span>
        <Link href="/herkunft/afrika" style={{ color: "inherit" }}>+ Afrika: Kamerun 4°N 11°E</Link>
      </figcaption>
    </figure>
  );
}
