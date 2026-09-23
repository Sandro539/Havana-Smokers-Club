import type { OriginId } from "./types";

export interface Dispatch {
  slug: string;
  no: number;
  origin: OriginId;
  place: string;
  coord: string;
  title: string;
  subline: string;
  regions: { name: string; coord: string }[];
  photoCaption: string;
  stamp: string;
  author: string;
  readingTime: string;
  updated: string;
  dateline: string;
  body: (string | { quote: string })[];
  notes: string[];
  enclosed: string[];
}

export const dispatches: Dispatch[] = [
  {
    slug: "esteli",
    no: 42,
    origin: "nicaragua",
    place: "Estelí, Nicaragua",
    coord: "13°05′N 86°21′W",
    title: "Zigarren aus Nicaragua",
    subline: "Vulkanerde, drei Täler, eine junge Tradition. Ein Bericht in fünf Absätzen.",
    regions: [
      { name: "Estelí", coord: "13°05′N 86°21′W" },
      { name: "Jalapa", coord: "13°55′N 86°07′W" },
      { name: "Condega", coord: "13°22′N 86°24′W" },
      { name: "Ometepe", coord: "11°30′N 85°35′W" },
    ],
    photoCaption: "Foto · Trockenscheune bei Estelí, Blätter an Stangen, Seitenlicht durch die Latten",
    stamp: "ESTELÍ NIC",
    author: "Redaktion HSC",
    readingTime: "7 Min.",
    updated: "Sept. 2026",
    dateline: "ESTELÍ. —",
    body: [
      "Nicaragua raucht man anders. Die Böden im Norden sind vulkanisch, schwarz und schwer. Der Tabak, der darauf wächst, wird kräftig und süss zugleich.",
      "Estelí ist das Zentrum, mit Dutzenden Fabriken an staubigen Strassen. Jalapa, weiter nördlich und kühler, liefert die feineren Deckblätter. Condega liegt dazwischen und gibt die Würze.",
      { quote: "Kräftig ist nicht dasselbe wie laut." },
      "Viele Rollerfamilien kamen aus Kuba. Sie brachten Handwerk und Geduld mit und fanden einen Boden, der beides belohnt. Heute führen wir rund 35 Marken aus Nicaragua.",
    ],
    notes: [
      "Estelí liegt auf rund 850 m. Die Nächte sind kühl, das hilft dem Blatt.",
      "Zum Probieren: Nicarao Especial Gordo, ab CHF 11.90.",
    ],
    enclosed: ["nicarao-especial-gordo", "perla-del-mar-corojo", "rocky-patel-fifty-five"],
  },
];

export const dispatchBySlug = (slug: string) => dispatches.find((d) => d.slug === slug);
