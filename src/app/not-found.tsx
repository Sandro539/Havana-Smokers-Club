import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap section" style={{ maxWidth: 680, minHeight: "40vh" }}>
      <p className="kicker">404 · Unbekannte Koordinaten</p>
      <h1 className="page-title">Diese Depesche ist verloren gegangen.</h1>
      <p style={{ marginTop: 18 }}>Die Seite gibt es nicht oder nicht mehr.</p>
      <Link href="/" className="link-arrow">
        Zur Startseite
      </Link>
    </div>
  );
}
