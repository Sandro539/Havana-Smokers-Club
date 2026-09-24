import type { Product } from "@/lib/types";
import { originById } from "@/lib/catalog";
import { ringToMm } from "@/lib/format";
import { Strength } from "./Strength";

export function SpecBlock({ product: p, title = "Frachtbrief · Steckbrief" }: { product: Product; title?: string }) {
  const origin = p.origin ? originById(p.origin) : undefined;
  const rows: [string, React.ReactNode][] = [];
  if (p.format) rows.push(["Format", p.format]);
  if (p.lengthMm) rows.push(["Länge", `${p.lengthMm} mm`]);
  if (p.ringGauge) rows.push(["Ringmass", `${p.ringGauge} · Ø ${ringToMm(p.ringGauge).toFixed(1)} mm`]);
  if (origin) rows.push(["Herkunft", [origin.name === "Dom. Rep." ? "Dominikanische Republik" : origin.name, p.region].filter(Boolean).join(", ")]);
  if (p.wrapper) rows.push(["Deckblatt", p.wrapper]);
  if (p.boxSize) rows.push(["Kiste", `${p.boxSize} Stück`]);
  if (p.capacity) rows.push(["Inhalt", `${p.capacity.value} ${p.capacity.label}`]);
  if (p.strength) rows.push(["Stärke", <Strength key="s" value={p.strength} />]);

  return (
    <table className="specblock">
      <caption>{title}</caption>
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k}>
            <th scope="row">{k}</th>
            <td>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
