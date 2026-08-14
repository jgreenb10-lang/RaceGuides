/* ---------------- MASTER RACE DIRECTORY ----------------
   Every race here was verified against at least one primary source (the race's
   own website or registration platform) and, for the 2026 IRONMAN calendar,
   cross-checked against IRONMAN's official 2026 North American schedule release
   (reported by SportsTravel) plus independent spot-checks that caught and fixed
   several errors in secondary sources along the way. Dates change — always
   confirm on the official site linked below before booking travel or registering.

   sport: "ironman-full" | "ironman-703" | "ultra"
   profileStatus: "deep" (full interactive race guide, like the Moab 240 page)
                 | "directory-only" (verified facts + official link; deep guide not built yet)
*/

// US Census Bureau's four-region breakdown — a real, standard classification,
// not something invented for this site.
const REGION_BY_STATE = {
  CT: "Northeast", ME: "Northeast", MA: "Northeast", NH: "Northeast", RI: "Northeast",
  VT: "Northeast", NJ: "Northeast", NY: "Northeast", PA: "Northeast",
  IL: "Midwest", IN: "Midwest", MI: "Midwest", OH: "Midwest", WI: "Midwest",
  IA: "Midwest", KS: "Midwest", MN: "Midwest", MO: "Midwest", NE: "Midwest",
  ND: "Midwest", SD: "Midwest",
  DE: "South", FL: "South", GA: "South", MD: "South", NC: "South", SC: "South",
  VA: "South", DC: "South", WV: "South", AL: "South", KY: "South", MS: "South",
  TN: "South", AR: "South", LA: "South", OK: "South", TX: "South",
  AZ: "West", CO: "West", ID: "West", MT: "West", NV: "West", NM: "West",
  UT: "West", WY: "West", AK: "West", CA: "West", HI: "West", OR: "West", WA: "West",
};

function usRace(fields) {
  return { country: "USA", region: REGION_BY_STATE[fields.state] || "Other", ...fields };
}

export const IRONMAN_FULL_RACES = [
  usRace({ id: "im-texas", name: "IRONMAN Texas", sport: "ironman-full", date: "2026-04-18", dateLabel: "April 18, 2026", city: "The Woodlands", state: "TX", distanceLabel: "140.6 mi (2.4mi swim / 112mi bike / 26.2mi run)", officialUrl: "https://www.ironman.com/im-texas", profileStatus: "directory-only" }),
  usRace({ id: "im-jacksonville", name: "IRONMAN Jacksonville", sport: "ironman-full", date: "2026-05-16", dateLabel: "May 16, 2026", city: "Jacksonville", state: "FL", distanceLabel: "140.6 mi (2.4mi swim / 112mi bike / 26.2mi run)", officialUrl: "https://www.ironman.com/im-jacksonville", profileStatus: "directory-only" }),
  usRace({ id: "im-lake-placid", name: "IRONMAN Lake Placid", sport: "ironman-full", date: "2026-07-19", dateLabel: "July 19, 2026", city: "Lake Placid", state: "NY", distanceLabel: "140.6 mi (2.4mi swim / 112mi bike / 26.2mi run)", officialUrl: "https://www.ironman.com/im-lake-placid", profileStatus: "directory-only" }),
  usRace({ id: "im-wisconsin", name: "IRONMAN Wisconsin", sport: "ironman-full", date: "2026-09-13", dateLabel: "September 13, 2026", city: "Madison", state: "WI", distanceLabel: "140.6 mi (2.4mi swim / 112mi bike / 26.2mi run)", officialUrl: "https://www.ironman.com/im-wisconsin", profileStatus: "directory-only" }),
  usRace({ id: "im-maryland", name: "IRONMAN Maryland", sport: "ironman-full", date: "2026-09-19", dateLabel: "September 19, 2026", city: "Cambridge", state: "MD", distanceLabel: "140.6 mi (2.4mi swim / 112mi bike / 26.2mi run)", officialUrl: "https://www.ironman.com/im-maryland", profileStatus: "directory-only" }),
  usRace({ id: "im-chattanooga", name: "IRONMAN Chattanooga", sport: "ironman-full", date: "2026-09-27", dateLabel: "September 27, 2026", city: "Chattanooga", state: "TN", distanceLabel: "140.6 mi (2.4mi swim / 112mi bike / 26.2mi run)", officialUrl: "https://www.ironman.com/im-chattanooga", profileStatus: "directory-only" }),
  usRace({ id: "im-world-championship", name: "IRONMAN World Championship", sport: "ironman-full", date: "2026-10-10", dateLabel: "October 10, 2026", city: "Kailua-Kona", state: "HI", distanceLabel: "140.6 mi (2.4mi swim / 112mi bike / 26.2mi run)", officialUrl: "https://www.ironman.com/im-world-championship-kona", profileStatus: "directory-only", note: "Qualification-only (or legacy/lottery slots) — not an open-entry race like the others." }),
  usRace({ id: "im-california", name: "IRONMAN California", sport: "ironman-full", date: "2026-10-18", dateLabel: "October 18, 2026", city: "Sacramento", state: "CA", distanceLabel: "140.6 mi (2.4mi swim / 112mi bike / 26.2mi run)", officialUrl: "https://www.ironman.com/im-california", profileStatus: "directory-only" }),
  usRace({ id: "im-florida", name: "IRONMAN Florida", sport: "ironman-full", date: "2026-10-31", dateLabel: "October 31, 2026", city: "Panama City Beach", state: "FL", distanceLabel: "140.6 mi (2.4mi swim / 112mi bike / 26.2mi run)", officialUrl: "https://www.ironman.com/im-florida", profileStatus: "directory-only" }),
];

export const IRONMAN_703_RACES = [
  usRace({ id: "im703-dallas-little-elm", name: "IRONMAN 70.3 Dallas-Little Elm", sport: "ironman-703", date: "2026-03-15", dateLabel: "March 15, 2026", city: "Little Elm", state: "TX", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-dallas-little-elm", profileStatus: "directory-only" }),
  usRace({ id: "im703-oceanside", name: "IRONMAN 70.3 Oceanside", sport: "ironman-703", date: "2026-03-28", dateLabel: "March 28, 2026", city: "Oceanside", state: "CA", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-oceanside", profileStatus: "directory-only" }),
  usRace({ id: "im703-texas", name: "IRONMAN 70.3 Texas", sport: "ironman-703", date: "2026-03-29", dateLabel: "March 29, 2026", city: "Galveston", state: "TX", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-texas", profileStatus: "directory-only" }),
  usRace({ id: "im703-gulf-coast", name: "IRONMAN 70.3 Gulf Coast", sport: "ironman-703", date: "2026-05-09", dateLabel: "May 9, 2026", city: "Panama City Beach", state: "FL", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-gulf-coast", profileStatus: "directory-only" }),
  usRace({ id: "im703-chattanooga", name: "IRONMAN 70.3 Chattanooga", sport: "ironman-703", date: "2026-05-17", dateLabel: "May 17, 2026", city: "Chattanooga", state: "TN", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-chattanooga", profileStatus: "directory-only" }),
  usRace({ id: "im703-hawaii", name: "IRONMAN 70.3 Hawai'i", sport: "ironman-703", date: "2026-05-30", dateLabel: "May 30, 2026", city: "Kohala Coast", state: "HI", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-hawaii", profileStatus: "directory-only" }),
  usRace({ id: "im703-western-massachusetts", name: "IRONMAN 70.3 Western Massachusetts", sport: "ironman-703", date: "2026-06-07", dateLabel: "June 7, 2026", city: "Springfield", state: "MA", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-western-massachusetts", profileStatus: "directory-only" }),
  usRace({ id: "im703-omaha", name: "IRONMAN 70.3 Omaha", sport: "ironman-703", date: "2026-06-07", dateLabel: "June 7, 2026", city: "Omaha", state: "NE", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-omaha", profileStatus: "directory-only" }),
  usRace({ id: "im703-boulder", name: "IRONMAN 70.3 Boulder", sport: "ironman-703", date: "2026-06-13", dateLabel: "June 13, 2026", city: "Boulder", state: "CO", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-boulder", profileStatus: "directory-only" }),
  usRace({ id: "im703-pennsylvania", name: "IRONMAN 70.3 Pennsylvania Happy Valley", sport: "ironman-703", date: "2026-06-14", dateLabel: "June 14, 2026", city: "State College", state: "PA", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-pennsylvania", profileStatus: "directory-only" }),
  usRace({ id: "im703-eagleman", name: "IRONMAN 70.3 Eagleman", sport: "ironman-703", date: "2026-06-14", dateLabel: "June 14, 2026", city: "Cambridge", state: "MD", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-eagleman", profileStatus: "directory-only" }),
  usRace({ id: "im703-rockford-illinois", name: "IRONMAN 70.3 Rockford-Illinois", sport: "ironman-703", date: "2026-06-14", dateLabel: "June 14, 2026", city: "Rockford", state: "IL", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-rockford-illinois", profileStatus: "directory-only" }),
  usRace({ id: "im703-coeur-dalene", name: "IRONMAN 70.3 Coeur d'Alene", sport: "ironman-703", date: "2026-06-21", dateLabel: "June 21, 2026", city: "Coeur d'Alene", state: "ID", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-coeur-dalene", profileStatus: "directory-only" }),
  usRace({ id: "im703-muncie", name: "IRONMAN 70.3 Muncie", sport: "ironman-703", date: "2026-07-11", dateLabel: "July 11, 2026", city: "Muncie", state: "IN", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-muncie", profileStatus: "directory-only" }),
  usRace({ id: "im703-musselman", name: "IRONMAN 70.3 Musselman", sport: "ironman-703", date: "2026-07-12", dateLabel: "July 12, 2026", city: "Geneva", state: "NY", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-musselman", profileStatus: "directory-only" }),
  usRace({ id: "im703-new-mexico", name: "IRONMAN 70.3 New Mexico – Ruidoso", sport: "ironman-703", date: "2026-07-12", dateLabel: "July 12, 2026", city: "Ruidoso", state: "NM", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-ruidoso-new-mexico", profileStatus: "directory-only" }),
  usRace({ id: "im703-oregon", name: "IRONMAN 70.3 Oregon", sport: "ironman-703", date: "2026-07-19", dateLabel: "July 19, 2026", city: "Salem", state: "OR", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-oregon", profileStatus: "directory-only" }),
  usRace({ id: "im703-ohio", name: "IRONMAN 70.3 Ohio", sport: "ironman-703", date: "2026-07-19", dateLabel: "July 19, 2026", city: "Sandusky", state: "OH", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-ohio", profileStatus: "directory-only" }),
  usRace({ id: "im703-boise", name: "IRONMAN 70.3 Boise", sport: "ironman-703", date: "2026-07-25", dateLabel: "July 25, 2026", city: "Boise", state: "ID", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-boise", profileStatus: "directory-only" }),
  usRace({ id: "im703-maine", name: "IRONMAN 70.3 Maine", sport: "ironman-703", date: "2026-07-26", dateLabel: "July 26, 2026", city: "Augusta", state: "ME", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-maine", profileStatus: "directory-only" }),
  usRace({ id: "im703-northern-california", name: "IRONMAN 70.3 Northern California", sport: "ironman-703", date: "2026-08-16", dateLabel: "August 16, 2026", city: "Redding", state: "CA", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-northern-california", profileStatus: "directory-only", note: "New for 2026 — debut edition." }),
  usRace({ id: "im703-wisconsin", name: "IRONMAN 70.3 Wisconsin", sport: "ironman-703", date: "2026-09-12", dateLabel: "September 12, 2026", city: "Madison", state: "WI", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-wisconsin", profileStatus: "directory-only" }),
  usRace({ id: "im703-santa-cruz", name: "IRONMAN 70.3 Santa Cruz", sport: "ironman-703", date: "2026-09-13", dateLabel: "September 13, 2026", city: "Santa Cruz", state: "CA", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-santa-cruz", profileStatus: "directory-only" }),
  usRace({ id: "im703-washington", name: "IRONMAN 70.3 Washington Tri-Cities", sport: "ironman-703", date: "2026-09-20", dateLabel: "September 20, 2026", city: "Richland", state: "WA", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-washington", profileStatus: "directory-only" }),
  usRace({ id: "im703-michigan", name: "IRONMAN 70.3 Michigan", sport: "ironman-703", date: "2026-09-20", dateLabel: "September 20, 2026", city: "Frankfort", state: "MI", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-michigan", profileStatus: "directory-only" }),
  usRace({ id: "im703-new-york", name: "IRONMAN 70.3 New York-Jones Beach", sport: "ironman-703", date: "2026-09-26", dateLabel: "September 26, 2026", city: "Jones Beach", state: "NY", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-new-york", profileStatus: "directory-only" }),
  usRace({ id: "im703-augusta", name: "IRONMAN 70.3 Augusta", sport: "ironman-703", date: "2026-09-27", dateLabel: "September 27, 2026", city: "Augusta", state: "GA", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-augusta", profileStatus: "directory-only" }),
  usRace({ id: "im703-waco", name: "IRONMAN 70.3 Waco", sport: "ironman-703", date: "2026-10-17", dateLabel: "October 17, 2026", city: "Waco", state: "TX", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-waco", profileStatus: "directory-only" }),
  usRace({ id: "im703-north-carolina", name: "IRONMAN 70.3 North Carolina", sport: "ironman-703", date: "2026-10-17", dateLabel: "October 17, 2026", city: "Wilmington", state: "NC", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-north-carolina", profileStatus: "directory-only" }),
  usRace({ id: "im703-la-quinta", name: "IRONMAN 70.3 La Quinta", sport: "ironman-703", date: "2026-12-06", dateLabel: "December 6, 2026", city: "La Quinta", state: "CA", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-la-quinta", profileStatus: "directory-only" }),
  usRace({ id: "im703-florida", name: "IRONMAN 70.3 Florida", sport: "ironman-703", date: "2026-12-13", dateLabel: "December 13, 2026", city: "Haines City", state: "FL", distanceLabel: "70.3 mi (1.2mi swim / 56mi bike / 13.1mi run)", officialUrl: "https://www.ironman.com/im703-florida", profileStatus: "directory-only" }),
];

export const ULTRA_RACES = [
  {
    id: "moab-240", name: "Moab 240", sport: "ultra", date: "2026-10-09", dateLabel: "October 9, 2026",
    city: "Moab", state: "UT", country: "USA", region: "West",
    distanceLabel: "241.8 mi", officialUrl: "https://www.destinationtrailrun.com/moab",
    profileStatus: "deep", profileHref: "#/moab240",
    note: "Not on the researched world's-top-10 list, but it's this site's original race and already has a full guide — kept in the directory.",
  },
  {
    id: "western-states", name: "Western States Endurance Run", sport: "ultra", date: "2026-06-27", dateLabel: "June 27, 2026",
    city: "Olympic Valley → Auburn", state: "CA", country: "USA", region: "West",
    distanceLabel: "100.2 mi", officialUrl: "https://www.wser.org/",
    profileStatus: "deep", profileHref: "#/western-states",
    note: "World's oldest 100-mile trail race (run continuously since 1974/1977 on this route since 1986). Entry by lottery, ~270 finishers/yr limit.",
  },
  {
    id: "hardrock-100", name: "Hardrock 100 Endurance Run", sport: "ultra", date: "2026-07-10", dateLabel: "July 10, 2026",
    city: "Silverton (loop)", state: "CO", country: "USA", region: "West",
    distanceLabel: "100.5 mi, ~33,000 ft gain", officialUrl: "https://hardrock100.com/",
    profileStatus: "deep", profileHref: "#/hardrock-100",
    note: "Runs on historic San Juan Mountains mining trails between 7,680 and 14,048 ft elevation. Lottery entry, alternating clockwise/counterclockwise each year.",
  },
  {
    id: "utmb", name: "UTMB (Ultra-Trail du Mont-Blanc)", sport: "ultra", date: "2026-08-24", dateLabel: "Race week Aug 24–30, 2026 (UTMB 100M start within the week)",
    city: "Chamonix (loop: France/Italy/Switzerland)", state: "", country: "France/Italy/Switzerland", region: "International",
    distanceLabel: "~106 mi / 171 km, ~32,000 ft gain", officialUrl: "https://montblanc.utmb.world/races/UTMB",
    profileStatus: "directory-only",
    note: "The UTMB World Series Finals — widely described as the most competitive trail ultra in the world. Entry via UTMB World Series qualifying races or Running Stones.",
  },
  {
    id: "vermont-100", name: "Vermont 100 Endurance Race", sport: "ultra", date: "2027-07-17", dateLabel: "July 16–18, 2027",
    city: "West Windsor", state: "VT", country: "USA", region: "Northeast",
    distanceLabel: "100 mi, ~17,000 ft gain", officialUrl: "https://vermont100.com/",
    profileStatus: "deep", profileHref: "#/vermont-100",
    note: "Dirt roads, farmland, and horse trails — the most beginner-friendly course on this list, no major climbs. Also a USATF 100-Mile Trail Championship host and AWD-inclusive.",
  },
  {
    id: "hurt-100", name: "HURT 100 (Hawaiian Ultra Running Team)", sport: "ultra", date: "2027-01-16", dateLabel: "January 16–17, 2027",
    city: "Honolulu (Oahu)", state: "HI", country: "USA", region: "West",
    distanceLabel: "100 mi, 24,500 ft gain (5 × 20-mi laps)", officialUrl: "https://hurt100.com/",
    profileStatus: "deep", profileHref: "#/hurt-100",
    note: "HURT aims to start 135 runners. Dense tropical single-track with 20 stream crossings total — four per lap. Entry needs 8 hours of trail work plus a 50-mile qualifier.",
  },
  {
    id: "grand-raid-reunion", name: "Grand Raid de la Réunion (Diagonale des Fous)", sport: "ultra", date: "2026-10-15", dateLabel: "October 15–18, 2026",
    city: "St-Pierre → St-Denis (island crossing)", state: "", country: "Réunion (France)", region: "International",
    distanceLabel: "~102 mi / 165 km, ~32,800 ft gain", officialUrl: "https://www.grandraid-reunion.com/",
    profileStatus: "directory-only",
    note: "Crosses the volcanic island of Réunion coast-to-coast. Over 10,000m of gain and a multi-day cutoff window.",
  },
  {
    id: "ultra-trail-snowdonia", name: "Ultra-Trail Snowdonia (Eryri by UTMB)", sport: "ultra", date: "2026-05-15", dateLabel: "May 15, 2026",
    city: "Llanberis", state: "", country: "Wales, UK", region: "International",
    distanceLabel: "100 mi, ~32,800 ft gain", officialUrl: "https://snowdonia.utmb.world/",
    profileStatus: "directory-only",
    note: "Technical loop course through Eryri (Snowdonia) National Park. Part of the UTMB World Series — finishing earns Running Stones toward UTMB entry.",
  },
  {
    id: "utmr", name: "Ultra Tour Monte Rosa (UTMR)", sport: "ultra", date: "2026-09-02", dateLabel: "September 2–5, 2026",
    city: "Grächen (loop around Monte Rosa massif)", state: "", country: "Switzerland/Italy", region: "International",
    distanceLabel: "~105 mi / 170 km, ~35,000 ft gain", officialUrl: "https://www.ultratourmonterosa.com/",
    profileStatus: "directory-only",
    note: "Capped at 300 runners. Founded by ultrarunner Lizzy Hawker; circles the Monte Rosa massif through Switzerland and Italy.",
  },
  {
    id: "chicamocha-canyon-race", name: "Chicamocha Canyon Race", sport: "ultra", date: "2026-07-18", dateLabel: "July 18, 2026",
    city: "San Gil, Santander", state: "", country: "Colombia", region: "International",
    distanceLabel: "100 mi", officialUrl: "https://chicamochacanyonrace.com/",
    profileStatus: "directory-only",
    note: "Colombia's only 100-mile race — canyons, river crossings, and historic towns along the Chicamocha Canyon.",
  },
  {
    id: "everest-trail-race", name: "Everest Trail Race", sport: "ultra", date: "2026-11-09", dateLabel: "Starting November 9, 2026 (6-day stage race)",
    city: "Khumbu region (point-to-point)", state: "", country: "Nepal", region: "International",
    distanceLabel: "~106 mi over 6 stages, ~28,000 m gain, above 4,000m altitude", officialUrl: "https://trailrunningnepal.org/trail-races/everest-trail-race-2026/",
    profileStatus: "directory-only",
    note: "Multi-day stage race through the Everest region, not a single continuous push like the others on this list — flagged here for transparency.",
  },
];

export const ALL_RACES = [...IRONMAN_FULL_RACES, ...IRONMAN_703_RACES, ...ULTRA_RACES];

export const SPORT_LABELS = {
  "ironman-full": "IRONMAN (Full)",
  "ironman-703": "IRONMAN 70.3",
  ultra: "100+ Mile Ultra",
};
