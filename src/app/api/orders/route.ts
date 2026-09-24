import { NextResponse } from "next/server";
import { validateOrder } from "@/lib/order";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "Ungültige Anfrage." } }, { status: 400 });
  }

  const result = validateOrder(body);
  if (!result.ok) return NextResponse.json(result, { status: 422 });

  // TODO(Launch): Bestellung im Commerce-Backend anlegen, Lager reservieren,
  // Zahlung beim gewählten Anbieter starten (TWINT/PostFinance/Karten-Acquirer)
  // und Bestätigungsmail versenden. Bis dahin wird nur protokolliert.
  console.info("[order]", result.order.orderNo, result.order.total, result.order.payment.id);

  return NextResponse.json(result, { status: 201 });
}
