import type { SiteValues } from '../lib/content';
import { engine } from '../lib/engine';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { Proof } from './Proof';
import { SectionMark } from './SectionMark';

const SLOTS = [1, 2, 3] as const;
/** The Live Demo and preview mode show a fictional studio: say so. */
const SAMPLE_BUSINESS = __BOOKING_DEMO__ || engine.mode === 'preview';

/**
 * The studio: the owner's text and facts, and up to three level frames with captions.
 * While any frame is a sample, a note says the photographs show another studio.
 */
export function Studio({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const frames = SLOTS.flatMap((n) => {
    const image = values[`studio.photo${n}`];
    return image ? [{ n, image, caption: values[`studio.caption${n}`].trim(), sample: !ownerFields.includes(`studio.photo${n}`) }] : [];
  });
  const facts = values['studio.facts'];
  const anySample = frames.some((f) => f.sample);
  return (
    <section id="studio" className="section studio" aria-labelledby="studio-title">
      <div className="page">
        <div className="studio__top">
          <header className="section-head">
            <SectionMark n={6} label="The studio" />
            <h2 id="studio-title">
              <Emphasis text={values['studio.title']} />
            </h2>
          </header>
          <div className="studio__body">
            {values['studio.text'] && <p className="studio__text prewrap">{values['studio.text']}</p>}
            {anySample && (
              <p className="sample-note">
                <span className="tag">Sample</span>
                {SAMPLE_BUSINESS
                  ? 'The photographs show another makeup studio, and this demo studio is fictional.'
                  : 'These photographs show another makeup studio.'}
              </p>
            )}
          </div>
        </div>
        {frames.length > 0 && (
          <ul className={`studio__frames studio__frames--${frames.length}`} role="list">
            {frames.map((f) => (
              <li key={f.n}>
                <Proof sample={f.sample ? 'Sample' : null}>
                  <Photo image={f.image} sizes="(min-width: 900px) 30vw, 100vw" className="studio__photo" />
                </Proof>
                {f.caption && <p className="studio__caption">{f.caption}</p>}
              </li>
            ))}
          </ul>
        )}
        {facts.length > 0 && (
          <dl className="studio__facts">
            {facts.map((f, i) => (
              <div key={`${i}-${f.title}`}>
                <dt>{f.title}</dt>
                {f.text && <dd>{f.text}</dd>}
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
