import type { ReactNode } from 'react';

/**
 * The design's one ornament: four fine crop marks just outside a photograph's corners, as on a
 * print proof checked before the final run. Purely decorative (CSS pseudo-elements); the photo
 * inside keeps its own alt text. `label` sets the small "Sample" tag on the photo.
 */
export function Proof({ children, className, sample }: { children: ReactNode; className?: string; sample?: string | null }) {
  return (
    <figure className={`proof ${className ?? ''}`}>
      {children}
      {sample && <span className="tag tag--on-photo">{sample}</span>}
    </figure>
  );
}
