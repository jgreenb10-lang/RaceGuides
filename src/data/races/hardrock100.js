/* ---------------- HARDROCK HUNDRED ENDURANCE RUN ----------------
   Hardrock reverses direction every year. 2026 runs CLOCKWISE, and every
   mileage, cutoff, and elevation below is from the official 2026 clockwise
   aid station table — a counter-clockwise year would need a different set.

   Sources (all hardrock100.com, retrieved 2026-08-13):
     Aid stations, cutoffs, elevations .. /files/course/HR100-2026-Course-Aid-Stations.pdf
     Course stats, gain/loss, high point . /hardrock-course.php
     Pacer + crew rules .................. /hardrock-pacers.php
*/

export const HARDROCK_100 = {
  id: "hardrock-100",
  name: "Hardrock 100",
  tagline: "Silverton, Colorado — 33,441 ft of climb at 11,000 ft average elevation",
  accent: "#8C6B52",
  officialUrl: "https://hardrock100.com/",
  sourceUrl: "https://hardrock100.com/hardrock-course.php",

  distance: 101.8,
  elevationGain: 33441,
  elevationLoss: 33441,
  cutoffHours: 48,
  startLine: "Silverton, CO",
  finishLine: "Silverton, CO",
  startTimeLabel: "6:00 AM Friday",
  finishDeadlineLabel: "6:00 AM Sunday (48 hours)",

  keyFacts: [
    ["Distance", "101.8 mi"],
    ["Elevation gain", "33,441 ft"],
    ["Elevation loss", "33,441 ft"],
    ["Time limit", "48 hours"],
    ["High point", "14,048 ft (Handies Peak)"],
    ["Average elevation", "~11,000 ft"],
    ["Aid stations", "14"],
    ["Direction (2026)", "Clockwise"],
  ],

  courseNotes:
    "Four legs linking the Lake City, Ouray, Telluride, and Silverton areas, starting " +
    "and finishing in Silverton. Total elevation change is 66,882 ft across 101.8 miles, " +
    "with the course ranging from 7,700 ft to over 14,000 ft. The route is closed — " +
    "runners must follow the specified course — and marking is deliberately sparse, so " +
    "knowing the route is your responsibility whether flags are present or not. Runners " +
    "are expected to be largely self-supporting between towns. The direction alternates " +
    "each year; 2026 is clockwise.",

  /* Cutoffs exist at only 8 of the 14 stations. Stations showing no cutoff are
     "None" on the official table — you still have to beat the next one. */
  extraColumns: [
    { key: "openTime", label: "Opens" },
    { key: "pace48", label: "48h Pace" },
    { key: "elev", label: "Elev" },
  ],

  aidStations: [
    { name: "KT", mile: 11.5, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "Fri 07:10", pace48: "Fri 09:45", elev: "10,628'", cutoff: "12:45pm" },
    { name: "Chapman", mile: 18.1, medical: false, dropBag: true, crew: "Hike in only", pacerChange: false, openTime: "Fri 08:20", pace48: "Fri 12:30", elev: "10,158'", cutoff: "4:00pm" },
    { name: "Telluride", mile: 27.8, medical: true, dropBag: true, crew: "Yes (auto)", pacerChange: false, openTime: "Fri 10:10", pace48: "Fri 16:15", elev: "8,748'", cutoff: "8:00pm" },
    { name: "Kroger's Canteen", mile: 32.7, medical: false, dropBag: false, crew: "No (hike-in)", pacerChange: false, openTime: "Fri 11:40", pace48: "Fri 19:10", elev: "13,098'", cutoff: null },
    { name: "Governor", mile: 36.3, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "Fri 12:00", pace48: "Fri 20:10", elev: "10,673'", cutoff: null },
    { name: "Ouray", mile: 43.9, medical: true, dropBag: true, crew: "Yes (auto)", pacerChange: true, openTime: "Fri 13:00", pace48: "Fri 22:20", elev: "7,678'", cutoff: "3:15am" },
    { name: "Engineer", mile: 51.9, medical: false, dropBag: false, crew: "No (hike-in)", pacerChange: false, openTime: "Fri 15:10", pace48: "Sat 02:40", elev: "11,798'", cutoff: null },
    { name: "Grouse Gulch", mile: 58.2, medical: true, dropBag: true, crew: "Yes (4WD)", pacerChange: true, openTime: "Fri 16:30", pace48: "Sat 05:30", elev: "10,729'", cutoff: "10:30am" },
    { name: "Burrows", mile: 67.8, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "Fri 19:00", pace48: "Sat 12:40", elev: "10,588'", cutoff: null },
    { name: "Sherman", mile: 72, medical: true, dropBag: true, crew: "Yes (auto/4WD)", pacerChange: true, openTime: "Fri 19:40", pace48: "Sat 14:10", elev: "9,638'", cutoff: "4:00pm" },
    { name: "Pole Creek", mile: 81.5, medical: false, dropBag: false, crew: "No (hike-in)", pacerChange: false, openTime: "Fri 22:25", pace48: "Sat 19:10", elev: "11,244'", cutoff: null },
    { name: "Maggie", mile: 86.5, medical: false, dropBag: false, crew: "No", pacerChange: "Hike-in swap only", openTime: "Fri 23:30", pace48: "Sat 21:30", elev: "11,838'", cutoff: null },
    { name: "Cunningham", mile: 92.5, medical: true, dropBag: true, crew: "Yes (auto)", pacerChange: true, openTime: "Sat 01:10", pace48: "Sun 01:35", elev: "10,378'", cutoff: "2:00am" },
    { name: "Silverton (Finish)", mile: 101.8, medical: true, dropBag: true, crew: "Yes (auto)", pacerChange: false, openTime: "Sat 03:40", pace48: "Sun 06:00", elev: "9,308'", cutoff: "6:00am" },
  ],

  /* Pacing opens at Ouray (43.9). Maggie allows a swap but only for pacers
     willing to hike in, so it is a legal exchange point rather than a start. */
  pacerStartMile: 43.9,
  pacerStartStation: "Ouray",
  pacerChangeStations: ["Ouray", "Grouse Gulch", "Sherman", "Cunningham", "Silverton (Finish)"],

  pacerRules: [
    "Pacers are allowed from Ouray (mile 43.9) onward — one pacer at a time.",
    "Runners over 60 may have a pacer for the entire run.",
    "Pacers may join only at crew-access stations from Ouray on: Ouray, Grouse Gulch, Sherman, and Cunningham — plus Maggie, if they hike in (exchange only).",
    "A pacer must run the whole leg to the next crew-access station. There is generally no way out in between.",
    "Every pacer checks in and signs a waiver, either at Silverton Gym pre-race or at the station where they join, and wears the wristband on course.",
    "Muling is not allowed.",
    "Pacers may not continue without their runner.",
    "Family and friends may join for the final mile from the north end of the Kendall Mountain Recreation Center parking lot.",
  ],

  crewRules: [
    "Crews may only meet runners at crew-access aid stations — never intentionally in between.",
    "Crewing is limited to a 400-yard radius of the aid station, at the Aid Station Captain's discretion.",
    "One crew pass per runner, which must be displayed. It allows a single vehicle to park at Grouse Gulch; without it you may be sent miles away.",
    "Absolutely no crew, spectators, media, parking, or drop-offs along Ophir Pass Road — non-compliance can disqualify your runner.",
    "Supplies are limited and stations are remote. Be self-sufficient and leave food, water, and facilities for runners and staff.",
    "Downhill yields to uphill on the narrow mountain roads. Park only where directed and pack out all trash.",
    "No pets in aid stations or on course. Children only under adult supervision. No drones without a BLM permit.",
    "Runners may rest in a STATIONARY vehicle after checking in, but returning to it after checking out is a disqualification.",
  ],

  aidStationSupplies:
    "Three tiers of station. The Big 4 (Telluride, Ouray, Grouse Gulch, Sherman) have hot food, " +
    "drop bags, bathrooms, electricity, and crew access. Road-side stations (KT, Chapman, Governor, " +
    "Burrows, Maggie, Cunningham) are 4WD-accessible with hot food but variable amenities. Hike-in " +
    "stations (Kroger's Canteen, Engineer, Pole Creek) have everything carried in on volunteers' " +
    "backs — essentials only, no crew.",

  notes: [
    "Direction alternates yearly. This page is the 2026 CLOCKWISE course — a counter-clockwise year has different mileages and cutoffs.",
    "Only 8 of the 14 stations have a hard cutoff. The others still feed the next one, so banking time early matters.",
    "The high point is Handies Peak at 14,048 ft, and the course averages around 11,000 ft. Altitude, not distance, is what ends most Hardrock days.",
    "Taking a ride that advances your progress means abandoning the run — no exceptions, and it risks future entry.",
    "Weather above 13,000 ft turns fast. Afternoon lightning on the high passes is the standing danger.",
  ],

  sources: [
    { label: "Aid stations & cutoffs (PDF)", url: "https://hardrock100.com/files/course/HR100-2026-Course-Aid-Stations.pdf" },
    { label: "Course description", url: "https://hardrock100.com/hardrock-course.php" },
    { label: "Pacer & crew rules", url: "https://hardrock100.com/hardrock-pacers.php" },
  ],
};
