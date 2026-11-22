# Bridal & Event Makeup Studio "Soft Proof" Starter — project rules

A one-page booking website for an independent makeup artist, shipped as **North Window Makeup
Studio** (a fictional one-artist studio in the Fan, Richmond, Virginia: a bridal makeup trial, a
bridal consultation, special-event, evening, engagement & portrait and natural occasion makeup —
all in the studio) for the owner to make their own. Its identity lives in `src/site.config.ts`;
`CUSTOMIZE.md` is the prompt that personalizes it. Built around **@profitstudio/booking-engine**
**2.0.0-beta.4** (pinned; lock in `booking-engine.lock.json`). The engine owns booking; this
project owns the public design.

Read before changing anything:
- `BOOKING_ENGINE.md` — the engine's rules (engine-owned; `npx booking-engine sync` replaces it).
- `node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` — the full contract. It wins on technical points.
- `DESIGN.md` — the visual system. `PHOTOS.md` — photo sources and licences.

## The Live Demo layer — leave it alone

- `src/demo/` is the public Live Demo's in-browser engine and sample data. Only
  `npm run dev:demo` / `npm run build:demo` use it (`vite --mode demo` defines
  `__BOOKING_DEMO__`); in every other build it is compiled out. Never read, edit
  or "fix" it while customizing the website.
- Keep the `__BOOKING_DEMO__ ? … : …` branches as they are: the demo wording
  (no email is sent) must stay true in the demo, and the real wording in production.
- `src/demo/engine/` is vendored from the Niche Pack workspace — edit it there.
- `src/admin-main.tsx` passes `emailDelivery={__BOOKING_DEMO__ ? 'none' : undefined}`:
  only the demo's dashboard says no email is sent. Never set it on a real site.

## Engine boundaries (from BOOKING_ENGINE.md)

- All booking data goes through the ONE instance in `src/lib/engine.ts`. Never import
  `@supabase/supabase-js` for booking data, call `booking_*` RPCs or write SQL for booking tables.
- Never edit `supabase/migrations/*_booking_engine_*.sql`, `supabase/functions/booking-mailer/`,
  `booking-engine.lock.json` or `node_modules`.
- Only the publishable key may reach the website (`VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`,
  both or neither). Never a secret/`service_role` key, never an email provider key, in any file or `VITE_` variable.
- Show only the slots `getAvailability()` returns; send `slot.startsAt` back unchanged; show dates and
  times in `business.timezone`. Never compute availability in the browser — the calendar only reshapes
  engine data with the engine's helpers (`monthGrid`, `groupSlotsByPartOfDay`, `isFewLeft`, `nextAvailableDay`…).
- Label slot times with the server's business-local `slot.time` / `confirmation.time` via `formatClockTime`.
- Book in two steps: `requestBooking()` → code step → `verifyBooking()`. "Send a new code" =
  `resendVerificationCode()`; "Choose another time" = await `cancelBookingRequest()`, then reload availability.
- Handle `ok: false` on every call. Show success only after `verifyBooking()` returned `ok: true`
  (pending → "Request received — we'll review your appointment and confirm the time shortly.", confirmed →
  "Your appointment is booked."). Preview answers `PREVIEW_MODE`: say so honestly, never a success screen.
- Read the engine's answer strictly (`src/lib/bookingStatus.ts`): say "booked" only when `status === 'confirmed'`
  and "request received" only when it is `'pending'` — never treat "not pending" as booked. `BOOKING_INACTIVE`
  (the code was accepted earlier, but the request was declined, cancelled or not confirmed in time) is never a
  success: show "This request is no longer active. Please choose a new time or contact the business." with the
  reference, go back to the times, and forget the remembered code so no recovery path verifies it again.
- `business.policies.onlineBookingEnabled === false` (or `BOOKING_DISABLED`) → contact details instead of the flow.
- The engine sends every booking email. Never add an email service to the website.
- Keep the packaged dashboard on `/admin/` (`admin/index.html` → `src/admin-main.tsx`). Never fork or restyle it:
  `src/admin-theme.css` sets only `--pbe-accent` / `--pbe-accent-text` per mode.

## What the engine does not do — never fake it

**One booking = one appointment in the studio with one artist, on one calendar.** A bridal trial is
ONE appointment that reserves its own time only — never the wedding date, wedding-day makeup or a
second appointment. A consultation is a conversation, not a full makeup application. Wedding-day
makeup is arranged with the artist personally (by email or phone) and confirmed in writing; the
website only offers an "Ask about your wedding date" email. Fees are per appointment and paid at the
studio. A new booking feature needs a new engine version — never custom database code or browser-side
logic in this project:

- wedding-date holds, linked trial + wedding bookings, multi-session or multi-hour wedding mornings;
- bridal-party or group bookings, several artists, staff assignment;
- deposits, retainers, packages, checkout or any online payment; contracts or e-signatures;
- on-location appointments, travel time or travel fees; automatic wedding timelines;
- product-sensitivity questionnaires or any medical screening;
- image uploads, customer portfolios, before-and-after photos.

The booking notes field is **About your look (optional)**: the occasion, the style in mind, inspiration.
Never ask for medical history, skin conditions or allergies in the form; the site tells visitors to
discuss sensitivities privately with the artist before the appointment, and never claims to screen for
or prevent reactions. Proposed engine work: `docs/ENGINE-PROPOSAL-bridal-makeup.md` in the Niche Pack
workspace.

## Where things live

| What | Where |
|---|---|
| Engine instance (preview: name, `America/New_York`, placeholder contact) | `src/lib/engine.ts` |
| This site's preset (sample services, hours, policies; "clients"/"appointments") — also the dashboard's starter set | `src/lib/preset.ts` (`sitePreset`) |
| Kinds (Bridal · Events & occasions, from the name, then the description), roles (trial · consultation · wedding day), the trial (`bridalTrial`), length and fee terms, "For:" parsing, duration labels | `src/lib/services.ts` |
| What the owner can edit (texts, every section photo, eight portfolio frames with look and caption, the three booking facts, the trial facts, steps and date box, the wedding-day steps and inquiry card, the appointment steps and sensitivities note, the studio's three photos and facts, logo, brand colour, heading style) | `src/content/site.ts` (`defineSiteContent`) |
| Content store + brand → CSS variables (`--accent`, `data-headings`) | `src/lib/content.ts` |
| Design tokens — the ONLY file with raw colours, fonts, sizes, spacing | `src/styles/tokens.css` |
| Base / page / booking styles (tokens only) | `src/styles/base.css`, `site.css`, `booking.css` |
| Sections | `src/components/*.tsx` (Header, Hero, Portfolio `#portfolio` + its viewer, Services `#services`, Trial `#trial`, WeddingDay `#wedding-day`, Process `#appointment`, Studio `#studio`, GoodToKnow, Visit, Footer; `SectionMark` the number · crop mark · name label; `Proof` the crop-marked photo frame; `Emphasis` renders the owner's `*highlight*` in italics); the section list for header, phone menu and footer is `src/lib/nav.ts` |
| Booking sheet (a modal `<dialog>` at `#book`; Back/Esc/✕ close it) + the `#book` band | `src/App.tsx` (open/close + history), `src/components/booking/BookingSheet.tsx`, `BookingSection.tsx`, `src/lib/dialog.ts` |
| Booking flow | `src/components/booking/` (BookingFlow = state + engine calls, root `#book-flow`; DayPicker, TimePicker, DetailsForm, CodeStep, Summary, Done) |
| "Open now" + hours changes | `src/lib/useOpening.ts`, `src/lib/hours.ts` |
| Photo variant map | `public/photos/`, `src/content/photoVariants.ts` (generated) |
| Content baked into `index.html` at build | `vite.config.ts` (`publishedSiteContent`) |

## Rules for future changes

- **Content fields:** render values as text (never `dangerouslySetInnerHTML`), images from the resolved
  `src`/`alt`. Never rename or reuse a field id on a live site — add a new id. Services, fees, durations,
  hours, the address, phone and email are NOT content: they come from the engine. The engine does not allow
  default images inside list fields — that is why each portfolio and studio photo is its own image field.
- `src/content/site.ts` is also imported by `vite.config.ts` (Node): keep it free of local imports.
- **Every Book button** calls `startBooking()` (App): it opens the sheet, or — while online booking is off,
  unconfigured or failing — leads to the `#book` section and its contact details. A service row's Book passes
  that service's engine id; "Book a bridal trial" passes `bridalTrial(services, values['trial.service'])`.
- **Which service is the trial:** the engine gives services no build-time-stable key (only a database id), so
  `bridalTrial()` takes (1) the service named in Website → Bridal trial → "Your trial service" (exact name,
  case/space-insensitive), else (2) the first service whose name says "trial", else (3) none. App calls
  `setTrialName()` so every role label (row flag, summary, confirmation) follows the same choice. With no trial
  (deleted, hidden, renamed without updating that field) the trial buttons say "Book an appointment" /
  "Choose an appointment", open the booking with nothing chosen, and no trial length, fee or note is shown —
  never an unrelated service, never a stored price. Keep `concepts/bridal-makeup-soft-proof/trial-identity.mjs`
  passing.
- **Kinds and roles:** `kindOf()` reads the NAME (then the description) against `RULES` (first match wins:
  bridal / bride / wedding / trial / consultation → Bridal; event / evening / engagement / occasion / portrait /
  glam / natural / makeup → Events & occasions; no match → "More appointments"). `roleOf()` reads the name:
  trial, consultation, wedding day / wedding morning, else appointment. Keep
  `concepts/bridal-makeup-soft-proof/kinds.test.mjs` (Niche Pack workspace) passing.
- **Lengths and fees:** always from the engine (`timeTerms`, `priceTerms`). Never hard-code a service, length,
  fee or id in copy (FAQ answers included). Never suggest anything is paid online, never show a payment success.
- **The trial and the wedding date:** wherever the trial is offered (hero, its row, the trial section, the
  summary, the done step) keep it clear that it does NOT reserve the wedding date, and that wedding mornings
  are confirmed by the artist separately, in writing. A wedding-day inquiry is never shown as a booking.
- **Sample photos:** every photo carries a "Sample" label until the owner replaces that field (`ownerFields`);
  the portfolio says "Sample imagery — illustrative makeup inspiration" and that the photos are licensed stock,
  not the studio's clients or work; the studio says the photographs show another studio (and, in preview and
  the Live Demo, that the studio is fictional). Never present a stock photo's people as the artist or her
  clients, never name them; never invent a name, qualifications, years of experience, awards, celebrity
  clients, testimonials, reviews, before-and-after comparisons or wear guarantees (all-day, waterproof,
  flawless, hypoallergenic). No cosmetic brand logos.
- **Default photos:** add your own variants to `public/photos/`, keep the default `src` in `site.ts` equal to a
  key in `photoVariants.ts`, record the source in `PHOTOS.md`. If the first-screen default changes, update the
  `<link rel="preload">` in `index.html` (`imagesizes` must match `HERO_SIZES` in `src/components/Hero.tsx`).
- **Policies:** Good to know shows a "Sample policies" label until the owner edits `faq.items`.
- **Copy:** warm, plain, first person ("I check…"); calm and personal; no pressure, no "best artist in town".
  Only services the owner really offers.
- **Style:** plain CSS with the tokens; no UI kit. Keep 44 px tap targets, visible focus, the
  `prefers-reduced-motion` path, and every text/background pair at 4.5:1. The brand colour is owner-editable
  and always carries white text (`--on-accent`); on kohl use `--accent-glow`. Photographs are square-cornered.
- **Composition:** editorial and calm (DESIGN.md → Layout). New sections open with `.section-head`
  (SectionMark + h2 + intro). The crop mark (`.proof`, `.section-mark__crop`) stays the one ornament — no
  floating makeup icons, brush clip-art, lipstick prints, glitter or gradients.
- The public site stays one page (sections + in-page booking flow); no client-side path routes.

## Commands

```bash
npm run dev                              # http://localhost:5191 (preview mode without a backend)
npm run build                            # tsc -b && vite build (multi-page: / and /admin/)
npm run lint                             # oxlint (supabase/functions is ignored)
npm run dev:demo                         # the Live Demo: in-browser engine + dashboard, nothing sent
npm run build:demo                       # the public Live Demo build — never the production site
npx booking-engine doctor                # project check
npx booking-engine doctor --dist dist    # after a build: scans the output for secrets
```

Connecting a backend (Supabase, email) follows INTEGRATION.md §11 — only with the owner's go-ahead.
