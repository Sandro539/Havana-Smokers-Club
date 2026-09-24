import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p style={{ margin: "0 0 6px" }}>HAVANA SMOKERS CLUB · 9000 ST. GALLEN · 47°25′N 9°22′E</p>
          <p style={{ margin: 0 }}>Tabakwaren nur an Personen ab 18 Jahren.</p>
        </div>
        <ul>
          <li><Link href="/info/ueber-uns">Über uns</Link></li>
          <li><Link href="/info/kontakt">Kontakt &amp; Beratung</Link></li>
          <li><Link href="/info/versand">Versand &amp; Zahlung</Link></li>
          <li><Link href="/depesche/esteli">Depesche aus Estelí</Link></li>
        </ul>
        <ul>
          <li><Link href="/info/agb">AGB</Link></li>
          <li><Link href="/info/datenschutz">Datenschutz</Link></li>
          <li><Link href="/info/impressum">Impressum</Link></li>
          <li>TWINT · POSTFINANCE · VISA · MASTERCARD · RECHNUNG · VORAUSKASSE</li>
        </ul>
      </div>
    </footer>
  );
}
