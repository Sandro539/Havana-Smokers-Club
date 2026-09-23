import type { Metadata } from "next";
import { ThankYou } from "./ThankYou";

export const metadata: Metadata = { title: "Danke", robots: { index: false } };

export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ nr?: string }> }) {
  const { nr = "" } = await searchParams;
  return <ThankYou orderNo={nr} />;
}
