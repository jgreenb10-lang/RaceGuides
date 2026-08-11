# Moab 240 — Gear & Crew Checklist

A single-page planning site for the Moab 240 Endurance Run: gear checklist, aid station
chart, pace calculator, crew and pacer guides, nutrition planner, and travel logistics.

Built so friends, family, and crew can all pull it up on their phones.

## Tabs

| Tab | What it does |
| --- | --- |
| Overview | Key dates, course stats, award types, official links |
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

Checklists, nutrition settings, crew assignments, flights, and lodging are saved to
**your own browser** via `localStorage`. Nothing is uploaded and nothing is shared —
every visitor keeps a private copy, so the site can be public without exposing anyone's
confirmation numbers.

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

- **A public site is public.** `robots.txt` and `noindex` ask Google, Bing, and the major
  AI crawlers to stay away, and honest ones comply — that keeps the site out of search
  results. They are requests, not enforcement. Malicious scrapers ignore both, and anyone
  who has the URL can open it and read everything on it.
- **There is no password.** Anything hardcoded into this repo is readable by anyone who
  finds the URL or the repo, and stays in git history permanently. Only put information
  here that you would be comfortable posting publicly.
- **Real privacy requires not publishing the data.** Personal details belong in the
  `localStorage`-backed fields, not in the source.

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
