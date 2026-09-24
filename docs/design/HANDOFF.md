# Handoff: HavanaSmokersClub.ch – "Die Depesche" (final concept)

## Overview
Redesign of the Swiss online cigar shop **HavanaSmokersClub.ch** (St. Gallen, since 2003), replacing an old PepperShop store with a custom-built shop. The approved direction is **"Die Depesche"**: the travelling correspondent. Off-white paper, typewriter type for facts next to a refined serif, field-note annotations, stamps, graph paper, and navigation **led by country of origin**. It also takes two elements from the explored concept C5 "El Lector": a **Chronik** (timeline of Cuban tobacco history) and a dark **José Martí quote band**.

Audience: Swiss adults aged 30–70, many loyal repeat buyers and some newcomers. **Mobile first**: most visitors are on phones.

## About the design files
The files in this bundle are **design references built in HTML**. They are prototypes that show the intended look and behaviour, **not production code to copy**. Your job is to **recreate these designs in the target codebase** using its established framework and patterns. If there is no codebase yet, pick a suitable stack. Recommended: Next.js (App Router) + TypeScript, CSS variables for the tokens below, CSS Modules or Tailwind configured with these tokens, and a headless commerce backend of the team's choice.

To view the references, open `Konzept-Final-Depesche.dc.html` in a browser (served over http, e.g. `npx serve .`). It shows every screen as desktop (1280 px) and mobile (390 px) frames side by side, top to bottom.
`Vitola.dc.html` is the reference for the scale-true cigar silhouette component.
You can ignore `support.js` and `_ds/*`: they are only the runtime for viewing the prototypes. `_ds/.../styles.css` holds the base design-system tokens (Cormorant Garamond / Lora, hairlines) that this concept extends.

## Fidelity
**High fidelity.** Colours, typography, spacing, component styling and copy are final. Recreate them pixel-close. Product data, prices beyond the real ones listed under "Content", and stock numbers are placeholders.

---

## Design tokens

### Colour
| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F2EEE4` | Page background |
| `--card` | `#FAF8F2` | Index cards, form panels, graph-paper fields, Chronik band |
| `--ink` | `#1E1E1C` | Text, 1.5 px structural rules, secondary buttons, dark band background |
| `--pencil` | `#55524A` | Secondary text, meta (7.1:1 on paper) |
| `--ribbon` | `#9E2B25` | Typewriter-ribbon red: primary actions, kickers, cart count, top edge of cards (6.6:1) |
| `--stamp` | `#2D4A6B` | Stamps, field notes, stock status, Chronik dots (8.4:1) |
| `--khaki` | `#8C7B55` | Decorative only (never text) |
| `--tobacco` | `#6B4A33` | Vitola silhouette fill |
| `--rule` | `rgba(30,30,28,.20)` | Hairlines |
| `--rule-dashed` | `rgba(30,30,28,.35–.45)` | Dashed separators (1 px dashed), Chronik line |
| `--grid-line` | `rgba(45,74,107,.07 / .18)` | Graph paper (1 mm / 1 cm lines) |
| `--ruled-line` | `rgba(45,74,107,.10)` | Index-card ruling, every 28 px |
| Dark band | bg `#1E1E1C`, text `#F2EEE4`, body `#E4DDCF`, label `#D9C9A3` | Martí quote band |

All text pairs meet WCAG AA. Never set body text in `--khaki`.

### Typography
Load these from Google Fonts:
- **Cormorant Garamond** 400/500/600 (+ italic 400): names, headlines, prices in titles, quotes. Display sizes use weight 500 with letter-spacing −0.015 to −0.02em. Line-height 0.9–1.05.
- **Lora** 400/600: running text. 16–18 px, line-height 1.65–1.75, `text-align: justify; hyphens: auto` for long copy.
- **Courier Prime** 400/700: all facts, meaning coordinates, dimensions, specs, prices in cards, kickers, labels and buttons. Kickers are 12–14 px uppercase, letter-spacing .06–.1em.

Scale used (desktop / mobile):
| Role | Desktop | Mobile |
|---|---|---|
| Hero headline (Cormorant 500) | 76 px | 44 px |
| Page title, e.g. brand (Cormorant 500) | 88–96 px | 48–60 px |
| Product title | 62 px | 44 px |
| Section title | 36–46 px | 26–32 px |
| Card title (Cormorant 600) | 28–30 px | 22–24 px |
| Body (Lora) | 17–18 px | 15–16 px |
| Kicker / meta (Courier) | 12–14 px | 11–12 px |
| Quote (Cormorant italic) | 56 px | 32 px |

### Spacing and shape
- Desktop page gutter: **56 px**. Mobile: **20 px**. Section vertical padding: 48–72 px desktop, 22–28 px mobile.
- Grid gaps: 22 px (card grids), 40–56 px (two-column layouts).
- **Radius 0 everywhere**, except device frames (not part of the product) and round stamps and dots.
- Structural rules: 1.5 px solid `--ink` (under the header, around form panels). Hairlines: 1 px `--rule`. Dashed: 1 px dashed.
- Shadows: only the primary button's offset shadow `3px 3px 0 var(--ribbon)`, and taped photos `0 2px 6px rgba(30,30,28,.18)`.

---

## Reusable components (build these first)

1. **OriginNav**: the primary navigation. There are 7 equal columns (Kuba, Nicaragua, Dom. Rep., Honduras, Costa Rica, Afrika, No Name) plus a trailing Humidore · Zubehör group.
   - Each cell is 10×12 px padded and holds the name (Cormorant 600, 19 px) over its coordinates (Courier 11 px, `--pencil`), e.g. "22°N 83°W".
   - The row has a 1.5 px `--ink` top and bottom border. Cells are separated by 1 px `--rule`.
   - Active cell: background `--card`, `box-shadow: inset 0 -3px 0 var(--ribbon)`.
   - On mobile it becomes a horizontally scrollable row showing name + latitude.
2. **ProductCard (index card)**:
   - Box: background `--card`, 1 px `--rule` border, **3 px `--ribbon` top border**, 16×18 px padding. Ruling: `repeating-linear-gradient(180deg, transparent 0 27px, rgba(45,74,107,.1) 27px 28px)`.
   - Content, top to bottom:
     - Courier 11 px meta row: `№ 0412` left, coordinates right.
     - Brand, Courier 12 px uppercase.
     - Name, Cormorant 600, 28 px.
     - Image area: a photo if one exists, else a **Vitola silhouette**.
     - Spec line, Courier 12 px: `ROBUSTO · 127 × 56` + `STÄRKE ■■■□□`.
     - Dashed divider, then price (Courier 700, 17 px) and stock (Courier 11 px, `--stamp`).
   - Photo treatment: white mat 5 px, 1 px outline, rotated −1.2°, like a paper-clipped enclosure ("Beilage").
   - Mobile variant: a horizontal list row with a 3 px `--ribbon` left border.
3. **Vitola silhouette** (`Vitola.dc.html`): the elegant fallback for missing photos and the to-scale size comparison.
   - Inputs: `length` (mm), `ring` (ring gauge), `scale` (px per mm), `dims` (bool), colours.
   - Diameter in mm = `ring × 25.4 / 64`. Width = `length × scale`, height = `diameter × scale`.
   - Shape: body with radius `h*.14` at the foot (left) and `h/2` at the head (right). A band at 78 % of the length, 7.5 % wide, in `--ribbon`. A foot shade strip, and a gradient overlay for volume.
   - With `dims`: a dimension line underneath with end ticks. Labels: "124 mm" left, "Ringmass 50 · Ø 19.8 mm" right (Courier).
   - Every silhouette on a page uses the **same scale**, so size comparisons are real.
4. **GraphPaper field**: `--card` background with four layered linear-gradients, 1 mm and 1 cm (`background-size: s s, s s, 10s 10s, 10s 10s` where s = px/mm). Caption: "1 Kästchen = 1 cm · massstabsgetreu".
5. **SpecBlock ("Frachtbrief · Steckbrief")**:
   - A bordered table: 1.5 px `--ink` border, header strip in Courier 700 13 px.
   - Rows are a 130 px key column (Courier, `--pencil`, uppercase) + value, with 1 px rules between.
   - Rows: Format, Länge, Ringmass, Herkunft, Deckblatt, Kiste, Stärke.
6. **StrengthScale**: five blocks 16×12 px, filled `--ink`, empty 1.5 px outline, followed by a label, e.g. "4/5 mittel-kräftig". In cards it is the text form `■■■■□`.
7. **PriceVariantSelector**:
   - Two tiles: "EINZELN / CHF 22.35 / Stk." and "KISTE À 25 / CHF 536.25".
   - Selected tile: 1.5 px `--ribbon` border, red text, `rgba(158,43,37,.06)` fill, 3 px offset shadow. Unselected: 1.5 px `--ink`.
   - Below it, a dashed-border box of quantity tiers: 1–4 Stück CHF 22.35 · ab 5 Stück CHF 21.90 · ab 10 Stück CHF 21.45.
   - The main price shows the current variant: Courier 700, 38 px, with "statt CHF 24.10" struck through.
8. **Button**:
   - Primary: 1.5 px `--ribbon` border, red text, Courier Prime 700 15–16 px, uppercase, letter-spacing .08em, padding 12–16 × 22 px, `box-shadow: 3px 3px 0 var(--ribbon)`. Hover: fill `rgba(158,43,37,.06)`. Active: shadow shrinks to `1px 1px 0`, translate(2px, 2px).
   - Secondary: 1.5 px `--ink` border, no shadow.
   - Link: Courier 14–15 px `--ribbon`, underline offset 4 px, prefixed "→".
   - Focus: `outline: 2px solid var(--stamp); outline-offset: 2px`.
9. **Stamp**:
   - Square: 2 px border + 1 px outline, offset 3 px. Round: 2 px border, 50 %.
   - Courier 700 uppercase, letter-spacing .12–.14em. Colour `--stamp` or `--ribbon`. Rotated −3° to −10°.
   - Used sparingly: "ST. GALLEN · SEIT 2003", "AN LAGER", "WENIGE AN LAGER", "VOLLJÄHRIG BESTÄTIGT", "18+".
10. **FieldNote**: Courier 12–13 px italic `--stamp`, prefixed "↳". Sits in margins, or with a 2 px left border on mobile.
11. **OriginMap**:
    - A graticule box on `--card` with a 1 px `--rule` border and grid lines every 5°.
    - Equirectangular projection: lon −90…−65, lat 5…25. `x = (lon+90)/25·W`, `y = (25−lat)/20·H`.
    - Dots: 10 px, `--ribbon`, with a 3 px halo at `rgba(158,43,37,.18)`. Labels: Cormorant 600 name + Courier coordinates.
    - Real coordinates: Vuelta Abajo 22.42/−83.69 · Cibao 19.45/−70.70 · Danlí 14.03/−86.58 (label left) · Estelí 13.09/−86.35 · San José 9.93/−84.08.
    - Africa (Kamerun, 4°N 11°E) is shown as a caption note.
12. **Chronik** (taken from C5):
    - A full-bleed band on `--card` with 1 px `--rule` top and bottom and padding 40×56. Kicker "CHRONIK · TABAK UND KUBA" in `--ribbon`, and a field note on the right.
    - 7 equal columns sit on a 1 px dashed line at y = 6 px.
    - Dots are 13 px circles, `--card` fill with a 1.5 px `--stamp` border. The **last (2003) dot is filled `--ribbon`**.
    - Each column: year in Courier 700 16 px (margin-top 12 px), text in Lora 14 px `--pencil`.
    - Mobile: a vertical list with a dashed left border and a 52 px year column.
    - Content:
      - 1492 – Die Spanier sehen auf Kuba zum ersten Mal Menschen rauchen.
      - 1845 – Jaime Partagás gründet seine Fabrik in Havanna.
      - 1865 – Der erste Lector liest in einer Fabrik in Havanna vor.
      - 1875 – Romeo y Julieta, benannt nach Shakespeare.
      - 1891 – José Martí spricht zu den Rollern in Key West und Tampa.
      - 1935 – Montecristo, benannt nach dem Roman von Dumas.
      - 2003 – Havana Smokers Club öffnet in St. Gallen.
    - *(Facts must be checked editorially before launch.)*
13. **QuoteBand** (taken from C5):
    - Dark `#1E1E1C` band, padding 72×56. Grid is 1fr / 1.2fr.
    - Left: kicker "DEPESCHE AUS KEY WEST UND TAMPA · 1891" (Courier 13 px, `#D9C9A3`) and a justified Lora 17 px paragraph (`#E4DDCF`).
    - Right, behind a 1 px `rgba(242,238,228,.35)` left rule: the quote «Gebildet zu sein ist der einzige Weg, frei zu sein.» (Cormorant italic, 56 px), attributed "JOSÉ MARTÍ · 1884". Martí's work is in the public domain.
14. **Checkout Feld panel**: 1.5 px `--ink` border, `--card` background. Header strip: "FELD 2 · ALTERSNACHWEIS" plus a red "PFLICHT" tag. Radio rows use Courier, `(●)` / `( )`. The selected row is red with a `rgba(158,43,37,.05)` fill.

---

## Screens
Each screen exists as desktop (1280 px) and mobile (390 px). The frame labels in the reference file are "F · 0X …".

### 01 Age gate
- Centered card, 620 px wide, `--card`. A dashed-rule meta row reads "DEPESCHE · ST. GALLEN" / "47°25′N 9°22′E".
- Headline "Ein kurzer Halt an der Grenze." (Cormorant 52 px). Line "Tabakwaren nur ab 18 Jahren. Sind Sie volljährig?" (Courier 18 px).
- Buttons: primary "JA, 18 ODER ÄLTER", secondary "NEIN". Checkbox "Auf diesem Gerät merken". A round stamp "18+ GEPRÜFT" overlaps the top-right corner.
- Behaviour: store consent (cookie/localStorage, e.g. 30 days if "merken" is ticked). "Nein" leads to an exit page. Checkout still asks for the birth date again.

### 02 Homepage
Sections top to bottom:
1. Header: logo "Havana Smokers Club" (Cormorant 600, 34 px) + tagline "Depeschen aus den Tabakregionen · St. Gallen, seit 2003". On the right: Suche · Konto · Korb [2].
2. **OriginNav**.
3. Hero, 2 columns.
   - Left: kicker "DEPESCHE NR. 41 · PINAR DEL RÍO · 22°25′N 83°41′W", headline "Tabak aus Vuelta Abajo. Mehr braucht es nicht.", one line of copy, buttons "NACH HERKUNFT REISEN" / "BERATUNG".
   - Right: **OriginMap** at 560×370.
4. Dashed divider. Featured cigar: field note | title block (Partagás Serie D No. 4, CHF 22.35 with CHF 24.10 struck through) | Vitola at 3 px/mm on graph paper.
5. "Frisch eingetroffen": 4 ProductCards.
6. **Chronik** band.
7. Origins strip: 7 columns, each with "DEPESCHE 0X", name, coordinates and a one-line description.
8. **QuoteBand**.
9. Story: photo + "Seit 2003. Aus St. Gallen." + text + field note.
10. Trust signals as 4 blue stamp boxes: SEIT 2003 · PERSÖNLICHE BERATUNG · SCHNELL MIT DER POST · KÄUFERSCHUTZ BIS CHF 4'000.
11. Newsletter panel: "Die Depesche. Einmal im Monat, per Post ins Postfach." + email + "ABONNIEREN".
12. Footer: address + payment methods.

Mobile runs in the same order, with a smaller map (350×231), a list of arrivals, then the Chronik (vertical), the quote band, trust stamps in 2×2, and the newsletter.

### 03 Category / brand page (Nicarao)
- OriginNav with Nicaragua active.
- Head section in 3 columns:
  - **Meta column** (Courier): NICARAGUA / N° 23 von 35 · ORT Estelí · coordinates · HÖHE · LINIEN · VITOLAS.
  - **Story column**, 680 px: "Nicarao" at 96 px, a Courier subline, 3 justified paragraphs.
  - **Margin column**: field notes plus a "3 MONATE GELAGERT" stamp.
- Below: a 230 px filter column + a 3-column ProductCard grid.
  - Filters (Courier): Herkunft, Marke, Format, Ringmass, Länge, Stärke, Lager, Preis range. Checkbox glyphs `[✕]` / `[ ]`.
  - Result bar: "6 EINTRÄGE · NICARAGUA / NICARAO / AN LAGER" · "SORTIERUNG: LÄNGE ↑".
- Mobile: short story, a filter chip row ("FILTER [3]", "LÄNGE ↑", "AN LAGER") that opens a bottom sheet, then list cards.

### 04 Product detail (most important)
Two columns: flexible left, 460 px right.
- **Left**: a GraphPaper field (520 px tall) with the Vitola at 4.4 px/mm, bottom-aligned. A taped product photo (250 px, rotated 2.5°, with a tape strip) sits top-right.
  - Below that, two ruled FieldNote cards: "FELDNOTIZ · DEGUSTATION" (by thirds) and "FELDNOTIZ · DAZU" (pairings).
  - Below those, "CHRONIK DER MARKE": a 3-point mini timeline (1845 · Calle Industria · Heute), last dot red.
- **Right**:
  - Kicker "PARTAGÁS · KUBA · 22°25′N 83°41′W", title "Serie D No. 4".
  - Price block, then PriceVariantSelector, then the tier box.
  - Stock stamp "AN LAGER" + "3 Kisten · 18 Stück · Versand morgen".
  - Quantity stepper + primary "IN DEN WARENKORB".
  - SpecBlock, then the trust line.
- **Bottom**: "Weitere Formate der Serie". Related vitolas as rows on a 10 mm ruled strip, all at the same scale (1.5 px/mm).
- Mobile order: graph paper with the Vitola at the top, then title, price, variants, tiers, stock, SpecBlock and field note. A **sticky bottom bar** holds the price + "IN DEN KORB".

### 05 Cart & checkout
- Header with a mono progress line: `[✓] KORB —— [2] ALTER —— [3] VERSAND —— [4] ZAHLUNG`.
- Left column, titled "Versandauftrag", holds three Feld panels:
  - **Feld 2 Altersnachweis**: day/month/year boxes + a mandatory checkbox. Once valid, a rotated "VOLLJÄHRIG BESTÄTIGT" stamp appears. The age must be ≥ 18 to continue.
  - **Feld 3 Versand mit der Schweizerischen Post**: PostPac Priority CHF 9.00 (next day if ordered by 15:00), PostPac Economy CHF 7.00 (2–3 days), Abholung St. Gallen CHF 0.00.
  - **Feld 4 Zahlungsart** (2-column radio grid): TWINT, PostFinance Card, PostFinance E-Finance, Visa, Mastercard, Rechnung (innert 30 Tagen), Vorauskasse (Versand nach Eingang).
- Right: a sticky summary "INHALT DER SENDUNG" (ruled card), with subtotal, postage, "TOTAL INKL. MWST" and primary "ZAHLUNGSPFLICHTIG BESTELLEN". Note: Käuferschutz bis CHF 4'000.
- Mobile: one step per screen. The confirmed age appears as a compact stamped row, and total + CTA stay fixed at the bottom.

### 06 Editorial ("Depesche aus Estelí – Zigarren aus Nicaragua")
- Kicker with dispatch number and coordinates, 88 px title, Courier subline. A regions box on the right lists Estelí, Jalapa, Condega and Ometepe with coordinates.
- Full-width photo in a 10 px `--card` mat, with a round red stamp "ESTELÍ NIC".
- Body in 3 columns: meta (Von / Lesezeit / Stand) | 640 px article | margin field notes.
  - The article opens with the dateline "ESTELÍ. — " in Courier 700 red.
  - Pull quote in Cormorant 36 px with a 3 px red left rule.
- Closes with "Beigelegt: drei Zigarren aus Estelí": 3 ProductCards.

---

## Interactions & behaviour
- **Variant selection** (single vs. box) updates the main price, the struck-through list price and the unit label. List price per box = 25 × CHF 24.10 = CHF 602.50.
- **Quantity tiers** apply automatically in the cart.
- **Payment and shipping radios**: single selection. The selected row turns red.
- **Filters**: multi-select. Selected filters show as removable chips. On mobile they open in a bottom sheet with a "N Vitolas zeigen" CTA.
- **Hover**: cards lift slightly (translateY −2px), and the top border stays red. Buttons tint (see above). Links darken to `#6F1D19`.
- **Missing photo**: always render the Vitola silhouette, computed from length and ring gauge. Never show an empty box. Products without dimensions (accessories, humidors) get a typographic card instead: capacity number in Cormorant + label.
- **Age consent** is checked on first visit. The birth date is required again at checkout (server-side validation too).
- **Motion**: minimal. 150–200 ms ease-out on hover and selection. No parallax.

## State
`ageConsent`, `cart` (items: productId, variant `single|box`, qty), `selectedVariant` per PDP, `filters` (origin[], brand[], format[], ringRange, lengthRange, strength[], priceRange, inStock), `sort`, `checkout.step`, `checkout.birthDate`, `checkout.shipping`, `checkout.payment`.

## Data model (suggested)
Product (= one vitola):
- Identity: `id, brand, line, name, origin (country), region, coordinates {lat, lon}`
- Size: `format` (Robusto, Churchill, Toro…), `lengthMm, ringGauge`
- Character: `wrapper, strength (1–5)`
- Pricing: `listPriceSingle, priceSingle, boxSize, priceBox, tiers[{minQty, price}]`
- Other: `stock {boxes, singles}`, `images[]` (may be empty), `tastingNotes, pairings[]`, `brandId`

Brand:
- `id, name, origin, region, storyRichText, chronicle[{label, text}]`

Formatting:
- Prices: `CHF 22.35`, thousands with an apostrophe `CHF 4'000`, "ab CHF …" for from-prices.
- Dimensions: `124 mm × 50`.

## Content & copy rules
- All UI copy is **German with Swiss spelling: always "ss", never "ß"** (e.g. Ringmass, Massstab, grösser, Strasse).
- Short, plain, declarative sentences ("iceberg" style). Warm, knowledgeable, never salesy.
- **Do not use Ernest Hemingway's name, likeness, signature or quotes.** Use only public-domain quotes (José Martí) or house-written lines.

Real products provided:
- Partagás Serie D No. 4: Robusto, 124 mm, RG 50, Kuba. CHF 22.35 (list CHF 24.10). Box of 25.
- Nicarao Especial Gordo: Robusto Extra, 127 mm, RG 56. From CHF 11.90. Box of 21.
- Nicarao Exclusivo Don Rafa: Churchill Extra, 178 mm, RG 54. From CHF 20.90.
- Perla Del Mar: Nicaragua. Corojo, Maduro or Connecticut (Shade) wrapper. From CHF 11.00.
- Camacho Broadleaf: Honduras. From CHF 8.80.

All other products, prices, box prices, tiers, stock, shipping fees and the Perla Del Mar / Camacho dimensions in the mocks are **placeholders**.

## Assets
- `uploads/334_gr_1.gif`: Partagás Serie D No. 4 box
- `uploads/4756_gr.gif`, `4756_gr_1.gif`: Perla Del Mar Shade (single, box)
- `uploads/4762_gr.gif`, `4762_gr_1.gif`: Perla Del Mar Corojo (single, box)
- `uploads/5401_gr.gif`: Rocky Patel Fifty-Five (single)

These are client-supplied product photos on white. They sit on white mats; use `mix-blend-mode: multiply` when placed on tinted paper. Single-cigar shots are cropped by rendering them at 150 % width, vertically centred. All other photos in the mocks are **captioned placeholders** describing the intended shot (reportage: fields, barns, shipping table). No smoke-filled imagery.
Icons: Lucide, 1.5 px stroke, for UI glyphs such as search, cart and account. Typographic glyphs (→ ↳ ✕ ■ □) come from Courier Prime.

## Files
- `Konzept-Final-Depesche.dc.html`: all screens (concept tile, 01–06, desktop and mobile)
- `Vitola.dc.html`: cigar silhouette component reference
- `uploads/`: product images
- `screenshots/`: full-length captures of every screen (desktop at 70 %, mobile at 100 %): `00-konzept.png` (style tile), `01-altersabfrage-{desktop,mobile}.png`, `02-startseite-…`, `03-marke-…`, `04-produkt-…`, `05-kasse-…`, `06-redaktion-…`. Orientation only; measure from the HTML reference and this README.
- `support.js`, `_ds/`: prototype viewer runtime and base tokens (reference only)

## Suggested build order
1. Tokens, fonts, Button, Stamp, FieldNote, rules.
2. Vitola silhouette, GraphPaper, StrengthScale, SpecBlock, PriceVariantSelector.
3. ProductCard (with and without photo), OriginNav, OriginMap, Chronik, QuoteBand.
4. Pages, mobile first: PDP, then Category/Brand, Homepage, Cart/Checkout, Age gate, Editorial.
5. Commerce integration, age-gate persistence, checkout validation, Swiss Post shipping and payment providers (TWINT, PostFinance, card acquirer, invoice).
