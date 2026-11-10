# Photographs

Fifteen frames from fifteen free photographs on Pexels, downloaded into the project (never
hot-linked), cropped for their one use, given one shared light grade and exported as AVIF +
WebP at three widths by the Soft Proof photo pipeline. **This starter ships only those processed
frames** — the original downloads and the pipeline script stay with the Niche Pack workspace
(`concepts/bridal-makeup-soft-proof/photo-pipeline/photos.mjs`), so the repository never
redistributes an unaltered copy. No image-generation tool was used: every face is a real
photograph with natural skin texture, and nothing in any frame is retouched or smoothed.

**One photographer, two sessions, one light.** All fifteen frames were published on Pexels by
**Reborn Filmes** ([@rebornfilmes](https://www.pexels.com/@rebornfilmes/)) and come from two
sessions shot with the same soft, warm-white daylight look:

- **a bridal getting-ready session** (Pexels ids 355386xx): a bride in an off-shoulder white
  gown with pearl earrings and a makeup artist in a cream bouclé jacket, in a plain white room
  with a tall oak mirror — the first screen, the trial, the wedding morning, your appointment and
  three portfolio frames;
- **a makeup-studio session** (ids 295880xx): a bright white studio with a long vanity of
  drawers, a lit mirror, brushes and a black chair, an artist in a white shirt and a client —
  four portfolio frames and the studio.

That gives the site one light and one kind of room instead of a collage of unrelated beauty
campaigns. Single frames from many photographers (glam ring-light shots, heavily retouched
close-ups, campaign-style portraits) were looked at and set aside.

The shared grade is a touch less saturation and slightly lifted, warm shadows, so the two
sessions sit together on the porcelain page.

They are the website's **defaults** (`src/content/site.ts`): the owner replaces each one in the
dashboard (Website). **They are not North Window's artist, clients, work or studio** (North
Window is fictional): the people did not visit the studio, are not named, and nothing implies
they endorse it. On the page:

- every photo carries a **"Sample"** label until the owner replaces that field;
- the portfolio says, above the frames and again in the viewer: **"Sample imagery — illustrative
  makeup inspiration.** These photographs are licensed stock images, not this studio's clients or
  its work, and no result is promised.";
- the studio section says the photographs show another makeup studio (and, in the Live Demo and
  preview, that the studio itself is fictional);
- captions describe the technique in the frame ("Pressing powder only where it's needed"), never
  a client, a wedding or a result; there are no before-and-after pairs, testimonials or names.

People are identifiable in most frames (the bride, the artists, the client). Alt texts only
describe what is in the frame.

**Brands.** A compact, an eyeshadow palette, brushes and a spray bottle appear; no cosmetic
brand name or logo is legible at the published sizes (checked at 1200 px). The Pexels License
covers the photographs, not any marks or works shown in them.

| Use (content field) | Files (`public/photos/`, `.avif` + `.webp`) | Source page | Photographer | Licence |
|---|---|---|---|---|
| First screen — a bride in profile, finished soft bridal makeup, pearl earrings (`hero.photo`, 4:5) | `hero-bride-{640,1000,1400}` | https://www.pexels.com/photo/elegant-woman-with-flower-shaped-earrings-smiling-35538640/ | Reborn Filmes | Pexels License |
| Portfolio 1 · Soft bridal — fastening an earring (`folio.photo1`, 4:5) | `folio-soft-bridal-{480,800,1200}` | https://www.pexels.com/photo/elegant-bride-preparing-for-wedding-day-35538638/ | Reborn Filmes | Pexels License |
| Portfolio 2 · Lips & finish — the artist applies lip colour (`folio.photo2`, 4:5) | `folio-lips-{480,800,1200}` | https://www.pexels.com/photo/bride-getting-ready-with-makeup-artist-s-help-35538642/ | Reborn Filmes | Pexels License |
| Portfolio 3 · Eyes & brows — a brow brush, close (`folio.photo3`, 4:5) | `folio-brows-{480,800,1200}` | https://www.pexels.com/photo/close-up-of-woman-receiving-eye-makeup-application-29588088/ | Reborn Filmes | Pexels License |
| Portfolio 4 · Soft bridal — the bride at the oak mirror (`folio.photo4`, 2:3) | `folio-mirror-{480,800,1200}` | https://www.pexels.com/photo/elegant-bride-reflects-in-mirror-before-ceremony-35538646/ | Reborn Filmes | Pexels License |
| Portfolio 5 · Skin — pressing powder under the eye (`folio.photo5`, 4:5) | `folio-skin-{480,800,1200}` | https://www.pexels.com/photo/professional-makeup-artist-applying-powder-29588102/ | Reborn Filmes | Pexels License |
| Portfolio 6 · Eyes & brows — eyeshadow from a palette (`folio.photo6`, 4:5) | `folio-eyes-{480,800,1200}` | https://www.pexels.com/photo/young-makeup-artist-applying-eyeshadow-indoors-29588086/ | Reborn Filmes | Pexels License |
| Portfolio 7 · Skin — blending at the brow and temple (`folio.photo7`, 4:5) | `folio-finish-{480,800,1200}` | https://www.pexels.com/photo/woman-receives-professional-makeup-application-29588093/ | Reborn Filmes | Pexels License |
| Portfolio 8 · Eyes & brows — the artist with a fine brush (`folio.photo8`, 2:3) | `folio-artistry-{480,800,1200}` | https://www.pexels.com/photo/professional-makeup-artist-applying-eyeshadow-29588100/ | Reborn Filmes | Pexels License |
| Bridal trial — the artist lines the bride's lips (`trial.photo`, 4:5) | `trial-lips-{480,800,1200}` | https://www.pexels.com/photo/makeup-artist-applying-lipstick-to-a-bride-35538643/ | Reborn Filmes | Pexels License |
| Wedding day — the artist settles the veil at the mirror (`wedding.photo`, 2:3) | `wedding-veil-{480,800,1200}` | https://www.pexels.com/photo/bridal-preparation-with-mirror-reflection-35538645/ | Reborn Filmes | Pexels License |
| Your appointment — artist and bride, a lip brush (`process.photo`, 4:5) | `process-lips-{480,800,1200}` | https://www.pexels.com/photo/elegant-bride-getting-makeup-applied-pre-ceremony-35538641/ | Reborn Filmes | Pexels License |
| The studio 1 — the white vanity with drawers (`studio.photo1`, 4:5) | `studio-vanity-{480,800,1200}` | https://www.pexels.com/photo/woman-applying-makeup-in-modern-vanity-room-29588087/ | Reborn Filmes | Pexels License |
| The studio 2 — the lit mirror and brushes (`studio.photo2`, 4:5) | `studio-mirror-{480,800,1200}` | https://www.pexels.com/photo/woman-reflecting-in-mirror-at-vanity-desk-29588091/ | Reborn Filmes | Pexels License |
| The studio 3 — three brushes in hand (`studio.photo3`, 4:5) | `studio-brushes-{480,800,1200}` | https://www.pexels.com/photo/woman-holding-makeup-brushes-in-modern-setting-29588094/ | Reborn Filmes | Pexels License |

Licence checked on each photo page on 2026-11-10 ("Free to use"). Originals were downloaded at
3200 px on the long side from `images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?w=3200`.

**Replacing them.** Upload your own in the dashboard → Website. **Only your own work, and only
with the written permission of the person photographed** — and never another artist's or a
brand's campaign images. Natural daylight and unretouched skin read best and are the most
honest. The first screen reads best as an upright portrait with space around the face; portfolio
frames can be upright or tall (each frame keeps its own look and caption, which the filter uses).
