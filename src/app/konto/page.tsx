import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Konto", robots: { index: false } };

export default function AccountPage() {
  return (
    <div className="wrap section" style={{ maxWidth: 680 }}>
      <p className="kicker">Konto · Stammkunden</p>
      <h1 className="page-title">Ihr Konto</h1>
      <div className="notecard" style={{ marginTop: 24 }}>
        <p>Das Kundenkonto mit Bestellhistorie und gespeicherten Adressen folgt mit der Anbindung des Shop-Backends.</p>
        <p className="fieldnote">Bis dahin bestellen Sie ohne Konto. Für frühere Bestellungen: rufen Sie uns an.</p>
        <Link href="/info/kontakt" className="btn">
          Kontakt
        </Link>
      </div>
    </div>
  );
}
