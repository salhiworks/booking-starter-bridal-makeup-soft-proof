import type { Preset } from '@profitstudio/booking-engine';

/**
 * North Window Makeup Studio's own preset (INTEGRATION.md §5): the sample
 * services, hours and policies preview mode shows, and the starter set the
 * dashboard offers an owner who has no services yet (<BookingAdmin presets>).
 * Prices are in US dollars, in cents.
 *
 * WHAT A BOOKING IS HERE. One booking = ONE appointment with the studio's one
 * makeup artist, in the studio, on the studio's one calendar. Its length is the
 * real length of that appointment (the time in the chair). A booking is never
 * a wedding, a package or a date hold:
 *   - the BRIDAL MAKEUP TRIAL is a real, full makeup appointment to design and
 *     test the wedding look. It reserves only its own time. It does NOT reserve
 *     the wedding date or wedding-day makeup;
 *   - the BRIDAL CONSULTATION is a conversation (and a skin and shade check),
 *     not a full makeup application;
 *   - every event service is the full makeup appointment for that occasion,
 *     in the studio, on the day.
 * Wedding-day makeup (often early, sometimes on location, sometimes for more
 * than one person) is arranged with the artist personally — the engine does
 * not hold dates, schedule travel, group a bridal party or take a retainer.
 * The buffer after each appointment is the artist's time to clean every brush
 * and reset the station before the next client.
 *
 * WHAT A PRICE IS HERE. The engine has one price per service: the fee for that
 * one appointment, paid at the studio (src/lib/services.ts → priceTerms). Zero
 * reads as free. Nothing is paid online: the engine books appointments only.
 * The studio confirms every request (`autoConfirm: false`).
 *
 * Who a service suits is written at the end of its description after "For:",
 * separated by "·" — the website shows it as a short "For" line.
 */
export const sitePreset = {
  id: 'bridal-makeup',
  label: 'Bridal & Event Makeup Studio',
  terminology: { customer: 'client', customers: 'clients', booking: 'appointment', bookings: 'appointments' },
  previewBusiness: {
    name: 'Sample Makeup Studio',
    currency: 'USD',
    locale: 'en-US',
    contact: {
      email: 'hello@example.com',
      phone: '+1 804-555-0100',
      address: '100 Example Street, Richmond, VA',
    },
  },
  policies: {
    slotIntervalMinutes: 30,
    minNoticeMinutes: 1440,
    maxAdvanceDays: 120,
    autoConfirm: false,
    requirePhone: true,
    pendingHoldMinutes: 1440,
    verificationWindowMinutes: 15,
  },
  // Trials and events: weekday daytimes, two late afternoons for evening events, Saturday mornings; closed Sunday and Monday.
  workingHours: [
    { weekday: 2, start: '10:00', end: '18:00' },
    { weekday: 3, start: '10:00', end: '18:00' },
    { weekday: 4, start: '11:00', end: '19:00' },
    { weekday: 5, start: '10:00', end: '19:00' },
    { weekday: 6, start: '08:00', end: '15:00' },
  ],
  services: [
    {
      name: 'Bridal Makeup Trial',
      description:
        'A full makeup appointment to design your wedding look. We go through your inspiration, the dress and the day, test skin preparation, base, eyes, brows and lips, adjust as we go and check the finish in daylight and in photos. The trial reserves this appointment only — not your wedding date. For: brides and partners planning wedding makeup · anyone who wants to try a look before the day',
      durationMinutes: 120,
      bufferAfterMinutes: 30,
      priceCents: 16000,
      priceFrom: false,
    },
    {
      name: 'Bridal Consultation',
      description:
        'A conversation before you decide on a trial: your inspiration and the overall style of the wedding, a skin and shade check, product preferences and how wedding-day makeup works here. No full makeup is applied. For: couples comparing makeup artists · weddings still in early planning',
      durationMinutes: 45,
      bufferAfterMinutes: 15,
      priceCents: 4500,
      priceFrom: false,
    },
    {
      name: 'Special Event Makeup',
      description:
        'Full makeup for a celebration — skin preparation, a polished base, eyes, brows and lips — in a finish that suits the occasion and the light it will be seen in. For: wedding guests · mothers of the couple · anniversaries and parties',
      durationMinutes: 75,
      bufferAfterMinutes: 15,
      priceCents: 11500,
      priceFrom: false,
    },
    {
      name: 'Evening Makeup',
      description:
        'A fuller look for an evening: deeper eyes, a defined brow and lip, and a base built to hold up under low light and flash. For: galas and formal dinners · black-tie weddings · evening parties',
      durationMinutes: 90,
      bufferAfterMinutes: 15,
      priceCents: 13500,
      priceFrom: false,
    },
    {
      name: 'Engagement & Portrait Makeup',
      description:
        'Makeup planned for the camera: skin that reads naturally in close-up, softly defined features and a finish chosen for your photographer’s light. For: engagement sessions · portraits and headshots · rehearsal dinners',
      durationMinutes: 90,
      bufferAfterMinutes: 15,
      priceCents: 13000,
      priceFrom: false,
    },
    {
      name: 'Natural Occasion Makeup',
      description:
        'A lighter, skin-first look that still looks like you, only rested: even skin, groomed brows, soft definition. For: graduations and ceremonies · interviews · a day when you want to feel put together',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 9000,
      priceFrom: false,
    },
  ],
} satisfies Preset;
