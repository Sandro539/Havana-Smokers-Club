"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { Vitola } from "@/components/Vitola";
import { brandById } from "@/lib/catalog";
import { chf } from "@/lib/format";
import type { OrderSummary } from "@/lib/order";
import { PAYMENTS, SHIPPING, isAdult, isValidDate } from "@/lib/pricing";
import type { PaymentId, ShippingId } from "@/lib/types";

type Step = 2 | 3 | 4;

export function CheckoutView() {
  const router = useRouter();
  const { rows, subtotal, lines, ready, clear } = useCart();
  const [step, setStep] = useState<Step>(2);
  const [birth, setBirth] = useState({ day: "", month: "", year: "" });
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [shipping, setShipping] = useState<ShippingId>("priority");
  const [payment, setPayment] = useState<PaymentId>("twint");
  const [address, setAddress] = useState({ name: "", street: "", zip: "", city: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const birthNum = { day: Number(birth.day), month: Number(birth.month), year: Number(birth.year) };
  const birthComplete = birth.day && birth.month && birth.year.length === 4;
  const adult = birthComplete && isAdult(birthNum);
  const ageOk = !!adult && ageConfirmed;
  const shipPrice = SHIPPING[shipping].price;
  const total = Math.round((subtotal + shipPrice) * 100) / 100;

  const addressErrors = useMemo(() => {
    const e: Record<string, string> = {};
    if (address.name.trim().length < 2) e.name = "Bitte Vor- und Nachnamen angeben.";
    if (!/^\S+@\S+\.\S+$/.test(address.email.trim())) e.email = "Bitte eine gültige E-Mail-Adresse angeben.";
    if (shipping !== "pickup") {
      if (address.street.trim().length < 3) e.street = "Bitte Strasse und Nummer angeben.";
      if (!/^\d{4}$/.test(address.zip.trim())) e.zip = "Bitte eine Schweizer Postleitzahl (4 Ziffern) angeben.";
      if (address.city.trim().length < 2) e.city = "Bitte den Ort angeben.";
    }
    return e;
  }, [address, shipping]);

  function ageError(): string | undefined {
    if (!birthComplete || !isValidDate(birthNum)) return "Bitte ein gültiges Geburtsdatum eintragen.";
    if (!adult) return "Tabakwaren verkaufen wir nur an Personen ab 18 Jahren.";
    if (!ageConfirmed) return "Bitte bestätigen Sie Ihre Volljährigkeit.";
  }

  function next() {
    if (step === 2) {
      const err = ageError();
      if (err) return setErrors({ birth: err });
      setErrors({});
      setStep(3);
    } else if (step === 3) {
      if (Object.keys(addressErrors).length) return setErrors(addressErrors);
      setErrors({});
      setStep(4);
    }
    window.scrollTo({ top: 0 });
  }

  async function submit() {
    const ageErr = ageError();
    const all = { ...(ageErr ? { birth: ageErr } : {}), ...addressErrors };
    if (Object.keys(all).length) {
      setErrors(all);
      setStep(ageErr ? 2 : 3);
      return;
    }
    setSubmitting(true);
    setErrors({});
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines, birth: birthNum, ageConfirmed, shipping, payment, address }),
      });
      const data = (await res.json()) as { ok: true; order: OrderSummary } | { ok: false; errors: Record<string, string> };
      if (!data.ok) {
        setErrors(data.errors);
        setSubmitting(false);
        return;
      }
      try {
        sessionStorage.setItem("hsc-last-order", JSON.stringify(data.order));
      } catch {
        /* Danke-Seite zeigt dann nur die Nummer */
      }
      clear();
      router.push(`/kasse/danke?nr=${encodeURIComponent(data.order.orderNo)}`);
    } catch {
      setErrors({ form: "Die Verbindung ist unterbrochen. Bitte nochmals versuchen." });
      setSubmitting(false);
    }
  }

  if (!ready) return <div className="wrap section" />;

  if (rows.length === 0) {
    return (
      <div className="wrap section">
        <h1 className="page-title">Versandauftrag</h1>
        <p style={{ marginTop: 16 }}>Der Korb ist leer.</p>
        <Link href="/" className="btn btn-primary">
          Zur Startseite
        </Link>
      </div>
    );
  }

  const errorList = Object.entries(errors);

  return (
    <div className="wrap section checkout" data-step={step}>
      <p className="meta hide-desktop checkout-progress">
        {step > 2 && (
          <button type="button" className="as-link" onClick={() => setStep((s) => (s - 1) as Step)}>
            ‹ {step === 3 ? "Alter" : "Versand"}
          </button>
        )}
        <span>
          [{step}] VON [4]
        </span>
      </p>
      <h1 className="page-title checkout-title">Versandauftrag</h1>

      {errorList.length > 0 && (
        <div className="error-box" role="alert">
          {errorList.map(([k, v]) => (
            <p key={k} className="error">
              ✕ {v}
            </p>
          ))}
        </div>
      )}

      <div className="checkout-grid">
        <div>
          {/* Mobile: bestätigtes Alter als Stempelzeile */}
          {step > 2 && ageOk && (
            <p className="age-row hide-desktop">
              [✓] 18+ · {birth.day.padStart(2, "0")}.{birth.month.padStart(2, "0")}.{birth.year}
            </p>
          )}

          <section className="feld step-2" aria-labelledby="f2">
            <h2 id="f2" className="feld-head">
              <span>Feld 2 · Altersnachweis</span>
              <span className="req">Pflicht</span>
            </h2>
            <div className="feld-body" style={{ position: "relative" }}>
              <p style={{ fontSize: 14, color: "var(--pencil)" }}>Tabakwaren nur an Personen ab 18 Jahren. Bitte Geburtsdatum eintragen.</p>
              <fieldset className="dob">
                <legend className="sr-only">Geburtsdatum</legend>
                <label>
                  <span className="field-label">Tag</span>
                  <input
                    className="input"
                    inputMode="numeric"
                    maxLength={2}
                    placeholder="TT"
                    value={birth.day}
                    onChange={(e) => setBirth({ ...birth, day: e.target.value.replace(/\D/g, "") })}
                    autoComplete="bday-day"
                  />
                </label>
                <label>
                  <span className="field-label">Monat</span>
                  <input
                    className="input"
                    inputMode="numeric"
                    maxLength={2}
                    placeholder="MM"
                    value={birth.month}
                    onChange={(e) => setBirth({ ...birth, month: e.target.value.replace(/\D/g, "") })}
                    autoComplete="bday-month"
                  />
                </label>
                <label>
                  <span className="field-label">Jahr</span>
                  <input
                    className="input"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="JJJJ"
                    value={birth.year}
                    onChange={(e) => setBirth({ ...birth, year: e.target.value.replace(/\D/g, "") })}
                    autoComplete="bday-year"
                  />
                </label>
              </fieldset>
              <label className="checkline" style={{ marginTop: 14 }}>
                <input type="checkbox" checked={ageConfirmed} onChange={(e) => setAgeConfirmed(e.target.checked)} />
                <span className="mark" aria-hidden="true">
                  {ageConfirmed ? "[✕]" : "[ ]"}
                </span>
                <span>Ich bestätige, dass ich mindestens 18 Jahre alt bin.</span>
              </label>
              {birthComplete && !adult && (
                <p className="error" style={{ marginTop: 10 }}>
                  {isValidDate(birthNum) ? "Tabakwaren verkaufen wir nur an Personen ab 18 Jahren." : "Dieses Datum gibt es nicht."}
                </p>
              )}
              {ageOk && (
                <span className="stamp age-stamp" aria-label="Volljährig bestätigt">
                  Volljährig
                  <br />
                  bestätigt
                </span>
              )}
            </div>
          </section>

          <section className="feld step-3" aria-labelledby="f3">
            <h2 id="f3" className="feld-head">
              <span>Feld 3 · Versand mit der Schweizerischen Post</span>
            </h2>
            <div role="radiogroup" aria-labelledby="f3">
              {(Object.keys(SHIPPING) as ShippingId[]).map((id) => {
                const s = SHIPPING[id];
                const on = shipping === id;
                return (
                  <label key={id} className={`radio-row${on ? " on" : ""}`}>
                    <input type="radio" name="shipping" value={id} checked={on} onChange={() => setShipping(id)} />
                    <span className="mark" aria-hidden="true">
                      {on ? "(●)" : "( )"}
                    </span>
                    <span className="rr-main">
                      {s.title}
                      <span className="rr-detail">{s.detail}</span>
                    </span>
                    <span className="rr-price">{chf(s.price)}</span>
                  </label>
                );
              })}
            </div>
            <div className="feld-body address">
              <p className="label" style={{ margin: "0 0 10px" }}>
                Empfänger
              </p>
              <div className="address-grid">
                <Field id="name" label="Vor- und Nachname" value={address.name} onChange={(v) => setAddress({ ...address, name: v })} error={errors.name} autoComplete="name" wide />
                {shipping !== "pickup" && (
                  <>
                    <Field id="street" label="Strasse und Nr." value={address.street} onChange={(v) => setAddress({ ...address, street: v })} error={errors.street} autoComplete="street-address" wide />
                    <Field id="zip" label="PLZ" value={address.zip} onChange={(v) => setAddress({ ...address, zip: v.replace(/\D/g, "").slice(0, 4) })} error={errors.zip} autoComplete="postal-code" inputMode="numeric" />
                    <Field id="city" label="Ort" value={address.city} onChange={(v) => setAddress({ ...address, city: v })} error={errors.city} autoComplete="address-level2" />
                  </>
                )}
                <Field id="email" label="E-Mail" type="email" value={address.email} onChange={(v) => setAddress({ ...address, email: v })} error={errors.email} autoComplete="email" />
                <Field id="phone" label="Telefon (freiwillig)" type="tel" value={address.phone} onChange={(v) => setAddress({ ...address, phone: v })} autoComplete="tel" />
              </div>
              <p className="meta" style={{ marginTop: 10 }}>
                Versand nur innerhalb der Schweiz und nach Liechtenstein.
              </p>
            </div>
          </section>

          <section className="feld step-4" aria-labelledby="f4">
            <h2 id="f4" className="feld-head">
              <span>Feld 4 · Zahlungsart</span>
            </h2>
            <div className="radio-grid" role="radiogroup" aria-labelledby="f4">
              {(Object.keys(PAYMENTS) as PaymentId[]).map((id) => {
                const p = PAYMENTS[id];
                const on = payment === id;
                return (
                  <label key={id} className={`radio-row${on ? " on" : ""}`}>
                    <input type="radio" name="payment" value={id} checked={on} onChange={() => setPayment(id)} />
                    <span className="mark" aria-hidden="true">
                      {on ? "(●)" : "( )"}
                    </span>
                    <span className="rr-main">
                      {p.title}
                      <span className="rr-detail">{p.detail}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="summary checkout-summary" aria-label="Inhalt der Sendung">
          <p className="summary-title">Inhalt der Sendung</p>
          <ul className="sum-lines">
            {rows.map((r) => (
              <li key={r.productId + r.variant}>
                {r.product.lengthMm && r.product.ringGauge && <Vitola length={r.product.lengthMm} ring={r.product.ringGauge} scale={0.7} />}
                <span className="sum-name">
                  {r.product.category === "zigarren" ? `${brandById(r.product.brandId)?.name} ` : ""}
                  {r.product.name}
                </span>
                <span className="sum-row">
                  <span>
                    {r.qty} × {r.variant === "box" ? `Kiste à ${r.product.boxSize}` : "Einzeln"}
                  </span>
                  <span>{chf(r.total)}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="sum-row">
            <span>ZWISCHENSUMME</span>
            <span>{chf(subtotal)}</span>
          </div>
          <div className="sum-row">
            <span>{SHIPPING[shipping].label.toUpperCase()}</span>
            <span>{chf(shipPrice)}</span>
          </div>
          <div className="sum-row sum-total">
            <span>TOTAL INKL. MWST</span>
            <span>{chf(total)}</span>
          </div>
          <button type="button" className="btn btn-primary btn-block hide-mobile" onClick={submit} disabled={submitting}>
            {submitting ? "Wird übermittelt …" : "Zahlungspflichtig bestellen"}
          </button>
          <p className="meta" style={{ marginTop: 12 }}>
            Käuferschutz bis CHF 4&apos;000. Mit der Bestellung akzeptieren Sie die <Link href="/info/agb">AGB</Link>.
          </p>
        </aside>
      </div>

      {/* Mobile: Total und Aktion fixiert */}
      <div className="sticky-buy hide-desktop">
        <span>
          <span className="meta" style={{ display: "block" }}>
            TOTAL · {rows.length} POS.
          </span>
          <span className="pdp-price-sm">{chf(total)}</span>
        </span>
        {step < 4 ? (
          <button type="button" className="btn btn-primary" onClick={next}>
            Weiter
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={submit} disabled={submitting}>
            {submitting ? "…" : "Bestellen"}
          </button>
        )}
      </div>
    </div>
  );
}

function Field(props: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text";
  wide?: boolean;
}) {
  return (
    <label className={props.wide ? "wide" : undefined}>
      <span className="field-label">{props.label}</span>
      <input
        id={props.id}
        className="input"
        type={props.type ?? "text"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        autoComplete={props.autoComplete}
        inputMode={props.inputMode}
        aria-invalid={!!props.error}
        aria-describedby={props.error ? `${props.id}-err` : undefined}
      />
      {props.error && (
        <span id={`${props.id}-err`} className="error">
          {props.error}
        </span>
      )}
    </label>
  );
}
