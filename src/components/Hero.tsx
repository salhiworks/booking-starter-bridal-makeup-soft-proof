import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import type { SiteValues } from '../lib/content';
import type { OpenStatus } from '../lib/hours';
import { bookLink } from '../lib/bookLink';
import { durationLabel, durationSpoken, priceTerms } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { Proof } from './Proof';

/** Keep in sync with the hero preload in index.html. */
export const HERO_SIZES = '(min-width: 960px) 44vw, 100vw';

/** The main button's words when no trial service exists (it then opens the booking with nothing chosen). */
export const NO_TRIAL_CTA = 'Book an appointment';

interface HeroProps {
  values: SiteValues;
  status: OpenStatus | null;
  /** Fields the owner has set — the photo's "Sample" label disappears once they replace it. */
  ownerFields: string[];
  /** The bridal trial from the engine (by name), when the owner lists one. */
  trial: Service | null;
  /** Services loaded and no trial among them: a plain booking button, no trial figures or trial note. */
  noTrial: boolean;
  business: Business | null;
  onBook: StartBooking;
}

/**
 * The first screen. Left: where and what, a large editorial headline with one italic phrase
 * in the brand colour, one paragraph, "Book a bridal trial" (the booking opens with the trial
 * chosen) and a quiet second button to the services; then the trial's real length and fee from
 * the engine as a proof line, the honest date line and today's hours. Right: one portrait in
 * crop marks. Phones: the words and both actions first, then the portrait at full width.
 */
export function Hero({ values, ownerFields, status, trial, noTrial, business, onBook }: HeroProps) {
  const sample = !ownerFields.includes('hero.photo');
  const photo = values['hero.photo'];
  const secondary = values['hero.secondary'].trim();
  const note = noTrial ? '' : values['hero.note'].trim();
  const locale = business?.locale ?? 'en-US';
  const price = trial ? priceTerms(trial, locale) : null;
  return (
    <section className={`hero ${photo ? '' : 'hero--text-only'}`} id="top" aria-labelledby="hero-title">
      <div className="page hero__inner">
        <div className="hero__text">
          {values['hero.eyebrow'] && <p className="eyebrow hero__eyebrow hero__enter">{values['hero.eyebrow']}</p>}
          <h1 id="hero-title" className="hero__title hero__enter">
            <Emphasis text={values['hero.title']} />
          </h1>
          {values['hero.lede'] && <p className="hero__lede hero__enter">{values['hero.lede']}</p>}
          <div className="hero__actions hero__enter">
            <a className="button button--large" href="#book" onClick={bookLink(onBook, trial?.id)}>
              {noTrial ? NO_TRIAL_CTA : values['hero.cta']}
            </a>
            {secondary && (
              <a className="button button--ghost button--large" href="#services">
                {secondary}
              </a>
            )}
          </div>
          {trial && price && (
            <dl className="hero__proof hero__enter" aria-label={trial.name}>
              <div>
                <dt>{trial.name}</dt>
                <dd>
                  <span aria-hidden="true">{durationLabel(trial.durationMinutes)}</span>
                  <span className="sr-only">{durationSpoken(trial.durationMinutes)}</span>
                </dd>
              </div>
              <div>
                <dt>{price.label}</dt>
                <dd>{price.kind === 'from' ? `from ${price.amount}` : price.amount}</dd>
              </div>
              <div>
                <dt>Paid</dt>
                <dd>at the studio</dd>
              </div>
            </dl>
          )}
          {note && <p className="hero__note hero__enter">{note}</p>}
          {status && (
            <p className="open-status hero__status hero__enter" data-open={status.open}>
              <span className="open-status__dot" aria-hidden="true" />
              {status.text}
            </p>
          )}
        </div>

        {photo && (
          <Proof className="hero__visual" sample={sample ? 'Sample' : null}>
            <Photo image={photo} sizes={HERO_SIZES} priority className="hero__photo" />
          </Proof>
        )}
      </div>
    </section>
  );
}
