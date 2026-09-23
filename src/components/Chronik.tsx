interface Entry {
  year: string;
  text: string;
}

export function Chronik({ entries, kicker, note }: { entries: Entry[]; kicker: string; note?: string }) {
  return (
    <section className="chronik bleed" aria-label={kicker}>
      <div className="wrap">
        <div className="chronik-head">
          <p className="kicker" style={{ maxWidth: 200 }}>
            {kicker}
          </p>
          {note && <p className="fieldnote hide-mobile" style={{ maxWidth: 260 }}>{note}</p>}
        </div>
        <ChronikList entries={entries} />
      </div>
    </section>
  );
}

export function ChronikList({ entries }: { entries: Entry[] }) {
  return (
    <ol className="chronik-list" style={{ ["--n" as string]: entries.length }}>
      {entries.map((e, i) => (
        <li key={e.year + i} className={i === entries.length - 1 ? "last" : undefined}>
          <span className="chronik-dot" aria-hidden="true" />
          <span className="chronik-year">{e.year}</span>
          <span className="chronik-text">{e.text}</span>
        </li>
      ))}
    </ol>
  );
}
