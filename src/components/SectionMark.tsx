/**
 * A section's label: its number, a small crop mark (the corner of a print proof — the one
 * ornament of this design) and its name in small capitals. Decorative — hidden from screen
 * readers; the heading below names the section.
 */
export function SectionMark({ n, label, tone }: { n: number; label: string; tone?: 'on-dark' }) {
  return (
    <p className={`section-mark ${tone ? `section-mark--${tone}` : ''}`} aria-hidden="true">
      <span className="section-mark__n">{String(n).padStart(2, '0')}</span>
      <span className="section-mark__crop" />
      <span className="section-mark__label">{label}</span>
    </p>
  );
}
