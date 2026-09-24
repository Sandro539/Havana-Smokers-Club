"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setState(res.ok ? "ok" : "error");
      setMessage(data.message);
    } catch {
      setState("error");
      setMessage("Das hat nicht geklappt. Bitte später nochmals versuchen.");
    }
  }

  return (
    <section className="newsletter" aria-labelledby="nl-title">
      <div>
        <p className="kicker">Abonnement</p>
        <h2 id="nl-title" className="newsletter-title">
          Die Depesche. Einmal im Monat, per Post ins Postfach.
        </h2>
      </div>
      {state === "ok" ? (
        <p className="fieldnote" role="status" style={{ alignSelf: "center" }}>
          {message}
        </p>
      ) : (
        <form className="newsletter-form" onSubmit={submit}>
          <label htmlFor="nl-email" className="sr-only">
            E-Mail-Adresse
          </label>
          <input id="nl-email" name="email" type="email" required placeholder="ihre@adresse.ch" className="nl-input" autoComplete="email" />
          <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
            Abonnieren
          </button>
          {state === "error" && (
            <p className="error" role="alert" style={{ flexBasis: "100%", margin: 0 }}>
              {message}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
