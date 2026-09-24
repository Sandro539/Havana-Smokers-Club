import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
  } catch {
    /* leer lassen */
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "Bitte eine gültige E-Mail-Adresse angeben." }, { status: 422 });
  }
  // TODO(Launch): an den Newsletter-Anbieter übergeben (Double-Opt-in).
  console.info("[newsletter] Anmeldung erhalten");
  return NextResponse.json({ ok: true, message: "Danke. Ihre Anmeldung ist eingegangen." });
}
