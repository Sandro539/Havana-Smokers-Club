const items = [
  { h: "SEIT 2003", b: "Über zwanzig Jahre aus St. Gallen." },
  { h: "PERSÖNLICHE BERATUNG", b: "Von Menschen, die selbst rauchen." },
  { h: "SCHNELL MIT DER POST", b: "Bis 15 Uhr bestellt, morgen da." },
  { h: "KÄUFERSCHUTZ CHF 4'000", b: "Von der Kasse bis zur Tür." },
];

export function TrustStamps() {
  return (
    <ul className="trust" style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((t) => (
        <li key={t.h} className="trust-item">
          <strong>{t.h}</strong>
          <span>{t.b}</span>
        </li>
      ))}
    </ul>
  );
}
