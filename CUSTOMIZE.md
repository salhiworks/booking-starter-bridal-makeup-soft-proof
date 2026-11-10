# Make this starter yours — the Claude Code prompt

Fill in the four lines at the top, then paste the whole prompt into a Claude Code session
opened in this folder. It changes identity and words only, so it finishes in one short
session.

```text
Customize this bridal & event makeup studio starter for my business.

Studio name: <YOUR STUDIO NAME>
City and area: <CITY, AREA>
Time zone (IANA): <e.g. America/Chicago>
What I offer, my style and my personality in a few words: <e.g. soft natural bridal makeup and evening looks, calm and reassuring>

Follow CLAUDE.md (already loaded in this session — no need to open it again).
Open and change only these files; don't explore the rest of the project:
1. src/site.config.ts — name, timezone, and fictional previewContact details in my city.
2. index.html and admin/index.html — the studio name, city and description in <title>,
   the meta description and the og tags.
3. src/content/site.ts — rewrite every DEFAULT text for my studio: the name mark and the line
   beside it, the line above the headline, headline, introduction, the line under the buttons,
   the portfolio intro and each frame's look and caption, the services intro, the three "How
   booking works" facts, the two kind notes, the note about prices, the trial texts (intro,
   facts, five steps, the "doesn't reserve your wedding date" box, what to bring), the wedding
   morning (intro, five steps, the "Ask about your wedding date" card), your appointment
   (steps, the allergies note), the studio text, captions and facts, Good to know answers (my
   real policies), the finding-us note and the search title and description. Keep field ids,
   types, limits and photos. Keep the sample photos (they stay labelled "Sample" until I upload
   my own). Headlines may set one or two words in italics using *asterisks* — keep that style.
   Keep the honesty rules: one booking is one studio appointment; a trial never reserves the
   wedding date; wedding mornings are arranged with me and confirmed in writing; nothing is
   paid online; allergies are discussed privately, never in the form; no lengths or fees
   written into the copy.
4. Only if mulberry clearly doesn't fit my brand (otherwise skip this step): change the
   default of brand.accent in src/content/site.ts (a deep colour that keeps white text at
   4.5:1 — deep rose, ink blue, olive, plum), the colours in src/admin-theme.css and the fill
   in public/favicon.svg.

Do not change the layout, the booking flow, src/lib/engine.ts, src/lib/preset.ts,
src/lib/services.ts, src/demo/, supabase/, booking-engine.lock.json or package.json.
Do not invent services, fees, opening hours, qualifications, years of experience, awards,
celebrity or real clients, reviews, testimonials, before-and-after results or product
guarantees — services, fees and hours are set in the dashboard. When done, run npm run build
and fix any error, then show me the result with npm run dev.
```

## After the prompt

- **Your services:** dashboard → Services. One booking is one appointment in your studio.
  - **Kinds.** The page sorts services by the words in their names: *bridal / bride /
    wedding / trial / consultation* → **Bridal**; *event / evening / engagement / occasion /
    portrait / headshot / glam / natural / makeup* → **Events & occasions**. Otherwise the
    description decides, then "More appointments".
  - **The trial.** A service with *Trial* in its name is found automatically: every "Book a
    bridal trial" button opens the booking with it chosen, and the hero and trial section show
    its current length and fee. **Renamed it without "Trial"?** Type its exact new name in
    Website → Bridal trial → *Your trial service*. Its row, summary and confirmation always say
    it doesn't reserve the wedding date. With no trial at all, the buttons simply say "Book an
    appointment".
  - **A consultation** (a name with *Consultation*) is labelled "A conversation — no full
    makeup". A fee of 0 shows as "Free".
  - **Fee** is for the appointment, paid at the studio. Leave *Starting price* off unless the
    fee really varies (the page then says "from" and that it is confirmed before the
    appointment).
  - **Length** is the time in the chair; the buffer after it is your time to clean brushes and
    reset the station.
  - **Wedding-day makeup** is best arranged personally. If you do add a bookable in-studio
    wedding-day appointment, name it with *Wedding Day* and give it its full real length: it is
    labelled "Confirmed with the artist first", and you still confirm every request yourself.
- **Who a service suits:** end its description with `For:` and the items separated by `·` —
  for example `For: wedding guests · anniversaries and parties`.
- **Your photographs:** dashboard → Website → Welcome (one upright 4:5 portrait — leave space
  around the face), Portfolio (eight frames, each with a look and a caption; visitors filter by
  look), Bridal trial (upright), Wedding day (tall), Your appointment (upright), The studio
  (three upright). Remove a photo to show the section without it. Each stays labelled
  "Sample" until you replace it. **Upload only your own work, with the written permission of
  the person photographed**, and never someone else's campaign or editorial images.
- **Policies:** Good to know is labelled "Sample policies" until you edit it — write your own
  rescheduling, lashes and wedding-day rules. Don't promise all-day wear, waterproof results or
  that a product suits everyone.
- **Wedding-day inquiries:** the "Email about your date" button opens an email to the address
  in Dashboard → Business with a short template (date, venue, ceremony time, where you'll get
  ready, who else needs makeup). Reply personally and confirm in writing.
- **About you:** add your name, training and experience in your own words — for example in the
  studio text. Only state what you can show.
- Connect real bookings: README.md, step 3.
