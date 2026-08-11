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

## Password protection

The published site is **encrypted with StatiCrypt**. Visitors get a password prompt, and
the server only ever holds AES-encrypted content — an unauthenticated request, including
a scraper's, receives ciphertext and nothing else.

This is real protection, not a JavaScript `if (password === "...")` check. That common
pattern is worthless on a static host: the password and the entire page are already in
the visitor's browser before the check runs, so anyone can read both from View Source.

Two things make the encryption meaningful here:

1. `vite-plugin-singlefile` inlines all JS and CSS into `index.html`, so there are no
   separate `/assets/*.js` files left to fetch around the password prompt.
2. The deploy workflow greps the built file for known content and **fails the build** if
   any of it appears in plaintext, so the pipeline can't silently ship an unencrypted site.

### Setting or changing the password

The password lives only in a GitHub repository secret named `SITE_PASSWORD` — never in
this repo. Set it under **Settings → Secrets and variables → Actions**. Changing it and
re-running the deploy re-encrypts the site with the new password.

Build locally with:

```bash
STATICRYPT_PASSWORD='your-password' npm run build:encrypted
```

### Limits

- Everyone shares one password, so access can't be revoked per person. If it leaks, change
  the secret and redeploy.
- A weak password can be attacked offline once someone has the encrypted file. Use a long
  passphrase.
- "Remember me" stores a salted hash in the visitor's browser for 30 days, so family don't
  re-enter it constantly. That's a convenience/security tradeoff — drop `--remember 30`
  from the `encrypt` script to require it every visit.

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
  scrapers ignore both — the encryption, not the robots file, is what actually stops them.
- **The repository is public even though the site is encrypted.** Source is readable by
  anyone, and anything committed stays in git history permanently. Only put information in
  the source that you would be comfortable posting publicly. Make the repo private if that
  matters; Pages deploys fine either way.
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
