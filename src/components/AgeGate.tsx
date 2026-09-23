"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const KEY = "hsc-age-consent";
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
/** Seiten, die ohne Bestätigung erreichbar bleiben (Ausgang, Rechtliches). */
const OPEN_PATHS = ["/ausgang", "/info/impressum", "/info/datenschutz", "/info/agb"];

function hasConsent(): boolean {
  try {
    if (sessionStorage.getItem(KEY) === "1") return true;
    const until = Number(localStorage.getItem(KEY));
    return Number.isFinite(until) && until > Date.now();
  } catch {
    return false;
  }
}

export function AgeGate() {
  const path = usePathname() ?? "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [remember, setRemember] = useState(false);
  const yesRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(!hasConsent() && !OPEN_PATHS.includes(path));
  }, [path]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    yesRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const confirm = () => {
    try {
      sessionStorage.setItem(KEY, "1");
      if (remember) localStorage.setItem(KEY, String(Date.now() + THIRTY_DAYS));
    } catch {
      /* ohne Speicher gilt die Bestätigung nur für diese Ansicht */
    }
    setOpen(false);
  };

  const decline = () => {
    setOpen(false);
    router.push("/ausgang");
  };

  return (
    <div className="agegate" role="dialog" aria-modal="true" aria-labelledby="agegate-title">
      <div className="agegate-card">
        <span className="stamp stamp-round agegate-stamp" aria-hidden="true">
          18+
          <br />
          GEPRÜFT
        </span>
        <div className="agegate-meta">
          <span>DEPESCHE · ST. GALLEN</span>
          <span>47°25′N 9°22′E</span>
        </div>
        <h1 id="agegate-title" className="agegate-title">
          Ein kurzer Halt an der Grenze.
        </h1>
        <p className="agegate-q">Tabakwaren nur ab 18 Jahren. Sind Sie volljährig?</p>
        <div className="agegate-btns">
          <button ref={yesRef} type="button" className="btn btn-primary" onClick={confirm}>
            Ja, 18 oder älter
          </button>
          <button type="button" className="btn" onClick={decline}>
            Nein
          </button>
        </div>
        <label className="agegate-remember">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          Auf diesem Gerät merken (30 Tage)
        </label>
      </div>
    </div>
  );
}
