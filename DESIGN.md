# Design — "Soft Proof"

A makeup chair facing a north window, and the bridal trial as the **soft proof** of a wedding
look. In print, a soft proof is the version you check carefully — in true light, before the final
run — so that nothing surprises you on the day. That is exactly what a bridal trial is, and what a
careful makeup artist does in a north-lit room: north light stays soft and even all day, so the
shades seen in the chair are the shades a photographer and guests will see.

The design is built from that idea and nothing else: porcelain and satin surfaces, a calm editorial
layout where the faces lead, and one quiet ornament borrowed from the proof sheet — the **crop
mark**.

## Who it is for, and what they want to know

Someone planning wedding makeup, or makeup for an occasion, arrives with a handful of questions.
The page answers them in the order they are asked:

| They ask | The page answers |
|---|---|
| Does this artist do the style I want? Can I trust the detail? | The first portrait (natural skin, soft finish), then the **portfolio** — eight frames filterable by look, opened larger in a viewer. Honestly labelled as sample inspiration until the owner uploads their own work. |
| Can I try it before the wedding? What happens at a trial? | The first screen's **Book a bridal trial**, with the trial's real length and fee; **The bridal trial** with five steps and what to bring. |
| Does a trial reserve my wedding date? | Said on the first screen, on the trial's row, in a ruled box in the trial section, in the booking summary, on the confirmation, and in Good to know: **no**. |
| How is the wedding day arranged? | **Your wedding morning** — five steps on one line, ending with "nothing is final until I've confirmed it in writing", and an *Ask about your wedding date* email. |
| What does each appointment cost, and how long is it? | **Services & prices** — every length and fee comes from the booking engine; nothing is paid online. |
| Do you do other events? | **Events & occasions** — evening, engagement & portrait, special event, natural occasion. |
| Studio or my location? What do I bring? Allergies? | The studio section, the services' terms, the appointment's sensitivities note, Good to know. |

## The idea

- **Daylight, not glamour.** Porcelain pages and warm satin bands, like an ivory gown in shade; no
  gold, no black-and-gold luxury, no pink gradients, no glitter.
- **The face leads.** Large, square-cornered photographs with generous space around them; type
  never sits on a face.
- **One ornament: the crop mark.** Four fine L-shaped marks just outside a photograph's corners (the
  first portrait, the trial, the wedding morning, the appointment, the studio), and a single corner
  mark in each section label. Never on the portfolio grid (too busy there), never animated, never on
  text. No floating makeup icons, brush clip-art, lipstick prints or sparkles anywhere.
- **Honesty as a design element.** The boundary that matters most — a trial doesn't reserve the
  wedding date — gets the page's only ruled double-line box; sample imagery gets a plain bordered
  note, not small print.

## Colour

Tokens in `src/styles/tokens.css` (the only file with raw colours):

| Token | Value | Use |
|---|---|---|
| `--paper` | `#fbf8f5` porcelain | the page |
| `--raised` | `#ffffff` | the booking sheet, inputs, the trial row, the date box |
| `--oat` | `#f3ece6` satin | the trial and appointment bands, the inquiry card, the summary |
| `--ink` | `#2a1f23` kohl-plum | headings, figures — 15.4:1 on porcelain |
| `--ink-soft` / `--muted` | `#45373c` / `#6b5a5f` | body / small labels — ≥ 5.5:1 everywhere they sit |
| `--forest` (kohl) | `#2a1f24` | the booking sheet's header, the portfolio viewer, the footer |
| `--accent` | `#6b2d42` mulberry | **owner-editable** brand colour: buttons, italic highlights, selected choices, the booking band, the trial row's edge. Always carries white text (10.4:1); the editor refuses colours under 4.5:1 against white. |

The dashboard keeps its own design; `src/admin-theme.css` sets only its accent (mulberry with white
text in Light, a light rose with kohl text in Dark).

Rendered contrast audit (every visible text node, page and booking sheet, 1440 and 390): lowest
5.52:1.

## Type

- **Ibarra Real Nova** (Medium and Medium Italic) for headings, figures and captions — a refined
  book face with a calligraphic italic that suits the highlight words (*you,* *trial*, *morning*).
- **Mulish** (400/600/700) for everything else — soft, open and very readable at small sizes.
- The headline is large (up to 5.25 rem) with tight leading; the owner's `*asterisks*` set words in
  the italic, in the brand colour. A "Sans serif" heading style is available in the editor.
- Small labels are Mulish capitals with wide tracking and tabular figures.

## Photography

Fifteen frames by one photographer from two sessions, one shared grade (see `PHOTOS.md`). Upright
4:5 for portraits and details, tall 2:3 for the wedding morning and two portfolio frames, square
corners everywhere. Crops keep eyes, lips, hands and brushes whole. Every default frame is labelled
"Sample"; the portfolio is labelled "Sample imagery — illustrative makeup inspiration" and never
presented as client work.

## Layout

1. **First screen** — text left (eyebrow, headline, lede, *Book a bridal trial* + *Event makeup &
   prices*, the trial's proof line — length · fee · paid at the studio — the date line, today's
   hours), the portrait right in crop marks. Phones: the words and both buttons first (the main
   button sits inside the first screen at 320×568), then the portrait at full width. Without a
   portrait it becomes a typographic cover.
2. **01 Portfolio** — four columns with every second frame set lower (an editorial stagger), all
   frames 4:5 on desktop and tablet; a swipeable rail of large frames on phones (78% of the width,
   so faces stay big); filter chips by look; a kohl viewer with previous / next / arrow keys / Esc.
3. **02 Services & prices** — three facts; kinds in a sticky left column; rows with name, an honest
   flag where needed, description, "For", length and fee, Book. The trial row is set on white with
   the brand-colour edge.
4. **03 The bridal trial** (satin) — photo, text, large figures, ticks, Book; the ruled date box;
   five numbered steps; what to bring.
5. **04 Your wedding morning** — five steps on a fine vertical line (the last filled in mulberry),
   the inquiry card, a tall sticky photo.
6. **05 Your appointment** (satin) — a sticky photo, five steps, the sensitivities note.
7. **06 The studio** — text, three frames (the middle one lower), four facts.
8. **07 Good to know** — disclosure rows, the "Sample policies" label until edited.
9. **Book** (mulberry band) · **08 Visit** · **Footer** (kohl, owner login).

## Interaction

- Every Book button opens one booking sheet (a modal `<dialog>`, full screen on phones, a right
  sheet from 900 px); while booking is off it scrolls to the contact details instead.
- One-time entrance on the first screen; a slow 2% zoom on portfolio hover. Everything respects
  `prefers-reduced-motion`.
- 44 px minimum tap targets, visible focus rings (the brand colour on light, the light rose on kohl),
  no horizontal overflow from 320 px.
- The shared Live Demo dock steps aside for both dialogs (booking sheet and viewer).
