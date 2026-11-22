import type { RefObject } from 'react';
import { roleOf } from '../../lib/services';
import { formatClockTime, formatDate, timeZoneLabel } from '@profitstudio/booking-engine';
import type { BookingConfirmation, Business } from '@profitstudio/booking-engine';
import { ContactInstead } from './ContactInstead';
import { INACTIVE_TITLE, answerOf, inactiveNext } from '../../lib/bookingStatus';

export type Outcome =
  | { kind: 'booked'; confirmation: BookingConfirmation; email: string }
  | { kind: 'preview' }
  | { kind: 'limit' };

interface DoneProps {
  outcome: Outcome;
  business: Business;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onAgain: () => void;
}

/** Shown only after verifyBooking answered ok: true — or, honestly, after PREVIEW_MODE. */
export function Done({ outcome, business, headingRef, onAgain }: DoneProps) {
  if (outcome.kind === 'preview') {
    return (
      <div className="done done--preview">
        <h2 className="step-title" tabIndex={-1} ref={headingRef} data-step-heading="">
          Preview — nothing was saved
        </h2>
        <p>
          This site is running on sample data, so no email was sent and no appointment was stored. Once the studio's booking system is
          connected, clients see their confirmation here.
        </p>
        <button type="button" className="button button--quiet" onClick={onAgain}>
          Start again
        </button>
      </div>
    );
  }

  if (outcome.kind === 'limit') {
    return (
      <div className="done">
        <h2 className="step-title" tabIndex={-1} ref={headingRef} data-step-heading="">
          You already have appointments booked with us
        </h2>
        <ContactInstead
          business={business}
          title="Let's find a time together"
          text="This email address already has as many upcoming appointments as we can hold online, so we couldn't add another and the time was released. Call or email the studio and we'll gladly help."
        />
      </div>
    );
  }

  const { confirmation, email } = outcome;
  // Only 'confirmed' is booked and only 'pending' is a request; the flow never brings anything else here.
  const answer = answerOf(confirmation);
  if (answer === 'inactive') {
    return (
      <div className="done">
        <h2 className="step-title" tabIndex={-1} ref={headingRef} data-step-heading="">
          {INACTIVE_TITLE}
        </h2>
        <ContactInstead business={business} title="Contact us" text={inactiveNext(confirmation.reference)} />
        <button type="button" className="button button--quiet" onClick={onAgain}>
          Choose a new time
        </button>
      </div>
    );
  }
  const pending = answer === 'pending';
  const { locale } = business;
  return (
    <div className="done">
      <p className="done__mark" aria-hidden="true" />
      <h2 className="step-title" tabIndex={-1} ref={headingRef} data-step-heading="">
        {pending ? 'Request received — we’ll review your appointment and confirm the time shortly.' : 'Your appointment is booked.'}
      </h2>
      <p>
        {__BOOKING_DEMO__ ? (
          // Live Demo build only: no email exists to promise.
          <>
            This is a demo, so no email is sent.{' '}
            {pending ? 'Your request is waiting in the demo dashboard — confirm it there as the artist.' : 'Your appointment is in the demo dashboard.'}{' '}
            <a href="/admin/#bookings">Open the demo dashboard</a>
          </>
        ) : pending ? (
          `We're holding the time for you while the artist reviews your request. We'll email ${email} as soon as it's confirmed.`
        ) : (
          `A confirmation is on its way to ${email}.`
        )}
      </p>
      <p className="done__note">{doneNote(confirmation.serviceName, pending)}</p>
      <dl className="done__details">
        <div>
          <dt>Service</dt>
          <dd>{confirmation.serviceName}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{formatDate(confirmation.date, locale, { weekday: 'long', month: 'long', day: 'numeric' })}</dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>
            {formatClockTime(confirmation.time, locale)}{' '}
            <span className="summary__zone">{timeZoneLabel(confirmation.timezone, locale)}</span>
          </dd>
        </div>
        <div>
          <dt>Reference</dt>
          <dd className="done__reference">{confirmation.reference}</dd>
        </div>
      </dl>
      <button type="button" className="button button--quiet" onClick={onAgain}>
        Book another appointment
      </button>
    </div>
  );
}

/**
 * What this booking is, by its role (read from the service name the engine returned): always ONE
 * appointment in the studio. A bridal trial never reserves the wedding date or wedding-day makeup;
 * a consultation is a conversation; nothing is paid online.
 */
function doneNote(serviceName: string, pending: boolean): string {
  const role = roleOf({ name: serviceName });
  const until = pending ? 'Until it’s confirmed, this is a request — not a confirmed time. ' : '';
  if (role === 'trial') {
    return `${until}This books your trial appointment only — it doesn’t reserve your wedding date or wedding-day makeup. If you’d like me for the wedding, we’ll talk about your date at the trial, and I confirm wedding mornings separately, in writing. Nothing is paid online; the trial fee is paid at the studio.`;
  }
  if (role === 'consultation') {
    return `${until}This books a consultation — a conversation, not a full makeup appointment — and doesn’t reserve a wedding date. Nothing is paid online; the fee is paid at the studio.`;
  }
  if (role === 'wedding-day') {
    return `${until}Wedding-day details — timing, place and anyone else who needs makeup — are agreed with the artist before this is confirmed. Nothing is paid online.`;
  }
  return `${until}This books one makeup appointment in the studio. Nothing is paid online — the fee is paid at the studio.`;
}
