import type { Metadata } from "next";
import { SearchView } from "./SearchView";

export const metadata: Metadata = { title: "Suche", description: "Alle Zigarren, Humidore und Zubehör durchsuchen." };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  return <SearchView initialQuery={q} />;
}
