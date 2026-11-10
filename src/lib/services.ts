import { formatMoney } from '@profitstudio/booking-engine';
import type { Service } from '@profitstudio/booking-engine';

/**
 * The studio's service list: its kinds, honest price and length terms, the
 * bridal trial, and who each service suits.
 *
 * The engine (2.0.0-beta.3) has no service categories and no per-service
 * metadata, and a service's id is a database UUID this site cannot know when it
 * is built — so everything here is read from the service's own engine data:
 *
 *   1. its KIND, from its NAME against the rules below — first match wins,
 *      strongest signal first ("Bridal Makeup Trial" is bridal, "Evening
 *      Makeup" is an event); if the name has no matching words, its
 *      DESCRIPTION; otherwise "More appointments":
 *        - bridal  Bridal         (bridal, bride, wedding, trial, consultation)
 *        - event   Events & occasions (event, evening, engagement, occasion, portrait, glam, party, makeup)
 *   2. its ROLE inside the bridal kind: the trial (name says trial), a
 *      consultation (name says consult), wedding-day (name says wedding day /
 *      wedding morning) — each gets its own honest line;
 *   3. what its LENGTH means (timeTerms): always the real length of one appointment;
 *   4. what its PRICE means (priceTerms): the fee for that one appointment, paid
 *      at the studio; zero is free; a starting price (`priceFrom`) reads "from";
 *   5. who it suits: the part of its description after "For:" (or "Suits:"),
 *      split at "·" — written by the owner in Dashboard → Services.
 *
 * Stable categories, linked trial + wedding bookings, date holds, retainers or
 * bridal parties need an engine version — see
 * docs/ENGINE-PROPOSAL-bridal-makeup.md in the Niche Pack workspace.
 */
export type KindId = 'bridal' | 'event' | 'more';
export type Role = 'trial' | 'consultation' | 'wedding-day' | 'appointment';

/** Content fields that belong to a kind (src/content/site.ts). */
export type KindNote = 'services.noteBridal' | 'services.noteEvent';

interface KindRule {
  id: KindId;
  label: string;
  note: KindNote | null;
  match: RegExp;
}

const RULES: KindRule[] = [
  {
    id: 'bridal',
    label: 'Bridal',
    note: 'services.noteBridal',
    match: /\b(bridal|brides?|wedding|trials?|consultations?|consult)\b/i,
  },
  {
    id: 'event',
    label: 'Events & occasions',
    note: 'services.noteEvent',
    match: /\b(events?|evening|engagement|occasions?|portraits?|headshots?|glam|party|parties|gala|prom|graduation|natural|makeup|make-up|lessons?)\b/i,
  },
];

const MORE = { id: 'more', label: 'More appointments', note: null } as const;

/** The order kinds are shown in: bridal first (the trial leads), then events. */
const ORDER: KindId[] = ['bridal', 'event', 'more'];

export interface Kind {
  id: KindId;
  label: string;
  note: KindNote | null;
  services: Service[];
}

/**
 * The owner's own name for their trial service (Website → Bridal trial → "Your trial service"), set
 * once per render by App from the published content. Empty = automatic (a name that says "trial").
 * The engine (2.0.0-beta.3) gives services no build-time-stable key — only a database id the site
 * cannot know — so this explicit, owner-edited name is how a renamed trial stays the trial.
 */
let chosenTrialName = '';
const norm = (s: string) => s.trim().replace(/\s+/g, ' ').toLowerCase();

export function setTrialName(name: string | null | undefined): void {
  chosenTrialName = norm(name ?? '');
}

/** True when this name is the owner's chosen trial service. */
function isChosenTrial(name: string): boolean {
  return chosenTrialName !== '' && norm(name) === chosenTrialName;
}

export function kindOf(service: Pick<Service, 'name' | 'description'>): KindRule | typeof MORE {
  if (isChosenTrial(service.name)) return RULES[0];
  const byName = RULES.find((rule) => rule.match.test(service.name));
  if (byName) return byName;
  const { lead } = splitDescription(service.description);
  return RULES.find((rule) => rule.match.test(lead)) ?? MORE;
}

/** What the appointment is, read from its NAME only (the owner's words). */
export function roleOf(service: Pick<Service, 'name'>): Role {
  const name = service.name;
  if (isChosenTrial(name)) return 'trial';
  if (/\btrials?\b/i.test(name)) return 'trial';
  if (/\bconsult(ation)?s?\b/i.test(name)) return 'consultation';
  if (/\bwedding[- ](day|morning)\b/i.test(name)) return 'wedding-day';
  return 'appointment';
}

/** Kept for the shared booking flow: services carry no size, so the name always comes back whole. */
export function splitName(name: string): { base: string; size: string | null } {
  return { base: name, size: null };
}

/**
 * Services in their kinds, keeping the owner's display order inside each — except that
 * the bridal trial leads its kind; empty kinds are left out.
 */
export function kinds(services: readonly Service[]): Kind[] {
  const map = new Map<KindId, Kind>();
  for (const service of services) {
    const rule = kindOf(service);
    let k = map.get(rule.id);
    if (!k) {
      k = { id: rule.id, label: rule.label, note: rule.note, services: [] };
      map.set(rule.id, k);
    }
    k.services.push(service);
  }
  const bridal = map.get('bridal');
  if (bridal) {
    const trial = bridal.services.findIndex((s) => roleOf(s) === 'trial');
    if (trial > 0) bridal.services.unshift(...bridal.services.splice(trial, 1));
  }
  return ORDER.flatMap((id) => (map.has(id) ? [map.get(id)!] : []));
}

/**
 * The bridal trial — the one the hero, the trial section and "Book a bridal
 * trial" open the booking with, read from the engine's CURRENT services (so its
 * length and fee are always live), never a hard-coded id or price:
 *   1. the service the owner named in Website → Bridal trial → "Your trial
 *      service" (exact name, ignoring case and spaces) — survives any rename;
 *   2. otherwise the first service whose name says "trial";
 *   3. otherwise none — deleted, hidden or renamed without telling the site:
 *      the buttons then offer "Book an appointment" with no service chosen,
 *      and no trial length or fee is shown. An unrelated service is never chosen.
 */
export function bridalTrial(services: readonly Service[], chosenName?: string | null): Service | null {
  const wanted = norm(chosenName ?? '');
  if (wanted) {
    const chosen = services.find((s) => norm(s.name) === wanted);
    if (chosen) return chosen;
  }
  return services.find((s) => /\btrials?\b/i.test(s.name)) ?? null;
}

/** The first event service (the hero's second action), else null. */
export function firstEvent(services: readonly Service[]): Service | null {
  return services.find((s) => kindOf(s).id === 'event') ?? null;
}

/**
 * "We go through… For: brides · anyone who…" →
 * { lead: "We go through…", suits: ["brides", "anyone who…"] }.
 * Without "For:" the whole description is the lead and the list is empty.
 */
export function splitDescription(description: string | null | undefined): { lead: string; suits: string[] } {
  const text = (description ?? '').trim();
  const match = /(?:^|[\s.])(?:for|suits|suited to|good for|ideal for|best for)\s*:\s*/i.exec(text);
  if (!match) return { lead: text, suits: [] };
  const lead = text.slice(0, match.index + (match[0].startsWith('.') ? 1 : 0)).trim();
  const suits = text
    .slice(match.index + match[0].length)
    .split(/\s*[·•;]\s*|\s+\|\s+/)
    .map((item) => item.trim().replace(/\.$/, ''))
    .filter(Boolean);
  return { lead, suits };
}

/** "45 min", "75 min", "1 h 30 min", "2 h" — the appointment's length, straight from the engine. */
export function durationLabel(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** The same, for screen readers. */
export function durationSpoken(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${minutes} minutes`;
  const hours = `${h} hour${h > 1 ? 's' : ''}`;
  return m ? `${hours} ${m} minutes` : hours;
}

/**
 * What the booking's LENGTH means: always the real length of one appointment
 * in the studio. The trial and the consultation say what they are not.
 */
export interface TimeTerms {
  role: Role;
  /** Small label before the length. */
  label: string;
  /** One honest line under the length, or null. */
  note: string | null;
}

export function timeTerms(service: Pick<Service, 'name'>): TimeTerms {
  const role = roleOf(service);
  if (role === 'trial') return { role, label: 'Length', note: 'Doesn’t reserve your wedding date' };
  if (role === 'consultation') return { role, label: 'Length', note: 'A conversation — no full makeup' };
  if (role === 'wedding-day') return { role, label: 'Length', note: 'Confirmed with the artist first' };
  return { role, label: 'Length', note: null };
}

type PriceInput = Pick<Service, 'priceCents' | 'priceFrom' | 'currency' | 'name'>;

/** Whole dollars print without ".00" — "$160", not "$160.00". */
const money = (cents: number, currency: string, locale: string) => formatMoney(cents, currency, locale).replace(/([.,])00(?!\d)/, '');

/**
 * What the engine's price MEANS on this site (src/lib/preset.ts):
 *   free    → no charge for this appointment
 *   from    → a starting price; the artist confirms the fee before the appointment
 *   fixed   → the fee for this one appointment, paid at the studio
 *   request → no price shown: ask the studio
 */
export interface PriceTerms {
  kind: 'free' | 'from' | 'fixed' | 'request';
  /** Small label before the amount. */
  label: string;
  /** The amount, or the words standing in for it. */
  amount: string;
  /** One honest line under the amount, or null. */
  note: string | null;
}

export function priceTerms(service: PriceInput, locale: string): PriceTerms {
  if (service.priceCents === null) return { kind: 'request', label: 'Fee', amount: 'Ask the studio', note: null };
  if (service.priceCents === 0) return { kind: 'free', label: 'Fee', amount: 'Free', note: 'No charge for this appointment' };
  const amount = money(service.priceCents, service.currency, locale);
  const role = roleOf(service);
  if (service.priceFrom) return { kind: 'from', label: 'From', amount, note: 'Confirmed with you before the appointment' };
  const label = role === 'trial' ? 'Trial fee' : 'Fee';
  return { kind: 'fixed', label, amount, note: null };
}

/** One line: "$160", "from $160", "Free", "Ask the studio". */
export function priceLabel(service: PriceInput, locale: string): string {
  const t = priceTerms(service, locale);
  if (t.kind === 'from') return `from ${t.amount}`;
  return t.amount;
}

/** Short form, for the hero line: same as priceLabel. */
export const shortPrice = priceLabel;
