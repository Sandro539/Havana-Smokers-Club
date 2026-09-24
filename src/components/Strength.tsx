import { strengthLabels } from "@/lib/format";

export function Strength({ value, showLabel = true }: { value: number; showLabel?: boolean }) {
  return (
    <span className="strength" aria-label={`Stärke ${value} von 5, ${strengthLabels[value]}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <i key={i} className={i <= value ? "on" : undefined} aria-hidden="true" />
      ))}
      {showLabel && (
        <span aria-hidden="true">
          {value}/5 {strengthLabels[value]}
        </span>
      )}
    </span>
  );
}
