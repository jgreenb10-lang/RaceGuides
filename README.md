# Endurance Race Guides

Started as a single-page planning site for the Moab 240 Endurance Run and is growing into
a directory of every full-distance and 70.3 IRONMAN race in the U.S., plus the world's
toughest 100+ mile ultramarathons. Static site, no backend, hash-routed (`#/`, `#/moab240`,
...) so it works unchanged on GitHub Pages.

## Site map

- `#/` — searchable, filterable directory of all 51 races (`src/pages/Home.jsx`,
  data in `src/data/races.js`). Every race has a full interactive guide.
- `#/moab240` — the original Moab 240 toolkit (`src/GearChecklist.jsx`): gear checklist,
  aid station chart, pace calculator, crew and pacer guides, nutrition planner, and
  travel logistics. Built so friends, family, and crew can all pull it up on their phones.
- `#/western-states`, `#/hardrock-100`, … — the other 10 ultras, all rendered by one
  data-driven component (`src/components/UltraRaceProfile.jsx`). Each has an aid station
  chart with cut-offs, a cut-off calculator that projects from your current position, and
  a pacer-zone planner derived from wherever that race actually allows pacer swaps.
- `#/im-lake-placid`, `#/im703-oceanside`, … — all 40 US IRONMAN and IRONMAN 70.3 races
  (`src/components/TriathlonRaceProfile.jsx`). Different sport, different template: no
  pacers and no crew on course, so instead there is a wetsuit-legality calculator, the
  two transitions, drafting and penalty rules, and a gear list split by discipline.

### Two race templates, one rule

Adding a race is a data file plus one line in `src/App.jsx` — never another copy of a
component. Ultras live in `src/data/races/*.js`; the IRONMAN races are one table in
`src/data/races/ironman.js` because they share a structure.

Both templates are keyed by race id in `App.jsx`. That is not cosmetic: without the key
React reuses one component instance between races and the previous race's calculator
inputs bleed into the next one.

### Where the numbers come from

Every figure traces to the race's own website, with source URLs kept in each data file and
shown on the page. Where a race doesn't publish something, the field is left out rather
than estimated.

IRONMAN cut-off times are deliberately absent. IRONMAN sets them per event and publishes
them only in each event's Athlete Information Guide, so each profile links that guide
instead. A wrong cut-off is worse than no cut-off.

## Tabs

| Tab | What it does |
| --- | --- |
| Overview | Key dates, course stats, award types, official links |
| Training Plan | 52-week calendar counting down to race day, scaled to your own current and peak long-run mileage, with a note/complete tracker per week |
| Aid Stations | Cutoffs, drop bags, crew and pacer access for every station |
| Segments | Mileage, gain/loss, and terrain notes leg by leg |
| Pace Calculator | Projected splits and cutoff margin from your current position |
| Rules & Crew | Race rules, crew regulations, DNF procedure |
| Crew Guide | Assignable crew task list |
| Pacer Guide | Pacer eligibility and section notes |
| Gear | Mandatory and recommended gear with buy links |
| Nutrition | Carb/sodium targets and a race-day intake timeline |
| Flights | Your flight legs, plus every airport you can fly into from Chicago |
| Hotel | Base hotel details and your lodging reservations |

## Saved data

Checklists, nutrition settings, crew assignments, flights, lodging, and your training
plan (mileage targets, weekly notes, completed weeks) are saved to **your own browser**
via `localStorage`. Nothing is uploaded and nothing is shared — every visitor keeps a
private copy, so the site can be public without exposing anyone's confirmation numbers.

## Access

**There is no password.** Anyone with the link can open the site — that's deliberate, so
family and crew can use it without a login. The repository is public too, so the source is
readable at `github.com/jgreenb10-lang/RaceGuides` regardless.

That combination is fine because nothing sensitive is published: the site holds gear lists,
public race information, and a first-name-only itinerary. Personal details go in the
`localStorage`-backed fields, which never leave the visitor's own browser.

`robots.txt` and `noindex` keep the site out of search results, so in practice only people
you send the link to will find it.

## Security

This is a **static site**. There is no server, no database, no API, no login, and no
backend of any kind — GitHub Pages just hands out HTML, CSS, and JS over HTTPS. That
removes most of the categories of attack people worry about: there is no SQL to inject,
no session to hijack, no admin panel to brute-force, and no server-side code to exploit.

What's in place:

- **No data ever leaves your browser.** Checklists, flights, and reservations are written
  to `localStorage`. Nothing is transmitted, so there is no shared database to breach and
  no other visitor can see your entries.
- **No third-party code.** No analytics, no trackers, no ad networks, no external fonts
  or CDNs. Every asset is served from this origin.
- **Content Security Policy** (injected at build time by `vite.config.js`) restricts the
  page to its own assets and sets `connect-src 'none'`, so the page cannot phone home
  even if something were injected into it.
- **No XSS sinks.** No `dangerouslySetInnerHTML`, no `eval`, no `innerHTML`. React
  escapes all rendered text by default.
- **`rel="noopener noreferrer"`** on every outbound link, plus `referrer: no-referrer`
  so the URL isn't leaked to sites visitors click through to.
- **Anti-framing** via a check in `main.jsx` (CSP `frame-ancestors` is ignored in a meta
  tag, and GitHub Pages cannot send real headers).
- **Zero production dependency vulnerabilities** — verify with `npm audit --omit=dev`.

### What this does NOT do

Be clear-eyed about the limits:

- **`robots.txt` and `noindex` are requests, not enforcement.** Honest crawlers (Google,
  Bing, GPTBot, ClaudeBot) comply, which keeps the site out of search results. Malicious
  scrapers ignore both, and anyone with the URL can read everything on the page.
- **The repository is public.** Source is readable by anyone, and anything committed stays
  in git history permanently. Only put information in the source that you would be
  comfortable posting publicly.
- **Personal details belong in the `localStorage`-backed fields**, not hardcoded in the
  source. The shared itinerary in `RUNNER_ITINERARY` is deliberately first-name-only, with
  no seat or confirmation numbers.

## Local development

```bash
npm install
npm run dev
```

Then build for production with `npm run build` (output lands in `dist/`).

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes it to GitHub Pages. Enable it once under **Settings → Pages → Source →
GitHub Actions**.

`vite.config.js` sets `base: "./"` so the build works at any URL — a project page at
`/repo-name/`, a user page at the domain root, or a custom domain.

## Notes

Airline routes, distances, and hotel details were accurate when written but change over
time — confirm before booking. Race details come from the official Destination Trail
runner manual; the manual is the authority if anything here conflicts.
