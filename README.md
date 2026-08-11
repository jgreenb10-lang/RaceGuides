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
