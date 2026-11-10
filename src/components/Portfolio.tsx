import { useCallback, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import type { SiteImage } from '@profitstudio/booking-engine';
import type { SiteValues } from '../lib/content';
import { useModalDialog } from '../lib/dialog';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionMark } from './SectionMark';

const N = [1, 2, 3, 4, 5, 6, 7, 8] as const;
type Slot = (typeof N)[number];

interface Frame {
  slot: Slot;
  image: SiteImage;
  look: string;
  caption: string;
  /** Still the site's sample photo (the owner hasn't replaced this field). */
  sample: boolean;
  tall: boolean;
}

/** The label every sample frame carries, word for word. */
export const SAMPLE_LABEL = 'Sample imagery — illustrative makeup inspiration';

/**
 * The portfolio: eight frames the owner fills, each with a look (the filter) and a caption.
 * Desktop: four columns, the second and fourth set lower (an editorial stagger); tablet two
 * columns; phones a swipeable rail of large frames, so faces are never shrunk to thumbnails. Any frame opens a
 * viewer (a modal <dialog>) with the whole photo, its caption, previous / next and Esc.
 *
 * Honesty: while a frame is the site's own sample it carries "Sample", and the section says
 * plainly that the imagery is illustrative inspiration — not the studio's clients or its work.
 */
export function Portfolio({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const frames = useMemo<Frame[]>(
    () =>
      N.flatMap((n) => {
        const image = values[`folio.photo${n}`];
        if (!image) return [];
        const ratio = (image.width ?? 4) / (image.height ?? 5);
        return [
          {
            slot: n,
            image,
            look: values[`folio.look${n}`].trim(),
            caption: values[`folio.caption${n}`].trim(),
            sample: !ownerFields.includes(`folio.photo${n}`),
            tall: ratio < 0.72,
          },
        ];
      }),
    [values, ownerFields],
  );
  const looks = useMemo(() => [...new Set(frames.map((f) => f.look).filter(Boolean))], [frames]);
  const [look, setLook] = useState<string | null>(null);
  const shown = look ? frames.filter((f) => f.look === look) : frames;
  const anySample = frames.some((f) => f.sample);

  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

  if (frames.length === 0) return null;

  return (
    <section id="portfolio" className="section folio" aria-labelledby="folio-title">
      <div className="page">
        <header className="section-head folio__head">
          <SectionMark n={1} label="Portfolio" />
          <h2 id="folio-title">
            <Emphasis text={values['folio.title']} />
          </h2>
          {values['folio.intro'] && <p className="section-intro">{values['folio.intro']}</p>}
          {anySample && (
            <p className="folio__honest">
              <span>
                <strong>{SAMPLE_LABEL}.</strong> These photographs are licensed stock images, not this studio’s clients or its work, and no
                result is promised.
              </span>
            </p>
          )}
        </header>

        {looks.length > 1 && (
          <div className="folio__filter" role="group" aria-label="Show looks">
            <button type="button" className="chip" aria-pressed={look === null} onClick={() => setLook(null)}>
              All looks
            </button>
            {looks.map((l) => (
              <button type="button" className="chip" key={l} aria-pressed={look === l} onClick={() => setLook(l)}>
                {l}
              </button>
            ))}
          </div>
        )}

        <ul className="folio__grid" role="list" aria-label={look ? `Looks: ${look}` : 'All looks'}>
          {shown.map((f, i) => (
            <li key={f.slot} className={`folio__item ${f.tall ? 'folio__item--tall' : ''}`}>
              <figure className="folio__frame">
                <button type="button" className="folio__open" onClick={() => setOpen(i)} aria-haspopup="dialog">
                  <Photo image={f.image} sizes="(min-width: 1100px) 22vw, (min-width: 700px) 45vw, 78vw" className="folio__photo" />
                  <span className="sr-only">Open larger: {f.caption || f.image.alt}</span>
                </button>
                {f.sample && <span className="tag tag--on-photo">Sample</span>}
              </figure>
              {(f.look || f.caption) && (
                <p className="folio__caption">
                  {f.look && <span className="folio__look">{f.look}</span>}
                  {f.caption && <span className="folio__text">{f.caption}</span>}
                </p>
              )}
            </li>
          ))}
        </ul>
        {shown.length > 1 && (
          <p className="folio__swipe" aria-hidden="true">
            Swipe for more · {shown.length} photos
          </p>
        )}
      </div>
      <Viewer frames={shown} index={open} onIndex={setOpen} onClose={close} />
    </section>
  );
}

function Viewer({ frames, index, onIndex, onClose }: { frames: Frame[]; index: number | null; onIndex: (i: number) => void; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const isOpen = index !== null && index < frames.length;
  useModalDialog(ref, isOpen, onClose);
  const frame = isOpen ? frames[index] : null;
  const go = (step: number) => {
    if (index === null) return;
    onIndex((index + step + frames.length) % frames.length);
  };
  const onKey = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowRight') go(1);
    if (event.key === 'ArrowLeft') go(-1);
  };
  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };
  return (
    <dialog ref={ref} className="viewer" aria-label="Portfolio photo" onKeyDown={onKey} onClick={onDialogClick}>
      {frame && (
        <div className="viewer__panel">
          <div className="viewer__image">
            <Photo image={frame.image} sizes="(min-width: 900px) 60vw, 100vw" className="viewer__photo" />
          </div>
          <div className="viewer__meta">
            <p className="viewer__count">
              {index! + 1} / {frames.length}
            </p>
            {frame.look && <p className="folio__look">{frame.look}</p>}
            {frame.caption && <p className="viewer__caption">{frame.caption}</p>}
            {frame.sample && (
              <p className="viewer__honest">
                <span className="tag">Sample</span> {SAMPLE_LABEL}. Licensed stock photography — not a client of this studio.
              </p>
            )}
            <div className="viewer__nav">
              {frames.length > 1 && (
                <>
                  <button type="button" className="button button--ghost" onClick={() => go(-1)}>
                    <span aria-hidden="true">←</span> Previous
                  </button>
                  <button type="button" className="button button--ghost" onClick={() => go(1)}>
                    Next <span aria-hidden="true">→</span>
                  </button>
                </>
              )}
            </div>
          </div>
          <button type="button" className="icon-button viewer__close" onClick={onClose} autoFocus>
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
              <path d="M3 3l10 10M13 3 3 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="sr-only">Close the photo</span>
          </button>
        </div>
      )}
    </dialog>
  );
}
