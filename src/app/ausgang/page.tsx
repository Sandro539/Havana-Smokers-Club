import type { Metadata } from "next";

export const metadata: Metadata = { title: "Bis bald", robots: { index: false } };

export default function ExitPage() {
  return (
    <div className="wrap section" style={{ maxWidth: 680, minHeight: "50vh" }}>
      <p className="kicker">Grenze · geschlossen</p>
      <h1 className="page-title">Hier endet die Reise. Vorerst.</h1>
      <p style={{ marginTop: 18 }}>
        Tabakwaren verkaufen wir nur an Personen ab 18 Jahren. Wir freuen uns, Sie später wiederzusehen.
      </p>
      <p className="fieldnote">Rauchen schadet Ihrer Gesundheit und der Ihrer Mitmenschen.</p>
    </div>
  );
}
