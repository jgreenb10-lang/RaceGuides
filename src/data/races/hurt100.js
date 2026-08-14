/* ---------------- HURT 100 ----------------
   Five identical 20-mile laps above Honolulu. Cutoffs exist only on lap 5, so
   the first 80 miles have no intermediate time limits at all — the Race
   Director can still pull anyone judged unable to make the next closure.

   Every cutoff here falls on the SUNDAY after the Saturday 06:00 start, which
   is why each carries cutoffDayOffset: 1. Without it the 11:00 cutoff at mile
   80 would read as 5 hours elapsed instead of 29.

   Lap mile markers come from the official cut-off table (80 / 87 / 92.5 / 100
   on lap 5); earlier laps are the same 20-mile pattern repeated, which the
   Book of HURT states explicitly ("five identical 20-mile laps").

   Sources (retrieved 2026-08-13):
     Book of HURT 2027 ... https://hurt100.com/book-of-hurt-2027/
       — At a Glance, Cut-off Times / Aid Station Closures, Course Description,
         Rules IV (Pacers) and V (Crews)
*/

const LAP = (n, manoa, nuuanu, makiki, extra = {}) => [
  {
    name: `Mānoa (Lap ${n})`, mile: manoa, medical: true, dropBag: true,
    crew: "Yes (from 10am Sat)", pacerChange: manoa >= 60, ...(extra.manoa || {}),
  },
  {
    name: `Nu‘uanu (Lap ${n})`, mile: nuuanu, medical: true, dropBag: true,
    crew: "NO ACCESS", pacerChange: false, ...(extra.nuuanu || {}),
  },
  {
    name: `Makiki (Lap ${n})`, mile: makiki, medical: true, dropBag: true,
    crew: "Yes", pacerChange: makiki >= 60, ...(extra.makiki || {}),
  },
];

export const HURT_100 = {
  id: "hurt-100",
  name: "HURT 100",
  tagline: "Five 20-mile laps through the rainforest above Honolulu",
  accent: "#2E7D6B",
  officialUrl: "https://hurt100.com/",
  sourceUrl: "https://hurt100.com/book-of-hurt-2027/",

  distance: 100,
  elevationGain: 24500,
  elevationLoss: 24500,
  cutoffHours: 36,
  startLine: "Makiki, Honolulu, HI",
  finishLine: "Makiki, Honolulu, HI",
  startTimeLabel: "6:00 AM Saturday",
  finishDeadlineLabel: "6:00 PM Sunday (36 hours)",

  keyFacts: [
    ["Distance", "100 mi (5 × 20-mi laps)"],
    ["Elevation gain", "24,500 ft"],
    ["Elevation loss", "24,500 ft"],
    ["Time limit", "36 hours"],
    ["Surface", "99% single-track, 1% asphalt"],
    ["Stream crossings", "20 (4 per lap)"],
    ["Aid stations", "3 per lap"],
    ["Next edition", "Jan 16–17, 2027"],
  ],

  courseNotes:
    "Five identical 20-mile laps on trails linking the Mānoa, Makiki, and Nu‘uanu valleys, " +
    "in semi-tropical rainforest above Honolulu. Moderately packed soil generously " +
    "interspersed with roots, rocks, puddles, and mud wallows, on narrow trails through " +
    "forest, along exposed ridges, and past vertical embankments. Twenty stream crossings, " +
    "four per lap. Aid stations sit 5.2 to 7.4 miles apart: Makiki (start/finish, at the " +
    "Hawai‘i Nature Center), Mānoa (Paradise Park), and Nu‘uanu (Judd Trail trailhead).",

  extraColumns: [{ key: "lap", label: "Lap" }],

  aidStations: [
    ...LAP(1, 7, 12.5, 20),
    ...LAP(2, 27, 32.5, 40),
    ...LAP(3, 47, 52.5, 60),
    ...LAP(4, 67, 72.5, 80, { makiki: { cutoff: "11:00am", cutoffDayOffset: 1 } }),
    ...LAP(5, 87, 92.5, 100, {
      manoa: { cutoff: "1:30pm", cutoffDayOffset: 1 },
      nuuanu: { cutoff: "3:30pm", cutoffDayOffset: 1 },
      makiki: { cutoff: "6:00pm", cutoffDayOffset: 1 },
    }),
  ].map((s) => ({ ...s, lap: `L${Math.min(5, Math.floor((s.mile - 0.1) / 20) + 1)}` })),

  /* Pacing opens at 60 miles or 17:00 Saturday, whichever comes first, and may
     only begin at Mānoa or Makiki. Nu‘uanu is off-limits to pacers and crew
     entirely — showing up there can disqualify the runner. */
  pacerStartMile: 60,
  pacerStartStation: "Makiki (Lap 3)",
  pacerChangeStations: [
    "Makiki (Lap 3)",
    "Mānoa (Lap 4)",
    "Makiki (Lap 4)",
    "Mānoa (Lap 5)",
    "Makiki (Lap 5)",
  ],

  pacerRules: [
    "A pacer may join after 60 miles, or from 5:00 PM Saturday — whichever comes first.",
    "Pacers may only start at Mānoa or Makiki. NO pacer may start at Nu‘uanu, and showing up there can disqualify your runner.",
    "One pacer at a time, wearing the issued pacer bib, after signing a waiver.",
    "Pacers may take aid at the three official stations only.",
    "A pacer may help in the aid station but may not enter ahead of, or leave after, their runner to speed things up.",
    "If a pacer drops out of visual range longer than the course dictates, the runner may continue alone and the pacer must exit at the next aid station.",
    "A runner continuing alone may pick up their next pacer at the next allowable checkpoint.",
    "Race officials may remove any pacer judged unable to continue safely.",
  ],

  crewRules: [
    "NO crew, family, spectators, or friends at Nu‘uanu at any time — there is no access and it risks your runner's disqualification.",
    "On Saturday, crews are not allowed at Mānoa before 10:00 AM, to avoid crowding.",
    "Crew may support their runner and pacer only within 100 yards of an aid station, never on the course.",
    "Crew and families may not eat or drink aid station supplies.",
    "Park only in authorized areas, with all four wheels off the asphalt or risk ticketing and towing.",
    "Trailheads are notorious for vehicle break-ins — leave nothing valuable in the car.",
    "Drop bags for Mānoa and Nu‘uanu are collected only at Makiki before the start.",
  ],

  aidStationSupplies:
    "All three stations carry bottled water, an electrolyte drink, and carbonated beverages, " +
    "plus hot and cold food with vegetarian and vegan options. Runners must supply their own " +
    "gels, energy bars, electrolyte supplements, medications, sunscreen and lip balm, and " +
    "first-aid items like bandages and blister treatment. Qualified medical staff are at every " +
    "aid station, each within 5 miles of a major medical center.",

  notes: [
    "Cutoffs apply to lap 5 only (miles 80–100). The first 80 miles have no intermediate limits — but the Race Director may still pull anyone judged unable to reach the next closure in time.",
    "Aid stations close 15 minutes after their cutoff, or when the sweeps bring in the last runner.",
    "Entry requires 8 hours of volunteer trail work plus a 50-mile qualifying finish within the prior two years. Pacing or crewing does NOT count as trail work.",
    "Cell coverage ranges from adequate to none. Carrying a whistle is recommended for runners and pacers alike.",
    "If you get hurt or lost, stay put — it is a multi-lap out-and-back and someone will reach you. Wandering at night makes you harder to find.",
    "Trackers are for safety, not timing, and must be worn high on the body. Buried in a pack, they have lost runners before.",
  ],

  sources: [
    { label: "Book of HURT 2027 (full rules)", url: "https://hurt100.com/book-of-hurt-2027/" },
    { label: "Course map", url: "https://hurt100.com/course-map/" },
    { label: "HURT100 home", url: "https://hurt100.com/" },
  ],
};
