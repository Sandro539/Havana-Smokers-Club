export type OriginId =
  | "kuba"
  | "nicaragua"
  | "dom-rep"
  | "honduras"
  | "costa-rica"
  | "afrika"
  | "no-name";

export type CategoryId = "zigarren" | "humidore" | "zubehoer";

export interface Origin {
  id: OriginId;
  name: string;
  /** Kurzkoordinaten für die Navigation, z. B. "22°N 83°W" */
  coord: string;
  /** Nur Breitengrad, für die mobile Navigation */
  lat: string;
  region: string;
  /** Genaue Koordinaten der Hauptregion, z. B. "22°25′N 83°41′W" */
  regionCoord: string;
  teaser: string;
  intro: string;
}

export interface PriceTier {
  minQty: number;
  price: number;
}

export interface Product {
  id: string;
  /** Laufnummer der Karteikarte, z. B. 412 → "№ 0412" */
  no: number;
  slug: string;
  category: CategoryId;
  brandId: string;
  line?: string;
  name: string;
  origin?: OriginId;
  region?: string;
  coord?: string;
  format?: string;
  lengthMm?: number;
  ringGauge?: number;
  wrapper?: string;
  /** 1 (mild) bis 5 (kräftig) */
  strength?: number;
  listPriceSingle?: number;
  priceSingle: number;
  boxSize?: number;
  priceBox?: number;
  tiers: PriceTier[];
  stock: { boxes: number; singles: number };
  images: { src: string; kind: "single" | "box"; alt: string }[];
  tastingNotes?: string[];
  pairings?: string[];
  fieldNote?: string;
  /** Für Humidore/Zubehör ohne Masse: typografische Karte */
  capacity?: { value: string; label: string };
  description?: string;
  isNew?: boolean;
  /** Platzhalterdaten, vor dem Launch redaktionell prüfen */
  placeholder?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  origin: OriginId;
  region: string;
  coord: string;
  place: string;
  altitude?: string;
  subline: string;
  story: string[];
  fieldNotes: string[];
  stamp?: string;
  chronicle: { label: string; text: string }[];
}

export type Variant = "single" | "box";

export interface CartLine {
  productId: string;
  variant: Variant;
  qty: number;
}

export type ShippingId = "priority" | "economy" | "pickup";
export type PaymentId =
  | "twint"
  | "postfinance-card"
  | "postfinance-efinance"
  | "visa"
  | "mastercard"
  | "invoice"
  | "prepayment";
