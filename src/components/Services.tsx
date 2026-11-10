import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { durationLabel, durationSpoken, kinds, priceTerms, splitDescription, timeTerms } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Notice } from './Notice';
import { SectionMark } from './SectionMark';

interface ServicesProps {
  values: SiteValues;
  services: Resource<Service[]>;
  business: Business | null;
  onRetry: () => void;
  onBook: StartBooking;
}

/**
 * Services & prices, straight from the engine: every name, length and fee is the one the
 * booking uses. First three plain facts the owner can edit (one booking is one appointment ·
 * wedding days arranged personally · paid at the studio), then the services in their kinds —
 * Bridal (the trial first) and Events & occasions — each row with what happens, who it is for,
 * its length and fee, and a Book button that opens the booking with it chosen. The trial and
 * consultation rows say what they are not. Under the list, the owner's note about prices.
 */
export function Services({ values, services, business, onRetry, onBook }: ServicesProps) {
  const locale = business?.locale ?? 'en-US';
  const all = services.status === 'ready' ? services.data : [];
  const groups = kinds(all);
  const terms = values['services.terms'];

  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="page">
        <header className="section-head services__head">
          <SectionMark n={2} label="Services & prices" />
          <h2 id="services-title">
            <Emphasis text={values['services.title']} />
          </h2>
          {values['services.intro'] && <p className="section-intro">{values['services.intro']}</p>}
        </header>

        {terms.length > 0 && (
          <ul className="terms" role="list">
            {terms.map((t, i) => (
              <li className="term" key={`${i}-${t.title}`}>
                <p className="term__title">{t.title}</p>
                {t.text && <p className="term__text">{t.text}</p>}
              </li>
            ))}
          </ul>
        )}

        {services.status === 'loading' && (
          <div className="services__loading" aria-busy="true">
            <p className="sr-only" role="status">
              Loading services…
            </p>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="skeleton skeleton--service" aria-hidden="true" />
            ))}
          </div>
        )}

        {services.status === 'error' &&
          (services.error.code === 'NOT_CONFIGURED' ? (
            <p className="quiet-state">Services and prices will be listed here soon.</p>
          ) : (
            <Notice tone="error" action={{ label: 'Try again', onClick: onRetry }}>
              <p>We couldn't load the services and prices just now.</p>
            </Notice>
          ))}

        {services.status === 'ready' && all.length === 0 && (
          <p className="quiet-state">Services will be listed here soon. In the meantime, please call or email the studio.</p>
        )}

        {groups.map((g) => (
          <div className={`kind kind--${g.id}`} key={g.id} aria-labelledby={`kind-${g.id}`}>
            <div className="kind__head">
              <h3 id={`kind-${g.id}`} className="kind__title">
                {g.label}
              </h3>
              {g.note && values[g.note] && <p className="kind__note">{values[g.note]}</p>}
            </div>
            <ul className="kind__list" role="list">
              {g.services.map((s) => (
                <ServiceRow key={s.id} service={s} locale={locale} onBook={onBook} />
              ))}
            </ul>
          </div>
        ))}

        {values['services.priceNote'] && <p className="services__price-note prewrap">{values['services.priceNote']}</p>}
      </div>
    </section>
  );
}

function ServiceRow({ service, locale, onBook }: { service: Service; locale: string; onBook: StartBooking }) {
  const { lead, suits } = splitDescription(service.description);
  const time = timeTerms(service);
  const price = priceTerms(service, locale);
  return (
    <li className={`row row--${time.role}`} data-service={service.name}>
      <div className="row__main">
        <h4 className="row__name">{service.name}</h4>
        {time.note && <p className="row__flag">{time.note}</p>}
        {lead && <p className="row__lead">{lead}</p>}
        {suits.length > 0 && (
          <p className="row__suits">
            <span className="row__suits-label">For </span>
            {suits.join(' · ')}
          </p>
        )}
      </div>
      <dl className="row__figures">
        <div>
          <dt>{time.label}</dt>
          <dd>
            <span aria-hidden="true">{durationLabel(service.durationMinutes)}</span>
            <span className="sr-only">{durationSpoken(service.durationMinutes)}</span>
          </dd>
        </div>
        <div>
          <dt>{price.label}</dt>
          <dd>{price.amount}</dd>
          {price.note && <dd className="row__price-note">{price.note}</dd>}
        </div>
      </dl>
      <a className="button button--small row__book" href="#book" onClick={bookLink(onBook, service.id)}>
        Book<span className="sr-only"> {service.name}</span>
      </a>
    </li>
  );
}
