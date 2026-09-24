# Havana Smokers Club · Webshop «Die Depesche»

Neuer Webshop für [www.havanasmokersclub.ch](https://www.havanasmokersclub.ch). Er ersetzt den bisherigen PepperShop.
Umgesetzt nach dem Design-Handoff «Die Depesche» (siehe [`docs/design/HANDOFF.md`](docs/design/HANDOFF.md) und die Screenshots in `docs/design/screenshots/`).

**Stack:** Next.js 16 (App Router) · TypeScript · CSS-Variablen (keine UI-Bibliothek) · Lucide-Icons · Schriften selbst gehostet über `next/font` (Cormorant Garamond, Lora, Courier Prime).

## Starten

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # Produktionsbuild
npm test           # Preis-, Alters- und Bestelllogik
npm run lint       # TypeScript-Prüfung
```

Node.js 20.9 oder neuer.

## Was drin ist

| Seite | Pfad | Hinweise |
|---|---|---|
| Altersabfrage | Overlay auf allen Seiten | Bestätigung pro Sitzung, mit «merken» 30 Tage (localStorage). «Nein» führt zu `/ausgang`. |
| Startseite | `/` | Karte der Anbauregionen, Empfehlung, Neueingänge, Chronik, Martí-Zitatband, Über uns, Vertrauensstempel, Newsletter |
| Herkunft | `/herkunft/[kuba…no-name]` | Navigation nach Herkunft, Filter und Sortierung |
| Marke | `/marke/[id]` | z. B. `/marke/nicarao`: Geschichte, Feldnotizen, Stempel, Filter |
| Produkt | `/produkt/[slug]` | Massstabsgetreue Vitola auf Millimeterpapier, Einzeln/Kiste, Mengenstaffel, Steckbrief, weitere Formate im gleichen Massstab. Mobile: fixierte Kaufleiste |
| Humidore, Zubehör | `/humidore`, `/zubehoer` | Typografische Karten (Kapazität statt Foto) |
| Suche | `/suche?q=` | Volltext über Marke, Name, Format, Herkunft, Deckblatt |
| Warenkorb | `/warenkorb` | Staffelpreise werden automatisch angewendet |
| Kasse | `/kasse` | Feld 2 Alter (Geburtsdatum, Pflicht), Feld 3 Versand (Post) und Adresse, Feld 4 Zahlung. Mobile: ein Schritt pro Bildschirm |
| Redaktion | `/depesche/esteli` | «Zigarren aus Nicaragua» |
| Info | `/info/[ueber-uns, kontakt, versand, agb, datenschutz, impressum]` | Rechtstexte sind **Entwürfe** |

Dazu `sitemap.xml`, `robots.txt`, Metadaten pro Seite und eine 404-Seite.

## Aufbau

```
src/
  app/                 Seiten (App Router), globals.css (Tokens + Komponenten), pages.css (Seitenlayouts)
    api/orders         Bestellung annehmen: prüft Alter ≥ 18 und berechnet Preise serverseitig neu
    api/newsletter     Newsletter-Anmeldung (noch ohne Anbieter)
  components/          Vitola, ProductCard, OriginNav, OriginMap, Chronik, QuoteBand, SpecBlock,
                       BuyBox, ProductBrowser (Filter), AgeGate, CartProvider …
  lib/
    catalog.ts         Herkünfte, Marken, Produkte (Datenmodell nach Handoff)
    pricing.ts         Staffelpreise, Versand, Zahlarten, Altersprüfung
    order.ts           Serverseitige Validierung der Bestellung
    dispatches.ts      Redaktionelle Depeschen
public/images/products Produktfotos des Kunden
tests/                 node:test-Tests
docs/design/           Design-Handoff (Referenz, nicht Teil der App)
```

## Vor dem Launch offen

Der Shop ist als Frontend mit vollständiger Kauf-Strecke gebaut. Folgendes ist **bewusst noch nicht angeschlossen**:

1. **Produktdaten:** Nur Partagás Serie D No. 4, Nicarao Especial Gordo, Nicarao Don Rafa, Perla Del Mar und Camacho Broadleaf haben echte Preise. Alles mit `placeholder: true` in `src/lib/catalog.ts` sind Platzhalter (Preise, Lager, Masse, einige Marken). Die Produktdaten aus dem PepperShop exportieren (CSV) und importieren, oder ein Headless-Commerce-Backend anbinden (z. B. Shopify Storefront API, Medusa, Saleor).
2. **Bestellungen:** `src/app/api/orders/route.ts` prüft und berechnet, speichert aber noch nichts. Hier Backend, Lagerreservation und Bestätigungsmail anbinden.
3. **Zahlungsanbieter:** TWINT, PostFinance (Card / E-Finance) und Karten (z. B. über Datatrans, Wallee oder Payrexx). Rechnung und Vorauskasse funktionieren ohne Anbieter.
4. **Newsletter:** `src/app/api/newsletter/route.ts` an den Versanddienst anbinden (Double-Opt-in).
5. **Kundenkonto:** `/konto` ist ein Platzhalter.
6. **Rechtstexte:** AGB, Datenschutz (revDSG), Impressum und Kontaktdaten in `src/lib/info.ts` ersetzen.
7. **Fotos:** Reportage-Fotos (Versandtisch St. Gallen, Trockenscheune Estelí) fehlen; Platzhalter mit Bildbeschreibung sind gesetzt.
8. **Chronik-Fakten** redaktionell prüfen (laut Handoff).
9. **Domain/Hosting:** z. B. Vercel oder ein Schweizer Node-Hosting, danach DNS von `havanasmokersclub.ch` umstellen. Weiterleitungen der alten PepperShop-URLs (`next.config.ts` → `redirects`) einrichten, damit Google-Rankings erhalten bleiben.

## Gestaltungsregeln (Kurzfassung)

- Schweizer Rechtschreibung: immer «ss», nie «ß».
- Radius 0, Linien 1.5 px Tinte bzw. 1 px Haarlinie, Schatten nur beim Primärknopf.
- Fehlt ein Foto, erscheint immer die Vitola-Silhouette aus Länge und Ringmass.
- Kein Name, Bild oder Zitat von Ernest Hemingway. Zitate nur gemeinfrei (José Martí).
