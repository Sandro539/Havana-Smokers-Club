import type { Brand, Origin, OriginId, Product } from "./types";

/*
 * Katalogdaten. Echte Angaben (laut Kunde): Partagás Serie D No. 4, Nicarao Especial Gordo,
 * Nicarao Exclusivo Don Rafa, Perla Del Mar, Camacho Broadleaf (Ab-Preise).
 * Alles mit `placeholder: true` ist Platzhalter und muss vor dem Launch ersetzt werden,
 * idealerweise durch den Import aus dem Commerce-Backend (siehe README).
 */

export const origins: Origin[] = [
  {
    id: "kuba",
    name: "Kuba",
    coord: "22°N 83°W",
    lat: "22°N",
    region: "Pinar del Río",
    regionCoord: "22°25′N 83°41′W",
    teaser: "Vuelta Abajo. Der Massstab, an dem sich alle messen.",
    intro:
      "Im Westen der Insel, in Pinar del Río, liegt Vuelta Abajo. Roter Sand, feuchte Winter, eine lange Tradition. Von hier kommen die Tabake, an denen sich alle anderen messen.",
  },
  {
    id: "nicaragua",
    name: "Nicaragua",
    coord: "13°N 86°W",
    lat: "13°N",
    region: "Estelí",
    regionCoord: "13°05′N 86°21′W",
    teaser: "Vulkanerde. Kräftig und süss.",
    intro:
      "Die Böden im Norden sind vulkanisch, schwarz und schwer. Estelí, Jalapa und Condega liefern Tabake, die kräftig und süss zugleich sind.",
  },
  {
    id: "dom-rep",
    name: "Dom. Rep.",
    coord: "19°N 70°W",
    lat: "19°N",
    region: "Cibao",
    regionCoord: "19°27′N 70°42′W",
    teaser: "Cibao-Tal. Elegant, oft mild.",
    intro:
      "Das Cibao-Tal rund um Santiago ist das grösste Zigarrenzentrum der Welt. Die Tabake sind elegant, oft mild, und sauber verarbeitet.",
  },
  {
    id: "honduras",
    name: "Honduras",
    coord: "14°N 86°W",
    lat: "14°N",
    region: "Danlí",
    regionCoord: "14°02′N 86°35′W",
    teaser: "Danlí. Erdig, würzig, kräftig.",
    intro:
      "Danlí und das Jamastrán-Tal liegen nahe der Grenze zu Nicaragua. Die Tabake sind erdig, würzig und oft kräftig.",
  },
  {
    id: "costa-rica",
    name: "Costa Rica",
    coord: "10°N 84°W",
    lat: "10°N",
    region: "Valle Central",
    regionCoord: "9°56′N 84°05′W",
    teaser: "Zentraltal. Klein, sorgfältig.",
    intro: "Wenige Manufakturen, kleine Mengen. Im Zentraltal wird sorgfältig und ohne Eile gerollt.",
  },
  {
    id: "afrika",
    name: "Afrika",
    coord: "4°N 11°E",
    lat: "4°N",
    region: "Kamerun",
    regionCoord: "4°N 11°E",
    teaser: "Kamerun. Berühmt für Deckblätter.",
    intro: "Aus Kamerun kommen dünne, gleichmässige Deckblätter mit feiner Würze. Gesucht bei Manufakturen auf der ganzen Welt.",
  },
  {
    id: "no-name",
    name: "No Name",
    coord: "Karibik",
    lat: "—",
    region: "Karibik",
    regionCoord: "Karibik",
    teaser: "Ohne Band. Gute Tabake, ehrlicher Preis.",
    intro: "Zigarren ohne Band. Gute Tabake aus bekannten Manufakturen, zu einem ehrlichen Preis.",
  },
];

export const brands: Brand[] = [
  {
    id: "partagas",
    name: "Partagás",
    origin: "kuba",
    region: "Pinar del Río",
    coord: "22°25′N 83°41′W",
    place: "Havanna",
    subline: "Seit 1845. Die kräftige Stimme aus Havanna.",
    story: [
      "Jaime Partagás gründete seine Fabrik 1845 in Havanna. Er kaufte eigene Felder in Vuelta Abajo und experimentierte mit der Fermentation.",
      "Die Serie D steht für den kräftigen, erdigen Stil des Hauses. Die No. 4 ist der Robusto, an dem wir alle anderen messen.",
    ],
    fieldNotes: ["Die Serie D ist die kräftige Linie des Hauses.", "Für den Einstieg: Serie D No. 6."],
    stamp: "SEIT 1845",
    chronicle: [
      { label: "1845", text: "Jaime Partagás gründet die Fabrik in Havanna." },
      { label: "Calle Industria", text: "Die Fabrik hinter dem Capitolio." },
      { label: "Heute", text: "Serie D, die kräftige Linie des Hauses." },
    ],
  },
  {
    id: "montecristo",
    name: "Montecristo",
    origin: "kuba",
    region: "Pinar del Río",
    coord: "22°25′N 83°41′W",
    place: "Havanna",
    subline: "Benannt nach dem Roman von Dumas.",
    story: [
      "1935 entstanden, benannt nach dem Grafen von Monte Christo. Der Roman wurde in den Fabriken gerne vorgelesen.",
      "Heute eine der meistgerauchten Marken aus Kuba: mittelkräftig, würzig, zuverlässig.",
    ],
    fieldNotes: ["Die No. 2 ist der bekannteste Torpedo der Welt."],
    chronicle: [
      { label: "1935", text: "Gründung, benannt nach dem Roman von Dumas." },
      { label: "Heute", text: "Mittelkräftig, würzig, zuverlässig." },
    ],
  },
  {
    id: "romeo-y-julieta",
    name: "Romeo y Julieta",
    origin: "kuba",
    region: "Pinar del Río",
    coord: "22°25′N 83°41′W",
    place: "Havanna",
    subline: "Benannt nach Shakespeare.",
    story: [
      "Seit 1875 benannt nach dem Liebespaar aus Verona. Die Churchills sind mild bis mittel, aromatisch und rund.",
    ],
    fieldNotes: ["Zugänglich, auch für den Anfang."],
    chronicle: [
      { label: "1875", text: "Romeo y Julieta, benannt nach Shakespeare." },
      { label: "Heute", text: "Mild bis mittel, aromatisch." },
    ],
  },
  {
    id: "nicarao",
    name: "Nicarao",
    origin: "nicaragua",
    region: "Estelí",
    coord: "13°05′N 86°21′W",
    place: "Estelí",
    altitude: "ca. 850 m",
    subline: "Benannt nach dem Kaziken, der dem Land seinen Namen gab.",
    story: [
      "Die Zigarren von Nicarao sind das Gegenteil von laut. Sie werden in Estelí gerollt, aus Tabaken, die drei Täler weit auseinander wachsen: Estelí, Jalapa, Condega. In der Kiste verbinden sie sich zu einem ruhigen Ganzen.",
      "Die Especial-Linie ist mild bis mittel, cremig, mit Noten von Nuss und hellem Holz. Die Exclusivo-Linie ist dunkler, öliger, süsser, mit längerem Nachhall. Wer Kuba kennt, findet hier Vertrautes, aber keinen Ersatz.",
      "Die Kisten ruhen bei uns mindestens drei Monate, bevor sie verkauft werden.",
    ],
    fieldNotes: [
      "Jalapa liegt nördlicher und kühler. Von dort kommen die feineren Deckblätter.",
      "Für den Einstieg: Especial Robusto. Für den Abend: Don Rafa.",
    ],
    stamp: "3 MONATE GELAGERT",
    chronicle: [
      { label: "Estelí", text: "Gerollt aus Tabaken dreier Täler." },
      { label: "Especial", text: "Mild bis mittel, cremig." },
      { label: "Exclusivo", text: "Dunkler, öliger, süsser." },
    ],
  },
  {
    id: "perla-del-mar",
    name: "Perla Del Mar",
    origin: "nicaragua",
    region: "Estelí",
    coord: "13°05′N 86°21′W",
    place: "Estelí",
    subline: "Ein Tabak, drei Deckblätter.",
    story: [
      "Perla Del Mar gibt es mit drei Deckblättern: Corojo, Maduro und Connecticut Shade. Die Einlage bleibt gleich, das Deckblatt macht den Unterschied.",
      "Ein guter Weg, um zu lernen, was ein Deckblatt kann.",
    ],
    fieldNotes: ["Nebeneinander rauchen: Shade, dann Corojo, dann Maduro."],
    chronicle: [
      { label: "Shade", text: "Hell, mild, cremig." },
      { label: "Corojo", text: "Würzig, etwas Pfeffer." },
      { label: "Maduro", text: "Dunkel, süss, Kakao." },
    ],
  },
  {
    id: "rocky-patel",
    name: "Rocky Patel",
    origin: "nicaragua",
    region: "Estelí",
    coord: "13°05′N 86°21′W",
    place: "Estelí",
    subline: "Grosse Formate, grosse Aromen.",
    story: ["Die Fifty-Five ist dicht gerollt, würzig und lang im Abgang."],
    fieldNotes: ["Nach einem schweren Essen."],
    chronicle: [{ label: "Heute", text: "Fifty-Five, würzig und dicht." }],
  },
  {
    id: "camacho",
    name: "Camacho",
    origin: "honduras",
    region: "Danlí",
    coord: "14°02′N 86°35′W",
    place: "Danlí",
    subline: "Kräftig und ohne Umwege.",
    story: [
      "Camacho rollt in Danlí. Die Broadleaf trägt ein dunkles Connecticut-Broadleaf-Deckblatt: erdig, süss, voll.",
    ],
    fieldNotes: ["Nicht für den Morgen."],
    chronicle: [{ label: "Danlí", text: "Kräftig, erdig, süss." }],
  },
  {
    id: "cibao-seleccion",
    name: "Cibao Selección",
    origin: "dom-rep",
    region: "Cibao",
    coord: "19°27′N 70°42′W",
    place: "Santiago de los Caballeros",
    subline: "Platzhalter-Marke · Dominikanische Republik.",
    story: ["Elegant und mild, mit Noten von Zeder und hellem Brot. (Platzhaltertext)"],
    fieldNotes: ["Für den Nachmittag."],
    chronicle: [{ label: "Cibao", text: "Elegant, oft mild." }],
  },
  {
    id: "valle-central",
    name: "Valle Central",
    origin: "costa-rica",
    region: "Valle Central",
    coord: "9°56′N 84°05′W",
    place: "San José",
    subline: "Platzhalter-Marke · Costa Rica.",
    story: ["Kleine Manufaktur, kleine Mengen. (Platzhaltertext)"],
    fieldNotes: ["Selten, aber lohnend."],
    chronicle: [{ label: "San José", text: "Klein, sorgfältig." }],
  },
  {
    id: "kamerun-capa",
    name: "Capa de Camerún",
    origin: "afrika",
    region: "Kamerun",
    coord: "4°N 11°E",
    place: "Kamerun",
    subline: "Platzhalter-Marke · Deckblatt aus Kamerun.",
    story: ["Einlage aus Nicaragua, Deckblatt aus Kamerun. Feine Würze. (Platzhaltertext)"],
    fieldNotes: ["Das Deckblatt ist dünn. Sanft anzünden."],
    chronicle: [{ label: "Kamerun", text: "Berühmt für Deckblätter." }],
  },
  {
    id: "no-name",
    name: "No Name",
    origin: "no-name",
    region: "Karibik",
    coord: "Karibik",
    place: "Karibik",
    subline: "Ohne Band. Gute Tabake, ehrlicher Preis.",
    story: ["Wir sagen nicht, woher sie kommen. Aber wir haben sie probiert."],
    fieldNotes: ["Für jeden Tag."],
    chronicle: [{ label: "Heute", text: "Gute Tabake, ehrlicher Preis." }],
  },
  {
    id: "hsc",
    name: "Havana Smokers Club",
    origin: "no-name",
    region: "St. Gallen",
    coord: "47°25′N 9°22′E",
    place: "St. Gallen",
    subline: "Humidore und Zubehör, ausgewählt in St. Gallen.",
    story: ["Was wir selbst benutzen."],
    fieldNotes: [],
    chronicle: [],
  },
];

type Draft = Omit<Product, "tiers" | "stock" | "images" | "category"> &
  Partial<Pick<Product, "tiers" | "stock" | "images" | "category">>;

const product = (d: Draft): Product => ({
  category: "zigarren",
  tiers: [],
  stock: { boxes: 2, singles: 12 },
  images: [],
  ...d,
});

export const products: Product[] = [
  // ——— Kuba ———
  product({
    id: "partagas-serie-d-no-4",
    no: 334,
    slug: "partagas-serie-d-no-4",
    brandId: "partagas",
    line: "Serie D",
    name: "Serie D No. 4",
    origin: "kuba",
    region: "Vuelta Abajo",
    coord: "22°25′N 83°41′W",
    format: "Robusto",
    lengthMm: 124,
    ringGauge: 50,
    wrapper: "Kuba, Colorado",
    strength: 4,
    listPriceSingle: 24.1,
    priceSingle: 22.35,
    boxSize: 25,
    priceBox: 536.25,
    tiers: [
      { minQty: 5, price: 21.9 },
      { minQty: 10, price: 21.45 },
    ],
    stock: { boxes: 3, singles: 18 },
    images: [{ src: "/images/products/334_gr_1.gif", kind: "box", alt: "Partagás Serie D No. 4, offene Kiste à 25" }],
    tastingNotes: ["Kalt: Heu, Zeder.", "1/3 — Erde, Leder, leise Süsse.", "2/3 — Kakao, Kaffee.", "3/3 — Pfeffer, trocken, lang.", "Dauer: ca. 45 Min."],
    pairings: ["Dunkler Rum, 8 Jahre, pur", "Espresso, nach dem Essen", "Oloroso, leicht gekühlt"],
    fieldNote: "Der Robusto, an dem wir alle anderen messen. Seit Jahren ununterbrochen im Sortiment.",
  }),
  product({
    id: "partagas-serie-d-no-6", no: 335, slug: "partagas-serie-d-no-6", brandId: "partagas", line: "Serie D", name: "Serie D No. 6",
    origin: "kuba", region: "Vuelta Abajo", coord: "22°25′N 83°41′W", format: "Petit Robusto", lengthMm: 90, ringGauge: 50,
    wrapper: "Kuba, Colorado", strength: 4, priceSingle: 14.2, boxSize: 20, priceBox: 272, placeholder: true,
  }),
  product({
    id: "partagas-serie-d-no-5", no: 336, slug: "partagas-serie-d-no-5", brandId: "partagas", line: "Serie D", name: "Serie D No. 5",
    origin: "kuba", region: "Vuelta Abajo", coord: "22°25′N 83°41′W", format: "Petit Robusto", lengthMm: 110, ringGauge: 50,
    wrapper: "Kuba, Colorado", strength: 4, priceSingle: 17.8, boxSize: 25, priceBox: 427.5, placeholder: true,
  }),
  product({
    id: "partagas-serie-e-no-2", no: 337, slug: "partagas-serie-e-no-2", brandId: "partagas", line: "Serie D", name: "Serie E No. 2",
    origin: "kuba", region: "Vuelta Abajo", coord: "22°25′N 83°41′W", format: "Duke", lengthMm: 140, ringGauge: 54,
    wrapper: "Kuba, Colorado", strength: 4, priceSingle: 25.6, boxSize: 25, priceBox: 615, placeholder: true,
  }),
  product({
    id: "partagas-serie-p-no-2", no: 338, slug: "partagas-serie-p-no-2", brandId: "partagas", line: "Serie D", name: "Serie P No. 2",
    origin: "kuba", region: "Vuelta Abajo", coord: "22°25′N 83°41′W", format: "Pirámide", lengthMm: 156, ringGauge: 52,
    wrapper: "Kuba, Colorado", strength: 4, priceSingle: 24.9, boxSize: 25, priceBox: 597.5, stock: { boxes: 0, singles: 4 }, placeholder: true,
  }),
  product({
    id: "montecristo-no-2", no: 350, slug: "montecristo-no-2", brandId: "montecristo", name: "No. 2",
    origin: "kuba", region: "Vuelta Abajo", coord: "22°25′N 83°41′W", format: "Pirámide", lengthMm: 156, ringGauge: 52,
    wrapper: "Kuba, Colorado", strength: 3, priceSingle: 26.5, boxSize: 25, priceBox: 640, placeholder: true,
  }),
  product({
    id: "romeo-y-julieta-short-churchill", no: 360, slug: "romeo-y-julieta-short-churchill", brandId: "romeo-y-julieta", name: "Short Churchill",
    origin: "kuba", region: "Vuelta Abajo", coord: "22°25′N 83°41′W", format: "Robusto", lengthMm: 124, ringGauge: 50,
    wrapper: "Kuba, Colorado", strength: 2, priceSingle: 18.9, boxSize: 25, priceBox: 455, placeholder: true,
  }),

  // ——— Nicaragua ———
  product({
    id: "nicarao-especial-petit-corona", no: 405, slug: "nicarao-especial-petit-corona", brandId: "nicarao", line: "Especial", name: "Petit Corona",
    origin: "nicaragua", region: "Estelí", coord: "13°05′N 86°21′W", format: "Petit Corona", lengthMm: 129, ringGauge: 42,
    wrapper: "Nicaragua, Habano", strength: 2, priceSingle: 8.6, boxSize: 21, priceBox: 172, placeholder: true,
  }),
  product({
    id: "nicarao-especial-robusto", no: 406, slug: "nicarao-especial-robusto", brandId: "nicarao", line: "Especial", name: "Robusto",
    origin: "nicaragua", region: "Estelí", coord: "13°05′N 86°21′W", format: "Robusto", lengthMm: 124, ringGauge: 50,
    wrapper: "Nicaragua, Habano", strength: 2, priceSingle: 9.9, boxSize: 21, priceBox: 198, placeholder: true,
  }),
  product({
    id: "nicarao-especial-gordo", no: 401, slug: "nicarao-especial-gordo", brandId: "nicarao", line: "Especial", name: "Especial Gordo",
    origin: "nicaragua", region: "Estelí", coord: "13°05′N 86°21′W", format: "Robusto Extra", lengthMm: 127, ringGauge: 56,
    wrapper: "Nicaragua, Habano", strength: 3, priceSingle: 11.9, boxSize: 21, priceBox: 238,
    tiers: [{ minQty: 5, price: 11.5 }], isNew: true,
    tastingNotes: ["Kalt: Heu, Nuss.", "1/3 — Crème, helles Holz.", "2/3 — Nuss, etwas Kaffee.", "3/3 — Würze, weich.", "Dauer: ca. 50 Min."],
    pairings: ["Espresso", "Rum, jung und hell"],
    fieldNote: "Zum Probieren aus Estelí. Cremig, ruhig, mit Nuss.",
  }),
  product({
    id: "nicarao-especial-toro", no: 408, slug: "nicarao-especial-toro", brandId: "nicarao", line: "Especial", name: "Toro",
    origin: "nicaragua", region: "Estelí", coord: "13°05′N 86°21′W", format: "Toro", lengthMm: 152, ringGauge: 52,
    wrapper: "Nicaragua, Habano", strength: 3, priceSingle: 12.4, boxSize: 21, priceBox: 248, placeholder: true,
  }),
  product({
    id: "nicarao-exclusivo-torpedo", no: 409, slug: "nicarao-exclusivo-torpedo", brandId: "nicarao", line: "Exclusivo", name: "Torpedo",
    origin: "nicaragua", region: "Estelí", coord: "13°05′N 86°21′W", format: "Torpedo", lengthMm: 156, ringGauge: 52,
    wrapper: "Nicaragua, Oscuro", strength: 4, priceSingle: 18.5, boxSize: 21, priceBox: 370, stock: { boxes: 0, singles: 5 }, placeholder: true,
  }),
  product({
    id: "nicarao-exclusivo-don-rafa", no: 410, slug: "nicarao-exclusivo-don-rafa", brandId: "nicarao", line: "Exclusivo", name: "Don Rafa",
    origin: "nicaragua", region: "Estelí", coord: "13°05′N 86°21′W", format: "Churchill Extra", lengthMm: 178, ringGauge: 54,
    wrapper: "Nicaragua, Oscuro", strength: 4, priceSingle: 20.9, boxSize: 21, priceBox: 420,
    fieldNote: "Für den Abend. Dunkel, ölig, langer Nachhall.",
  }),
  product({
    id: "perla-del-mar-corojo", no: 402, slug: "perla-del-mar-corojo", brandId: "perla-del-mar", name: "Corojo",
    origin: "nicaragua", region: "Estelí", coord: "13°05′N 86°21′W", format: "Robusto", lengthMm: 127, ringGauge: 50,
    wrapper: "Corojo", strength: 3, priceSingle: 11, boxSize: 25, priceBox: 260, isNew: true,
    images: [
      { src: "/images/products/4762_gr.gif", kind: "single", alt: "Perla Del Mar Corojo, einzelne Zigarre" },
      { src: "/images/products/4762_gr_1.gif", kind: "box", alt: "Perla Del Mar Corojo, Kiste" },
    ],
  }),
  product({
    id: "perla-del-mar-shade", no: 403, slug: "perla-del-mar-shade", brandId: "perla-del-mar", name: "Connecticut Shade",
    origin: "nicaragua", region: "Estelí", coord: "13°05′N 86°21′W", format: "Robusto", lengthMm: 127, ringGauge: 50,
    wrapper: "Connecticut Shade", strength: 2, priceSingle: 11, boxSize: 25, priceBox: 260,
    images: [
      { src: "/images/products/4756_gr.gif", kind: "single", alt: "Perla Del Mar Shade, einzelne Zigarre" },
      { src: "/images/products/4756_gr_1.gif", kind: "box", alt: "Perla Del Mar Shade, Kiste" },
    ],
  }),
  product({
    id: "perla-del-mar-maduro", no: 407, slug: "perla-del-mar-maduro", brandId: "perla-del-mar", name: "Maduro",
    origin: "nicaragua", region: "Estelí", coord: "13°05′N 86°21′W", format: "Robusto", lengthMm: 127, ringGauge: 50,
    wrapper: "Maduro", strength: 3, priceSingle: 11, boxSize: 25, priceBox: 260,
  }),
  product({
    id: "rocky-patel-fifty-five", no: 404, slug: "rocky-patel-fifty-five", brandId: "rocky-patel", name: "Fifty-Five",
    origin: "nicaragua", region: "Estelí", coord: "13°05′N 86°21′W", format: "Robusto", lengthMm: 140, ringGauge: 55,
    wrapper: "Nicaragua, Habano", strength: 4, priceSingle: 14.5, boxSize: 20, priceBox: 275, isNew: true, placeholder: true,
    images: [{ src: "/images/products/5401_gr.gif", kind: "single", alt: "Rocky Patel Fifty-Five, einzelne Zigarre" }],
  }),

  // ——— Honduras ———
  product({
    id: "camacho-broadleaf", no: 420, slug: "camacho-broadleaf", brandId: "camacho", name: "Broadleaf",
    origin: "honduras", region: "Danlí", coord: "14°02′N 86°35′W", format: "Robusto", lengthMm: 127, ringGauge: 50,
    wrapper: "Connecticut Broadleaf", strength: 5, priceSingle: 8.8, boxSize: 20, priceBox: 168, stock: { boxes: 0, singles: 6 }, isNew: true,
  }),

  // ——— Dom. Rep. ———
  product({
    id: "cibao-seleccion-corona", no: 430, slug: "cibao-seleccion-corona", brandId: "cibao-seleccion", name: "Corona",
    origin: "dom-rep", region: "Cibao", coord: "19°27′N 70°42′W", format: "Corona", lengthMm: 142, ringGauge: 42,
    wrapper: "Ecuador, Connecticut", strength: 1, priceSingle: 9.5, boxSize: 25, priceBox: 225, placeholder: true,
  }),
  product({
    id: "cibao-seleccion-robusto", no: 431, slug: "cibao-seleccion-robusto", brandId: "cibao-seleccion", name: "Robusto",
    origin: "dom-rep", region: "Cibao", coord: "19°27′N 70°42′W", format: "Robusto", lengthMm: 127, ringGauge: 50,
    wrapper: "Ecuador, Connecticut", strength: 2, priceSingle: 10.8, boxSize: 25, priceBox: 255, placeholder: true,
  }),

  // ——— Costa Rica ———
  product({
    id: "valle-central-toro", no: 440, slug: "valle-central-toro", brandId: "valle-central", name: "Toro",
    origin: "costa-rica", region: "Valle Central", coord: "9°56′N 84°05′W", format: "Toro", lengthMm: 152, ringGauge: 52,
    wrapper: "Costa Rica, Habano", strength: 3, priceSingle: 13.2, boxSize: 20, priceBox: 250, placeholder: true,
  }),

  // ——— Afrika ———
  product({
    id: "capa-de-camerun-corona-gorda", no: 450, slug: "capa-de-camerun-corona-gorda", brandId: "kamerun-capa", name: "Corona Gorda",
    origin: "afrika", region: "Kamerun", coord: "4°N 11°E", format: "Corona Gorda", lengthMm: 143, ringGauge: 46,
    wrapper: "Kamerun", strength: 3, priceSingle: 12.9, boxSize: 20, priceBox: 245, placeholder: true,
  }),

  // ——— No Name ———
  product({
    id: "no-name-robusto", no: 460, slug: "no-name-robusto", brandId: "no-name", name: "Robusto Nicaragua",
    origin: "no-name", region: "Karibik", coord: "Karibik", format: "Robusto", lengthMm: 127, ringGauge: 50,
    wrapper: "Nicaragua", strength: 3, priceSingle: 5.9, boxSize: 25, priceBox: 135, stock: { boxes: 6, singles: 40 }, placeholder: true,
  }),
  product({
    id: "no-name-churchill", no: 461, slug: "no-name-churchill", brandId: "no-name", name: "Churchill Dom. Rep.",
    origin: "no-name", region: "Karibik", coord: "Karibik", format: "Churchill", lengthMm: 178, ringGauge: 48,
    wrapper: "Ecuador", strength: 2, priceSingle: 6.9, boxSize: 25, priceBox: 158, placeholder: true,
  }),

  // ——— Humidore ———
  product({
    id: "humidor-zeder-50", no: 900, slug: "humidor-zeder-50", category: "humidore", brandId: "hsc", name: "Humidor Zeder",
    priceSingle: 189, capacity: { value: "50", label: "Zigarren" }, stock: { boxes: 0, singles: 3 }, placeholder: true,
    description: "Spanische Zeder, Hygrometer und Befeuchter. Für den Anfang und für Jahre.",
  }),
  product({
    id: "humidor-kabinett-120", no: 901, slug: "humidor-kabinett-120", category: "humidore", brandId: "hsc", name: "Humidor Kabinett",
    priceSingle: 540, capacity: { value: "120", label: "Zigarren" }, stock: { boxes: 0, singles: 1 }, placeholder: true,
    description: "Zwei Schubladen, Glasdeckel, digitales Hygrometer.",
  }),
  product({
    id: "reise-etui-5", no: 902, slug: "reise-etui-5", category: "humidore", brandId: "hsc", name: "Reise-Etui",
    priceSingle: 64, capacity: { value: "5", label: "Zigarren" }, placeholder: true,
    description: "Dicht verschliessbar, für unterwegs.",
  }),

  // ——— Zubehör ———
  product({
    id: "cutter-doppelklinge", no: 950, slug: "cutter-doppelklinge", category: "zubehoer", brandId: "hsc", name: "Cutter Doppelklinge",
    priceSingle: 39, capacity: { value: "2", label: "Klingen" }, stock: { boxes: 0, singles: 14 }, placeholder: true,
    description: "Zwei Klingen aus Stahl, bis Ringmass 60.",
  }),
  product({
    id: "jet-feuerzeug", no: 951, slug: "jet-feuerzeug", category: "zubehoer", brandId: "hsc", name: "Jet-Feuerzeug",
    priceSingle: 49, capacity: { value: "3", label: "Flammen" }, placeholder: true,
    description: "Dreifache Jetflamme, windfest, nachfüllbar.",
  }),
  product({
    id: "zedernholz-spaene", no: 952, slug: "zedernholz-spaene", category: "zubehoer", brandId: "hsc", name: "Zedernspäne",
    priceSingle: 9.5, capacity: { value: "40", label: "Späne" }, placeholder: true,
    description: "Zum Anzünden ohne Beigeschmack.",
  }),
];

export const originById = (id: string) => origins.find((o) => o.id === id);
export const brandById = (id: string) => brands.find((b) => b.id === id);
export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const productById = (id: string) => products.find((p) => p.id === id);

export const cigars = () => products.filter((p) => p.category === "zigarren");
export const productsByOrigin = (origin: OriginId) => cigars().filter((p) => p.origin === origin);
export const productsByBrand = (brandId: string) => products.filter((p) => p.brandId === brandId);
export const brandsByOrigin = (origin: OriginId) =>
  brands.filter((b) => b.origin === origin && productsByBrand(b.id).some((p) => p.category === "zigarren"));
export const newArrivals = () => products.filter((p) => p.isNew).sort((a, b) => a.no - b.no).slice(0, 4);

export function stockStatus(p: Product): { label: string; tone: "ok" | "low" | "out" } {
  const total = p.stock.boxes * (p.boxSize ?? 1) + p.stock.singles;
  if (total === 0) return { label: "Ausverkauft", tone: "out" };
  if (p.stock.boxes === 0 && p.stock.singles <= 6) return { label: "Wenige an Lager", tone: "low" };
  return { label: "An Lager", tone: "ok" };
}

/** Karibik-Karte: echte Koordinaten der Anbauregionen */
export const mapPoints: { name: string; coord: string; lat: number; lon: number; side: "l" | "r"; origin: OriginId }[] = [
  { name: "Kuba", coord: "22°25′N 83°41′W", lat: 22.42, lon: -83.69, side: "r", origin: "kuba" },
  { name: "Dom. Rep.", coord: "19°27′N 70°42′W", lat: 19.45, lon: -70.7, side: "l", origin: "dom-rep" },
  { name: "Honduras", coord: "14°02′N 86°35′W", lat: 14.03, lon: -86.58, side: "l", origin: "honduras" },
  { name: "Nicaragua", coord: "13°05′N 86°21′W", lat: 13.09, lon: -86.35, side: "r", origin: "nicaragua" },
  { name: "Costa Rica", coord: "9°56′N 84°05′W", lat: 9.93, lon: -84.08, side: "r", origin: "costa-rica" },
];

export const chronicle: { year: string; text: string }[] = [
  { year: "1492", text: "Die Spanier sehen auf Kuba zum ersten Mal Menschen rauchen." },
  { year: "1845", text: "Jaime Partagás gründet seine Fabrik in Havanna." },
  { year: "1865", text: "Der erste Lector liest in einer Fabrik in Havanna vor." },
  { year: "1875", text: "Romeo y Julieta, benannt nach Shakespeare." },
  { year: "1891", text: "José Martí spricht zu den Rollern in Key West und Tampa." },
  { year: "1935", text: "Montecristo, benannt nach dem Roman von Dumas." },
  { year: "2003", text: "Havana Smokers Club öffnet in St. Gallen." },
];
