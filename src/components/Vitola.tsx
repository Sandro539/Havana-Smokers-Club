import { ringToMm } from "@/lib/format";

interface VitolaProps {
  length: number;
  ring: number;
  /** Pixel pro Millimeter. Alle Silhouetten einer Seite nutzen denselben Massstab. */
  scale?: number;
  dims?: boolean;
  label?: string;
}

/** Massstabsgetreue Zigarrensilhouette, berechnet aus Länge und Ringmass. */
export function Vitola({ length, ring, scale = 2, dims = false, label }: VitolaProps) {
  const dia = ringToMm(ring);
  const w = length * scale;
  const h = Math.max(dia * scale, 5);
  const title = label ?? `${length} mm × Ringmass ${ring}`;

  return (
    <div
      className="vitola"
      role="img"
      aria-label={`Silhouette, massstabsgetreu: ${title}`}
      style={{ width: w, height: h + (dims ? 40 : 0) }}
    >
      <div
        className="vitola-body"
        style={{ width: w, height: h, borderRadius: `${h * 0.14}px ${h / 2}px ${h / 2}px ${h * 0.14}px` }}
      >
        <div className="vitola-foot" style={{ width: Math.max(2, scale * 1.2) }} />
        <div className="vitola-band" style={{ left: w * 0.78, width: Math.max(w * 0.075, 6) }} />
      </div>
      {dims && (
        <>
          <div className="vitola-line" style={{ top: h + 10, width: w }} />
          <div className="vitola-labels" style={{ top: h + 17, width: w }} aria-hidden="true">
            <span>{length} mm</span>
            <span>
              Ringmass {ring} · Ø {dia.toFixed(1)} mm
            </span>
          </div>
        </>
      )}
    </div>
  );
}
