import { defineSiteContent } from '@profitstudio/booking-engine';

/**
 * What the owner may change in the dashboard (Website). The defaults are the
 * website's own copy and photos: until the owner publishes, the page shows
 * exactly these. Services, prices, durations, hours, the address, phone and
 * email are NOT here — they come from the engine.
 *
 * Never rename or reuse a field id once the site is live: the owner's text is
 * stored under it. Add a new id instead.
 *
 * This file is also imported by vite.config.ts (Node), so it imports nothing
 * local. Default photo `src` values are keys of src/content/photoVariants.ts.
 * The engine does not allow default images inside list fields, so every
 * portfolio and studio photo is its own image field.
 */
const MARK_HELP = 'Wrap a few words in *asterisks* to set them in italics, in your brand colour.';
const SAMPLE_HELP = 'A “Sample” label stays on it until you replace it with your own photo.';
const FOLIO_HELP =
  'Upload only your own work, with the permission of the person photographed. Until you replace it, this sample photo is labelled as illustrative inspiration, not client work.';

const STEP_FIELDS = [
  { type: 'text', id: 'title', label: 'Step', default: '', maxLength: 48, required: true },
  { type: 'longText', id: 'text', label: 'Detail', default: '', maxLength: 260, rows: 2 },
] as const;

type Img = { src: string; alt: string; width: number; height: number };
const P = (name: string, alt: string): Img => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 1000 });
const T = (name: string, alt: string): Img => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 1200 });

/** One portfolio frame: its photo, the look's name (used for the filter) and a short caption. */
function folio(n: number, look: string, caption: string, image: Img, ratio: number) {
  return [
    {
      type: 'image',
      id: `folio.photo${n}`,
      label: `Photo ${n}`,
      help: `${ratio === 2 / 3 ? 'Tall (2:3)' : 'Upright (4:5)'}. Remove it to show fewer. ${FOLIO_HELP}`,
      default: image,
      aspectRatio: ratio,
    },
    {
      type: 'text',
      id: `folio.look${n}`,
      label: `Photo ${n} — look`,
      help: 'A short name for the style. Photos with the same look are grouped by the filter above the portfolio.',
      default: look,
      maxLength: 24,
    },
    { type: 'text', id: `folio.caption${n}`, label: `Photo ${n} — caption`, default: caption, maxLength: 80 },
  ] as const;
}

export const siteContent = defineSiteContent({
  sections: [
    {
      id: 'brand',
      label: 'Brand',
      description: 'Your name mark or logo, the brand colour and the heading style.',
      fields: [
        {
          type: 'text',
          id: 'brand.wordmark',
          label: 'Name mark',
          help: 'The short name in the header and footer. One or two words read best.',
          default: 'North Window',
          maxLength: 22,
          required: true,
        },
        {
          type: 'text',
          id: 'brand.descriptor',
          label: 'Line beside the name mark',
          help: 'What you are, in a few words. Shown small beside the name in the header.',
          default: 'Bridal & event makeup',
          maxLength: 32,
        },
        {
          type: 'image',
          id: 'brand.logo',
          label: 'Logo',
          help: 'Optional. A wide, dark logo on a transparent background — the header is a warm white. It replaces the name mark in the header.',
          default: null,
          aspectRatio: 4,
        },
        {
          type: 'color',
          id: 'brand.accent',
          label: 'Brand colour',
          help: 'Used for the main buttons, highlighted words, selected choices and the booking band. Buttons carry white text, so pick a deep colour — mulberry, deep rose, ink blue, olive. Light colours are refused because white text would not read on them.',
          default: '#6b2d42',
          contrastWith: '#ffffff',
          minContrast: 4.5,
        },
        {
          type: 'choice',
          id: 'brand.headings',
          label: 'Heading style',
          default: 'serif',
          options: [
            { value: 'serif', label: 'Serif', description: 'Editorial headings with italic highlights — the original design.' },
            { value: 'sans', label: 'Sans serif', description: 'The same layout with plainer, more modern headings.' },
          ],
        },
      ],
    },
    {
      id: 'seo',
      label: 'Search & sharing',
      description: 'Search engines and link previews show new text after the website is next deployed.',
      fields: [
        {
          type: 'text',
          id: 'seo.title',
          label: 'Page title',
          help: 'Search engines and link previews show new text after the website is next deployed.',
          default: 'North Window Makeup Studio — bridal & event makeup in Richmond, VA',
          maxLength: 80,
          required: true,
        },
        {
          type: 'longText',
          id: 'seo.description',
          label: 'Page description',
          help: 'One or two sentences for search results. Updated after the next deploy.',
          default:
            'An independent makeup studio in Richmond, Virginia: bridal makeup trials and consultations, and makeup for engagements, evenings and special events. Book an appointment online.',
          maxLength: 180,
          rows: 3,
          required: true,
        },
      ],
    },
    {
      id: 'hero',
      label: 'Welcome',
      description: 'The first screen: the headline, the buttons, one portrait and one honest line about the bridal trial.',
      fields: [
        {
          type: 'text',
          id: 'hero.eyebrow',
          label: 'Small line above the headline',
          default: 'Bridal & event makeup · Richmond, Virginia',
          maxLength: 64,
        },
        {
          type: 'text',
          id: 'hero.title',
          label: 'Headline',
          help: MARK_HELP,
          default: 'Makeup that looks like *you,* in every light.',
          maxLength: 64,
          required: true,
        },
        {
          type: 'longText',
          id: 'hero.lede',
          label: 'Introduction',
          default:
            'An independent makeup studio for weddings and the occasions around them. One artist, one client in the chair at a time, and a north-facing window to check every shade in honest daylight.',
          maxLength: 300,
          rows: 3,
        },
        { type: 'text', id: 'hero.cta', label: 'Main button', help: 'Opens the booking with your bridal trial chosen.', default: 'Book a bridal trial', maxLength: 28, required: true },
        {
          type: 'text',
          id: 'hero.secondary',
          label: 'Second button',
          help: 'Leads to your services and prices. Leave empty to hide it.',
          default: 'Event makeup & prices',
          maxLength: 32,
        },
        {
          type: 'text',
          id: 'hero.note',
          label: 'One honest line under the buttons',
          help: 'Keep it true: a trial books the trial only. Leave empty to hide it.',
          default: 'A trial is its own appointment — your wedding date is confirmed with me separately.',
          maxLength: 110,
        },
        {
          type: 'image',
          id: 'hero.photo',
          label: 'Main portrait (upright)',
          help: `Upright (4:5) — a portrait with natural skin and the finished makeup reads best. Leave space around the face. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/hero-bride-1000.webp',
            alt: 'A bride in profile with soft, glowing bridal makeup, dark hair swept back, pearl drop earrings and a white off-shoulder neckline, smiling with her eyes closed.',
            width: 1000,
            height: 1250,
          },
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      description:
        'Eight photos with a look and a caption each. Visitors can filter by look and open a photo larger. The sample photos are labelled “Sample imagery — illustrative makeup inspiration” until you replace them; only add your own work, with permission.',
      fields: [
        { type: 'text', id: 'folio.title', label: 'Title', help: MARK_HELP, default: 'The work, in *daylight*', maxLength: 56, required: true },
        {
          type: 'longText',
          id: 'folio.intro',
          label: 'Introduction',
          default:
            'Soft bridal skin, defined eyes for an evening, a lip chosen for the dress. Every look starts from your features and the occasion — these frames show the kind of finish I work towards.',
          maxLength: 320,
          rows: 3,
        },
        ...folio(
          1,
          'Soft bridal',
          'Luminous skin, softly sculpted cheeks, a quiet lid',
          P('folio-soft-bridal', 'A bride with dark hair swept into a low knot fastens a pearl earring; her makeup is soft and luminous, with rosy cheeks and a natural lip.'),
          4 / 5,
        ),
        ...folio(
          2,
          'Lips & finish',
          'Lining and blending the lip before the dress goes on',
          P('folio-lips', 'A makeup artist smiles as she applies lip colour to a bride with a small brush, the bride’s face turned to her, pearl earrings catching the light.'),
          4 / 5,
        ),
        ...folio(
          3,
          'Eyes & brows',
          'Brows brushed up and set — shape first, then colour',
          P('folio-brows', 'Close up, a slanted brush shapes a woman’s eyebrow while she sits with her eyes closed in a bright white studio.'),
          4 / 5,
        ),
        ...folio(
          4,
          'Soft bridal',
          'A last look in the mirror before the ceremony',
          T('folio-mirror', 'A bride in an off-shoulder white gown studies her reflection in a tall oak mirror in a plain white room.'),
          2 / 3,
        ),
        ...folio(
          5,
          'Skin',
          'Pressing powder only where it’s needed',
          P('folio-skin', 'A makeup artist presses a sponge with powder under a client’s eye, holding a compact in her other hand; the client’s skin shows natural texture.'),
          4 / 5,
        ),
        ...folio(
          6,
          'Eyes & brows',
          'Building an evening eye from a warm palette',
          P('folio-eyes', 'A makeup artist holds an open eyeshadow palette and applies colour to the closed eyelid of a client reclining in the chair.'),
          4 / 5,
        ),
        ...folio(
          7,
          'Skin',
          'Blending at the hairline so nothing stops at an edge',
          P('folio-finish', 'A client in a black studio chair with her eyes closed while a makeup artist blends product along her brow and temple.'),
          4 / 5,
        ),
        ...folio(
          8,
          'Eyes & brows',
          'A fine brush and a steady hand for definition',
          T('folio-artistry', 'A smiling makeup artist in a white shirt holds a fine brush and a palette as she leans towards a client in a bright white studio.'),
          2 / 3,
        ),
      ],
    },
    {
      id: 'services',
      label: 'Services & prices',
      description:
        'Service names, lengths and prices come from Services in this dashboard. The page groups them by the words in their names: bridal, wedding, trial or consultation → Bridal; event, evening, engagement, occasion, portrait or makeup → Events & occasions. A service with “trial” in its name is treated as the bridal trial. End a description with “For:” and items separated by “·” to show who it suits.',
      fields: [
        { type: 'text', id: 'services.title', label: 'Title', help: MARK_HELP, default: 'Services & *prices*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'services.intro',
          label: 'Introduction',
          default: 'Every appointment is in the studio, one to one, and the fee covers the whole appointment — products and strip lashes included.',
          maxLength: 320,
          rows: 3,
        },
        {
          type: 'list',
          id: 'services.terms',
          label: 'How booking works',
          help: 'Three short facts shown above the list.',
          itemLabel: 'Fact',
          maxItems: 3,
          fields: [
            { type: 'text', id: 'title', label: 'Fact', default: '', maxLength: 44, required: true },
            { type: 'longText', id: 'text', label: 'Detail', default: '', maxLength: 200, rows: 2 },
          ],
          default: [
            {
              title: 'One booking, one appointment',
              text: 'Each booking reserves a single appointment in the studio at the time you choose — nothing more.',
            },
            {
              title: 'Wedding days, arranged personally',
              text: 'Wedding-day makeup isn’t booked online. We plan the date, timing and place together, and I confirm it in writing.',
            },
            {
              title: 'Paid at the studio',
              text: 'Fees are for the appointment and paid when you visit. Nothing is charged online.',
            },
          ],
        },
        {
          type: 'longText',
          id: 'services.noteBridal',
          label: 'Note beside “Bridal”',
          default: 'Start with a consultation if you’re still deciding, or go straight to a trial to design your look.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'services.noteEvent',
          label: 'Note beside “Events & occasions”',
          default: 'Full makeup on the day of your occasion, in the studio, in a finish chosen for where you’re going.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'services.priceNote',
          label: 'About prices',
          help: 'Shown under the list. Keep it honest: nothing is paid online, and booking reserves one appointment.',
          default:
            'Fees are paid at the studio by card or cash — nothing is charged when you book. Wedding-day makeup is quoted separately once we know the date, the timing, where you’re getting ready and how many people need makeup.',
          maxLength: 480,
          rows: 4,
        },
      ],
    },
    {
      id: 'trial',
      label: 'Bridal trial',
      description:
        'What a bridal trial is, what happens in it, and the most important line on the page: a trial does not reserve the wedding date. The length and fee shown come from your trial in Services (the first service whose name says trial).',
      fields: [
        { type: 'text', id: 'trial.title', label: 'Title', help: MARK_HELP, default: 'The bridal *trial*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'trial.intro',
          label: 'Introduction',
          default:
            'A trial is a full makeup appointment — the soft proof of your wedding look. We talk it through, try it on your skin, adjust it until it feels like you, and look at it in daylight and in photos. You leave wearing it, so you can see how it feels over an afternoon.',
          maxLength: 400,
          rows: 4,
        },
        {
          type: 'list',
          id: 'trial.facts',
          label: 'In short',
          help: 'Short facts beside the length and fee.',
          itemLabel: 'Fact',
          maxItems: 4,
          fields: [{ type: 'text', id: 'text', label: 'Fact', default: '', maxLength: 64, required: true }],
          default: [
            { text: 'Best two to four months before the wedding' },
            { text: 'Bring the inspiration you love, and what you don’t' },
            { text: 'One look, refined — not a parade of options' },
            { text: 'A written note of every product and shade' },
          ],
        },
        {
          type: 'list',
          id: 'trial.steps',
          label: 'What happens at your trial',
          itemLabel: 'Step',
          maxItems: 5,
          fields: STEP_FIELDS,
          default: [
            { title: 'Talk it through', text: 'Your dress, the venue, the time of day, your photographer’s style and how you usually wear makeup.' },
            { title: 'Look at your references', text: 'The images you’ve saved — and what you like in each one: the skin, the eye, the lip, or just the feeling.' },
            { title: 'Prepare and test', text: 'Skin preparation, then base, eyes, brows and lips, testing finishes and shades as we go.' },
            { title: 'Adjust together', text: 'Softer here, more definition there. We look in the window light and take a few photos with flash.' },
            { title: 'Plan the next step', text: 'If you’d like me for the wedding, we talk about the date, the timing and where you’ll get ready.' },
          ],
        },
        {
          type: 'text',
          id: 'trial.boundaryTitle',
          label: 'The date line — title',
          help: 'Set apart in a box. Keep its meaning: booking a trial does not reserve the wedding date.',
          default: 'A trial doesn’t reserve your wedding date',
          maxLength: 64,
          required: true,
        },
        {
          type: 'longText',
          id: 'trial.boundaryText',
          label: 'The date line — text',
          default:
            'Booking a trial reserves the trial appointment only. Wedding-day makeup is a separate arrangement: I check that I’m free on your date, agree the timing, place and fee with you, and confirm it in writing. If your date matters most, ask about it before you book the trial.',
          maxLength: 420,
          rows: 4,
          required: true,
        },
        {
          type: 'longText',
          id: 'trial.bring',
          label: 'What to bring',
          default:
            'A clean, moisturised face if you can, a few inspiration photos, a photo of the dress, and something with a similar neckline to wear. Your own lipstick or perfume if you’d like to keep them in the look.',
          maxLength: 300,
          rows: 3,
        },
        {
          type: 'text',
          id: 'trial.service',
          label: 'Your trial service (only if renamed)',
          help: 'Leave empty if your trial’s name in Services contains the word “Trial”. If you rename it (for example “Bridal Preview”), type its exact new name here, so “Book a bridal trial” still opens it and the page keeps showing its length and fee. If no trial is found, the buttons offer “Book an appointment” instead.',
          default: '',
          maxLength: 120,
        },
        {
          type: 'image',
          id: 'trial.photo',
          label: 'Photo (upright)',
          help: `Upright (4:5) — a moment of application reads best. ${SAMPLE_HELP}`,
          default: P(
            'trial-lips',
            'A makeup artist in a cream jacket concentrates as she lines a bride’s lips with a small brush; the bride, in pearl earrings, holds still.',
          ),
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'wedding',
      label: 'Wedding day',
      description: 'How wedding-day makeup is arranged — personally, not through online booking — and the button visitors use to ask about a date.',
      fields: [
        { type: 'text', id: 'wedding.title', label: 'Title', help: MARK_HELP, default: 'Your wedding *morning*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'wedding.intro',
          label: 'Introduction',
          default:
            'Wedding-day makeup depends on things a calendar can’t know: how early you start, where you’re getting ready, and who else would like makeup. So I arrange it with you personally, and nothing is final until I’ve confirmed it in writing.',
          maxLength: 400,
          rows: 4,
        },
        {
          type: 'list',
          id: 'wedding.steps',
          label: 'How it’s arranged',
          itemLabel: 'Step',
          maxItems: 5,
          fields: STEP_FIELDS,
          default: [
            { title: 'Book a consultation or a trial', text: 'So we can meet, and you can see how I work on your own skin.' },
            { title: 'Tell me the date and the place', text: 'Where you’re getting ready, what time the ceremony starts, and when photos begin.' },
            { title: 'Agree the look and the practicalities', text: 'The finished look, touch-ups, and whether anyone else would like makeup.' },
            { title: 'I confirm availability, scope and fee', text: 'In writing, with the timing for the morning — directly from me, not from the booking system.' },
            { title: 'Your wedding morning is set', text: 'Only once we’ve both agreed the details. Until then, the date isn’t held.' },
          ],
        },
        { type: 'text', id: 'wedding.askTitle', label: 'Ask about a date — title', default: 'Ask about your wedding date', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'wedding.askText',
          label: 'Ask about a date — text',
          help: 'Shown beside the button that opens an email to you (or your phone number if you have no email).',
          default: 'Send me your date, the town or venue and the time of the ceremony. I’ll tell you honestly whether I’m free and what the morning could look like.',
          maxLength: 300,
          rows: 3,
        },
        { type: 'text', id: 'wedding.askButton', label: 'Ask about a date — button', default: 'Email about your date', maxLength: 32, required: true },
        {
          type: 'image',
          id: 'wedding.photo',
          label: 'Photo (tall)',
          help: `Tall (2:3) — a quiet getting-ready moment reads best. ${SAMPLE_HELP}`,
          default: T(
            'wedding-veil',
            'A makeup artist in a cream jacket settles a bride’s veil from behind as the bride in a white gown faces a tall oak mirror.',
          ),
          aspectRatio: 2 / 3,
        },
      ],
    },
    {
      id: 'process',
      label: 'Your appointment',
      description: 'How any appointment goes, from inspiration to the finished look, and how product sensitivities are handled.',
      fields: [
        { type: 'text', id: 'process.title', label: 'Title', help: MARK_HELP, default: 'From inspiration to *finished look*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'process.intro',
          label: 'Introduction',
          default: 'Every appointment follows the same calm order, whether it’s a trial, an evening look or makeup for photos.',
          maxLength: 260,
          rows: 2,
        },
        {
          type: 'list',
          id: 'process.steps',
          label: 'Steps',
          itemLabel: 'Step',
          maxItems: 5,
          fields: STEP_FIELDS,
          default: [
            { title: 'Share your inspiration', text: 'Photos, a colour, a word — or nothing at all. Tell me in your booking note or when you arrive.' },
            { title: 'Talk about the occasion', text: 'Where you’re going, what you’re wearing, the light, and how long the makeup needs to last.' },
            { title: 'Choose the finish', text: 'Dewy or soft-matte skin, how much definition, which details matter most to you.' },
            { title: 'The application', text: 'Unhurried and explained as I go, with a mirror whenever you want one.' },
            { title: 'Review it together', text: 'We look in daylight, adjust anything that isn’t quite you, and talk about touch-ups for later.' },
          ],
        },
        {
          type: 'longText',
          id: 'process.care',
          label: 'Product sensitivities',
          help: 'Keep it practical. The booking form is not a health questionnaire — never ask visitors for medical details on the website.',
          default:
            'If you have allergies or sensitive skin, or a product has bothered you before, please call or email me before your appointment so we can talk about it privately. I can tell you what I use, and you’re welcome to bring products you know suit you.',
          maxLength: 420,
          rows: 4,
        },
        {
          type: 'image',
          id: 'process.photo',
          label: 'Photo (upright)',
          help: `Upright (4:5). ${SAMPLE_HELP}`,
          default: P(
            'process-lips',
            'A makeup artist with her hair in a ponytail applies lip colour to a smiling bride in an off-shoulder white gown, in a plain white room.',
          ),
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'studio',
      label: 'The studio',
      description: 'Where appointments happen: a few paragraphs, three photos and what the studio has. Each sample photo carries a “Sample” label until you replace it.',
      fields: [
        { type: 'text', id: 'studio.title', label: 'Title', help: MARK_HELP, default: 'A quiet room with a *north window*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'studio.text',
          label: 'Text',
          default:
            'The studio is one bright room up a short flight of stairs on West Main Street: a makeup chair facing a tall north-facing window, a lit mirror, and space for someone you’d like to bring along.\n\nNorth light stays soft and even all day, so the shades you see in the chair are the shades your guests and your photographer will see.',
          maxLength: 900,
          rows: 6,
        },
        {
          type: 'image',
          id: 'studio.photo1',
          label: 'Photo 1 (upright)',
          help: `Upright (4:5). Remove it to show fewer. ${SAMPLE_HELP}`,
          default: P('studio-vanity', 'A bright white makeup studio with a long vanity of white drawers, a large mirror, a black chair and a few green plants.'),
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'studio.caption1', label: 'Caption 1', default: 'The station, cleaned and reset after every client', maxLength: 64 },
        {
          type: 'image',
          id: 'studio.photo2',
          label: 'Photo 2 (upright)',
          help: `Upright (4:5). Remove it to show fewer. ${SAMPLE_HELP}`,
          default: P('studio-mirror', 'A large lit mirror above a white desk with brushes in a cup, reflecting a woman leaning on the desk in a white studio.'),
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'studio.caption2', label: 'Caption 2', default: 'A lit mirror for detail, the window for truth', maxLength: 64 },
        {
          type: 'image',
          id: 'studio.photo3',
          label: 'Photo 3 (upright)',
          help: `Upright (4:5). Remove it to show fewer. ${SAMPLE_HELP}`,
          default: P('studio-brushes', 'A hand holds three makeup brushes — a dense round brush, a fan brush and a soft powder brush — towards the camera in a white room.'),
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'studio.caption3', label: 'Caption 3', default: 'Brushes washed between every appointment', maxLength: 64 },
        {
          type: 'list',
          id: 'studio.facts',
          label: 'In the studio',
          itemLabel: 'Fact',
          maxItems: 6,
          fields: [
            { type: 'text', id: 'title', label: 'Fact', default: '', maxLength: 48, required: true },
            { type: 'text', id: 'text', label: 'Detail', default: '', maxLength: 110 },
          ],
          default: [
            { title: 'One client at a time', text: 'No one else in the chair, no one waiting beside you.' },
            { title: 'A seat for a guest', text: 'Bring your mother, a friend or your maid of honour.' },
            { title: 'Clean tools, every time', text: 'Brushes washed and sponges replaced between appointments.' },
            { title: 'In the studio only', text: 'Online bookings are studio appointments; wedding mornings are arranged separately.' },
          ],
        },
      ],
    },
    {
      id: 'goodToKnow',
      label: 'Good to know',
      description: 'Practical answers before an appointment. These are sample policies — make them yours.',
      fields: [
        { type: 'text', id: 'faq.title', label: 'Title', help: MARK_HELP, default: 'Good to *know*', maxLength: 48, required: true },
        {
          type: 'list',
          id: 'faq.items',
          label: 'Questions',
          itemLabel: 'Question',
          maxItems: 14,
          fields: [
            { type: 'text', id: 'question', label: 'Question', default: '', maxLength: 120, required: true },
            { type: 'longText', id: 'answer', label: 'Answer', default: '', maxLength: 600, rows: 4 },
          ],
          default: [
            {
              question: 'What is a bridal trial?',
              answer:
                'A full makeup appointment to design and test your wedding look before the day: we talk about the wedding, look at your inspiration, try the makeup on your skin and adjust it together. Its length and fee are listed under Services & prices.',
            },
            {
              question: 'Does booking a trial reserve my wedding date?',
              answer:
                'No. A trial reserves the trial appointment only. Wedding-day makeup is arranged separately: I check my availability for your date, agree the timing, place and fee with you, and confirm it in writing. If you’re worried about your date, ask me about it first.',
            },
            {
              question: 'How are wedding-day bookings confirmed?',
              answer:
                'Personally, by email — not through the online booking. Once we’ve agreed the date, the start time, where you’re getting ready and who needs makeup, I send you the details in writing. Until then, the date isn’t held.',
            },
            {
              question: 'Can I book makeup for an event that isn’t a wedding?',
              answer: 'Yes — evenings, galas, engagement photos, graduations, interviews and other occasions. Choose the service that fits under Services & prices and book a time.',
            },
            {
              question: 'How long will my appointment take?',
              answer: 'Each service shows its length, which is the time you’ll spend in the chair. Please arrive five minutes early so we can start on time.',
            },
            {
              question: 'Should I bring inspiration photos?',
              answer:
                'Please do — saved on your phone is perfect. Bring a photo of your outfit too. If you’re not sure what you want, that’s fine: we’ll find it together.',
            },
            {
              question: 'Should I arrive without makeup?',
              answer:
                'Ideally, yes: a clean face with your usual moisturiser and lip balm. If you’re coming from work, I’ll gently remove your makeup before we start.',
            },
            {
              question: 'Can I ask for a particular style?',
              answer:
                'Of course. Tell me in your booking note or when you arrive. I’ll be honest about what will work for your skin, the occasion and the light — and suggest adjustments if something might not.',
            },
            {
              question: 'Is makeup done in the studio or on location?',
              answer:
                'Every appointment you book online takes place in the studio. Getting-ready makeup at your home or venue is only for weddings, and it’s arranged personally once I’ve confirmed your date.',
            },
            {
              question: 'Are false eyelashes included?',
              answer: 'Strip lashes are included if you’d like them, and we try them at your trial. Lash extensions and lash lifts are not offered.',
            },
            {
              question: 'What if I need to reschedule?',
              answer:
                'Please call or email at least 48 hours before your appointment and we’ll find another time. The booking system doesn’t move appointments by itself — I’ll change it for you.',
            },
            {
              question: 'How should I tell you about allergies or sensitive skin?',
              answer:
                'Please call or email me before your appointment so we can talk about it privately — not in the booking form. I can share what I use, and you’re welcome to bring products you know suit you. I can’t promise any product will suit everyone, so if something feels wrong during the appointment, tell me straight away.',
            },
          ],
        },
      ],
    },
    {
      id: 'book',
      label: 'Booking',
      description: 'The words around the booking. Times and availability come from the engine.',
      fields: [
        { type: 'text', id: 'book.title', label: 'Title', help: MARK_HELP, default: 'Book an *appointment*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'book.intro',
          label: 'Introduction',
          default: 'Choose a bridal trial, a consultation or makeup for your event, then a time. No account needed — I read your note before I confirm.',
          maxLength: 280,
          rows: 2,
        },
      ],
    },
    {
      id: 'visit',
      label: 'Visit',
      description: 'Opening hours, the address, phone and email come from your business settings and opening hours.',
      fields: [
        { type: 'text', id: 'visit.title', label: 'Title', help: MARK_HELP, default: 'Visit the *studio*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'visit.note',
          label: 'Finding us',
          default:
            'On West Main Street in the Fan, between the bakery and the frame shop. Ring the bell for Suite 3 — the studio is up one short flight of stairs (if stairs are difficult, tell me before your appointment). Street parking is free for two hours nearby. Please arrive a few minutes early.',
          maxLength: 500,
          rows: 4,
        },
      ],
    },
    {
      id: 'footer',
      label: 'Footer',
      fields: [
        {
          type: 'text',
          id: 'footer.tagline',
          label: 'Footer line',
          default: 'Bridal trials, consultations and event makeup — an independent studio in Richmond, Virginia.',
          maxLength: 100,
        },
      ],
    },
  ],
});
