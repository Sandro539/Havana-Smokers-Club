export interface InfoPage {
  kicker: string;
  title: string;
  draft?: boolean;
  sections: { heading?: string; body: string[] }[];
}

export const infoPages: Record<string, InfoPage> = {
  "ueber-uns": {
    kicker: "Über uns · St. Gallen",
    title: "Seit 2003. Aus St. Gallen.",
    sections: [
      {
        body: [
          "Wir reisen nicht jedes Jahr nach Estelí. Aber wir kennen die Leute, die es tun, und wir probieren jede neue Kiste, bevor sie in den Shop kommt. Was nicht überzeugt, schicken wir zurück.",
          "Unser Sortiment ist nach Herkunft geordnet. Jedes Land ist ein Bericht, jede Marke eine Notiz aus dem Feld.",
        ],
      },
    ],
  },
  kontakt: {
    kicker: "Beratung · Mo–Fr",
    title: "Kontakt",
    draft: true,
    sections: [
      {
        body: [
          "Havana Smokers Club, 9000 St. Gallen.",
          "Beratung Montag bis Freitag, am Telefon oder per E-Mail. Telefonnummer, E-Mail und Adresse hier eintragen.",
        ],
      },
    ],
  },
  versand: {
    kicker: "Versand & Zahlung",
    title: "Mit der Post, aus St. Gallen",
    sections: [
      {
        heading: "Versand",
        body: [
          "PostPac Priority: CHF 9.00, morgen bei Ihnen, wenn Sie bis 15 Uhr bestellen.",
          "PostPac Economy: CHF 7.00, 2–3 Werktage.",
          "Abholung in St. Gallen: kostenlos, nach Vereinbarung.",
          "Wir liefern in die Schweiz und nach Liechtenstein.",
        ],
      },
      {
        heading: "Zahlung",
        body: ["TWINT, PostFinance Card, PostFinance E-Finance, Visa, Mastercard, Rechnung (innert 30 Tagen) und Vorauskasse."],
      },
      {
        heading: "Alter",
        body: ["Tabakwaren verkaufen wir nur an Personen ab 18 Jahren. In der Kasse fragen wir deshalb das Geburtsdatum ab."],
      },
    ],
  },
  agb: {
    kicker: "Rechtliches",
    title: "Allgemeine Geschäftsbedingungen",
    draft: true,
    sections: [{ body: ["Die bestehenden AGB aus dem bisherigen Shop hier übernehmen."] }],
  },
  datenschutz: {
    kicker: "Rechtliches",
    title: "Datenschutzerklärung",
    draft: true,
    sections: [
      {
        body: [
          "Datenschutzerklärung nach revDSG hier einsetzen.",
          "Technischer Hinweis: Der Shop speichert Warenkorb und Altersbestätigung lokal im Browser (localStorage/sessionStorage). Schriften werden selbst gehostet, es werden keine Tracking-Cookies gesetzt.",
        ],
      },
    ],
  },
  impressum: {
    kicker: "Rechtliches",
    title: "Impressum",
    draft: true,
    sections: [{ body: ["Firmenname, Adresse, UID-Nummer und verantwortliche Person hier eintragen."] }],
  },
};
