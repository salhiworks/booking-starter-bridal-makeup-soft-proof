import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import { durationLabel, durationSpoken, priceTerms } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { Proof } from './Proof';
import { SectionMark } from './SectionMark';

interface TrialProps {
  values: SiteValues;
  ownerFields: string[];
  /** The bridal trial from the engine (by name), when the owner lists one. */
  trial: Service | null;
  noTrial: boolean;
  business: Business | null;
  onBook: StartBooking;
}

/**
 * The bridal trial, on the satin band: what it is, its real length and fee from the engine as
 * large figures, short facts and Book; the photo in crop marks; what happens in five steps; and,
 * set apart in a ruled box, the line that matters most — a trial doesn't reserve the wedding
 * date. Then what to bring.
 */
export function Trial({ values, ownerFields, trial, noTrial, business, onBook }: TrialProps) {
  const locale = business?.locale ?? 'en-US';
  const photo = values['trial.photo'];
  const facts = values['trial.facts'];
  const steps = values['trial.steps'];
  const price = trial ? priceTerms(trial, locale) : null;
  return (
    <section id="trial" className="section band band--satin trial" aria-labelledby="trial-title">
      <div className="page">
        <div className={`trial__top ${photo ? '' : 'trial__top--no-photo'}`}>
          {photo && (
            <Proof className="trial__visual" sample={ownerFields.includes('trial.photo') ? null : 'Sample'}>
              <Photo image={photo} sizes="(min-width: 960px) 38vw, 100vw" className="trial__photo" />
            </Proof>
          )}
          <div className="trial__text">
            <header className="section-head">
              <SectionMark n={3} label="Bridal trial" />
              <h2 id="trial-title">
                <Emphasis text={values['trial.title']} />
              </h2>
              {values['trial.intro'] && <p className="section-intro">{values['trial.intro']}</p>}
            </header>
            {trial && price && (
              <dl className="figures">
                <div>
                  <dt>Length</dt>
                  <dd>
                    <span aria-hidden="true">{durationLabel(trial.durationMinutes)}</span>
                    <span className="sr-only">{durationSpoken(trial.durationMinutes)}</span>
                  </dd>
                </div>
                <div>
                  <dt>{price.label}</dt>
                  <dd>{price.amount}</dd>
                </div>
                <div>
                  <dt>Paid</dt>
                  <dd className="figures__words">at the studio</dd>
                </div>
              </dl>
            )}
            {facts.length > 0 && (
              <ul className="ticks" role="list">
                {facts.map((f, i) => (
                  <li key={`${i}-${f.text}`}>{f.text}</li>
                ))}
              </ul>
            )}
            <div className="trial__actions">
              <a className="button button--large" href="#book" onClick={bookLink(onBook, trial?.id)}>
                {noTrial ? 'Choose an appointment' : 'Book a trial'}
              </a>
              <a className="quiet-link" href="#wedding-day">
                How wedding days are arranged
              </a>
            </div>
          </div>
        </div>

        <div className="boundary" role="note" aria-labelledby="boundary-title">
          <p className="boundary__mark" aria-hidden="true">
            Please note
          </p>
          <h3 id="boundary-title" className="boundary__title">
            {values['trial.boundaryTitle']}
          </h3>
          <p className="boundary__text prewrap">{values['trial.boundaryText']}</p>
        </div>

        {steps.length > 0 && (
          <div className="trial__steps">
            <h3 className="sub-title">What happens at your trial</h3>
            <ol className="steps" role="list">
              {steps.map((s, i) => (
                <li className="step" key={`${i}-${s.title}`}>
                  <span className="step__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="step__title">{s.title}</p>
                  {s.text && <p className="step__text">{s.text}</p>}
                </li>
              ))}
            </ol>
          </div>
        )}

        {values['trial.bring'] && (
          <div className="trial__bring">
            <h3 className="sub-title">What to bring</h3>
            <p className="prewrap">{values['trial.bring']}</p>
          </div>
        )}
      </div>
    </section>
  );
}
