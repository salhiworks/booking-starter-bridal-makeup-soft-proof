import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { Proof } from './Proof';
import { SectionMark } from './SectionMark';

/**
 * Any appointment, from inspiration to the finished look: five numbered steps beside one photo,
 * and a quiet note on product sensitivities (talk privately before the appointment — the booking
 * form is not a health questionnaire).
 */
export function Process({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const photo = values['process.photo'];
  const steps = values['process.steps'];
  return (
    <section id="appointment" className="section band band--satin process" aria-labelledby="process-title">
      <div className={`page process__grid ${photo ? '' : 'process__grid--no-photo'}`}>
        {photo && (
          <Proof className="process__visual" sample={ownerFields.includes('process.photo') ? null : 'Sample'}>
            <Photo image={photo} sizes="(min-width: 960px) 32vw, 100vw" className="process__photo" />
          </Proof>
        )}
        <div className="process__text">
          <header className="section-head">
            <SectionMark n={5} label="Your appointment" />
            <h2 id="process-title">
              <Emphasis text={values['process.title']} />
            </h2>
            {values['process.intro'] && <p className="section-intro">{values['process.intro']}</p>}
          </header>
          {steps.length > 0 && (
            <ol className="process__steps" role="list">
              {steps.map((s, i) => (
                <li key={`${i}-${s.title}`}>
                  <span className="process__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="process__step">{s.title}</p>
                    {s.text && <p className="process__detail">{s.text}</p>}
                  </div>
                </li>
              ))}
            </ol>
          )}
          {values['process.care'] && (
            <div className="care">
              <h3 className="care__title">Allergies & sensitive skin</h3>
              <p className="prewrap">{values['process.care']}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
