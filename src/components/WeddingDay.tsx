import type { Business } from '@profitstudio/booking-engine';
import type { SiteValues } from '../lib/content';
import { telHref } from '../lib/contact';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { Proof } from './Proof';
import { SectionMark } from './SectionMark';

/** The email the "Ask about your date" button opens: a subject and empty prompts — nothing of the visitor's. */
const SUBJECT = 'Wedding-day makeup — is my date free?';
const BODY = 'Wedding date:\nTown or venue:\nCeremony time:\nWhere I’ll be getting ready:\nAnyone else who would like makeup:\n\n';

/**
 * Wedding-day makeup is arranged personally, never booked online: the owner's five steps as a
 * fine vertical line, the photo, and an "Ask about your date" card that opens an email to the
 * studio (or offers the phone number). Its wording says plainly that nothing is held until the
 * artist confirms in writing.
 */
export function WeddingDay({ values, ownerFields, business }: { values: SiteValues; ownerFields: string[]; business: Business | null }) {
  const photo = values['wedding.photo'];
  const steps = values['wedding.steps'];
  const email = business?.contact.email ?? null;
  const phone = business?.contact.phone ?? null;
  const mail = email ? `mailto:${email}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}` : null;
  return (
    <section id="wedding-day" className="section wedding" aria-labelledby="wedding-title">
      <div className={`page wedding__grid ${photo ? '' : 'wedding__grid--no-photo'}`}>
        <div className="wedding__text">
          <header className="section-head">
            <SectionMark n={4} label="Wedding day" />
            <h2 id="wedding-title">
              <Emphasis text={values['wedding.title']} />
            </h2>
            {values['wedding.intro'] && <p className="section-intro">{values['wedding.intro']}</p>}
          </header>
          {steps.length > 0 && (
            <ol className="timeline" role="list">
              {steps.map((s, i) => (
                <li className="timeline__item" key={`${i}-${s.title}`}>
                  <span className="timeline__n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <p className="timeline__title">{s.title}</p>
                  {s.text && <p className="timeline__text">{s.text}</p>}
                </li>
              ))}
            </ol>
          )}
          <div className="ask">
            <h3 className="ask__title">{values['wedding.askTitle']}</h3>
            {values['wedding.askText'] && <p className="ask__text">{values['wedding.askText']}</p>}
            <div className="ask__actions">
              {mail && (
                <a className="button" href={mail}>
                  {values['wedding.askButton']}
                </a>
              )}
              {phone && (
                <a className={mail ? 'quiet-link' : 'button'} href={telHref(phone)}>
                  {mail ? `or call ${phone}` : `Call ${phone}`}
                </a>
              )}
              {!mail && !phone && <p className="quiet-state">Contact details will be listed under Visit soon.</p>}
            </div>
            <p className="ask__fine">An inquiry isn’t a booking: your date is held only once I’ve confirmed it in writing.</p>
          </div>
        </div>
        {photo && (
          <Proof className="wedding__visual" sample={ownerFields.includes('wedding.photo') ? null : 'Sample'}>
            <Photo image={photo} sizes="(min-width: 960px) 34vw, 100vw" className="wedding__photo" />
          </Proof>
        )}
      </div>
    </section>
  );
}
