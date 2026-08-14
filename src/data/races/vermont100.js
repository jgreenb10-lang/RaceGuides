/* ---------------- VERMONT 100 ENDURANCE RACE ----------------
   Transcribed from the official 2026 aid station spreadsheet linked off the
   VT100 race details page. The station "CLOSE" column is the intermediate
   cutoff. Station type codes on the sheet:
     U = Unmanned   A = Manned   H = Handler Access
     D = Drop Bags  P = Porta Potty
     E = Energy Station (NeverSecond gels + Skratch High-Carb)

   VT100 calls crew "handlers" — it shares its course with a 100-mile horse
   ride, and the terminology comes from that.

   Heads up: the 2026 edition ran on July 17, 2026. The next edition is
   July 16-18, 2027, and VT100 republishes the aid station sheet each summer,
   so confirm mileages and cutoffs against the 2027 sheet when it posts.

   Sources (retrieved 2026-08-13):
     Aid stations, cutoffs ... docs.google.com spreadsheet linked from /race-details/
     Course, times, pacers ... https://vermont100.com/race-details/
*/

export const VERMONT_100 = {
  id: "vermont-100",
  name: "Vermont 100",
  tagline: "Silver Hill Meadow, Vermont — dirt roads, horse trails, and 17,000 ft of small climbs",
  accent: "#4A7C3F",
  officialUrl: "https://vermont100.com/",
  sourceUrl: "https://vermont100.com/race-details/",

  distance: 100,
  elevationGain: 17000,
  cutoffHours: 30,
  startLine: "Silver Hill Meadow, West Windsor, VT",
  finishLine: "Silver Hill Meadow, West Windsor, VT",
  startTimeLabel: "4:00 AM Saturday",
  finishDeadlineLabel: "10:00 AM Sunday (30 hours)",

  keyFacts: [
    ["Distance", "100 mi"],
    ["Elevation gain", "~17,000 ft"],
    ["Time limit", "30 hours"],
    ["Start", "4:00 AM Saturday"],
    ["Aid stations", "25"],
    ["Surface", "68 mi dirt road, 30 mi horse trail, 2 mi pavement"],
    ["Buckle", "Large under 24h, small over"],
    ["Next edition", "July 16–18, 2027"],
  ],

  courseNotes:
    "Roughly 68 miles of rolling dirt roads, 30 miles of horse trails, and 2 miles of " +
    "pavement, with about 17,000 ft of total ascent. There are no major climbs — just " +
    "relentless small ones. The course crosses more than 30 pieces of private property " +
    "that are only open on race weekend, so VT100 publishes no course maps and pre-running " +
    "is not allowed. Runners pass Camp 10 Bear twice, at miles 47.1 and 69.2, and the " +
    "second pass is where pacers may join.",

  extraColumns: [
    { key: "openTime", label: "Opens" },
    { key: "type", label: "Type" },
  ],

  aidStations: [
    { name: "Densmore Hill", mile: 7.3, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "4:35am", type: "U", cutoff: "6:15am" },
    { name: "Dunham Hill", mile: 11.8, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "5:15am", type: "UP", cutoff: "7:35am" },
    { name: "Taftsville Bridge", mile: 15.2, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "5:45am", type: "AE", cutoff: "8:35am" },
    { name: "So. Pomfret", mile: 17.2, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "6:05am", type: "U", cutoff: "9:10am" },
    { name: "Pretty House", mile: 21.1, medical: false, dropBag: true, crew: "Handlers", pacerChange: false, openTime: "6:30am", type: "AHDP", cutoff: "10:20am" },
    { name: "U-Turn", mile: 25, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "7:15am", type: "U", cutoff: "11:30am" },
    { name: "Stage Rd", mile: 30.7, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "7:50am", type: "AEP", cutoff: "1:15pm" },
    { name: "Route 12", mile: 33.9, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "8:20am", type: "A", cutoff: "2:10pm" },
    { name: "Lincoln Covered Bridge", mile: 38.9, medical: false, dropBag: true, crew: "Handlers", pacerChange: false, openTime: "9:00am", type: "AHDP", cutoff: "3:40pm" },
    { name: "Barr House", mile: 41, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "9:20am", type: "U", cutoff: "4:20pm" },
    { name: "Lillians", mile: 43.5, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "9:30am", type: "AP", cutoff: "5:05pm" },
    { name: "Camp 10 Bear (1st)", mile: 47.1, medical: true, dropBag: true, crew: "Handlers", pacerChange: false, openTime: "10:00am", type: "AHDP", cutoff: "6:10pm" },
    { name: "Pinky's", mile: 50.2, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "10:25am", type: "AE", cutoff: "7:05pm" },
    { name: "Birminghams", mile: 53.7, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "11:00am", type: "A", cutoff: "8:10pm" },
    { name: "Margaritaville", mile: 58.3, medical: false, dropBag: true, crew: "Handlers", pacerChange: false, openTime: "11:30am", type: "AHDP", cutoff: "9:30pm" },
    { name: "Puckerbrush", mile: 61.5, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "12:00pm", type: "APE", cutoff: "10:30pm" },
    { name: "Brown School House", mile: 64.5, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "12:30pm", type: "A", cutoff: "11:25pm" },
    { name: "Camp 10 Bear (2nd)", mile: 69.2, medical: true, dropBag: true, crew: "Handlers", pacerChange: true, openTime: "1:00pm", type: "AHDP", cutoff: "12:45am" },
    { name: "Seabrook", mile: 73.6, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "1:45pm", type: "U", cutoff: "2:05am" },
    { name: "Spirit of 76", mile: 76.1, medical: false, dropBag: true, crew: "Handlers", pacerChange: true, openTime: "2:00pm", type: "AHDP", cutoff: "2:50am" },
    { name: "Goodman's", mile: 80, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "2:30pm", type: "U", cutoff: "4:00am" },
    { name: "Cow Shed", mile: 83, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "3:00pm", type: "APE", cutoff: "4:55am" },
    { name: "Bill's", mile: 88.1, medical: true, dropBag: true, crew: "Handlers", pacerChange: true, openTime: "3:30pm", type: "AHDP", cutoff: "6:25am" },
    { name: "Coon Club", mile: 91, medical: false, dropBag: false, crew: "No", pacerChange: false, openTime: "4:00pm", type: "A", cutoff: "7:20am" },
    { name: "Polly's", mile: 94.5, medical: false, dropBag: true, crew: "Handlers", pacerChange: true, openTime: "4:30pm", type: "AHDP", cutoff: "8:25am" },
    { name: "Finish Line", mile: 100, medical: true, dropBag: true, crew: "Handlers", pacerChange: false, openTime: "5:00pm", type: "AHDP", cutoff: "10:00am" },
  ],

  /* Pacers join on the SECOND pass through Camp 10 Bear, mile 69.2 — not the
     first at 47.1. Zones therefore run between handler-access stations from
     69.2 to the finish. */
  pacerStartMile: 69.2,
  pacerStartStation: "Camp 10 Bear (2nd)",
  pacerChangeStations: ["Camp 10 Bear (2nd)", "Spirit of 76", "Bill's", "Polly's", "Finish Line"],

  pacerRules: [
    "Pacers are allowed after your SECOND pass through Camp 10 Bear — about mile 69.2, not the first pass at 47.1.",
    "Runners over 60 may have a pacer for the entire race.",
    "Solo-division runners take no crew and no pacers at all — drop bags, aid stations, and fellow competitors only.",
    "Full pacer rules live in the VT100 Runner's Handbook.",
  ],

  crewRules: [
    "VT100 calls crew \"handlers\" — the course is shared with a 100-mile horse ride.",
    "Handlers may only assist their runner at designated handler-access stations (type H on the aid chart).",
    "Runners without handlers may send drop bags to crewed stations; keep them a reasonable size and weight.",
    "Dogs are not allowed at any aid station or at Silver Hill Meadow, service dogs excepted.",
  ],

  aidStationSupplies:
    "Unmanned stations (type U) carry water and electrolyte drink only. Manned stations (A) " +
    "are fully stocked with standard aid station fare. Energy stations (E) add NeverSecond gels " +
    "and Skratch High-Carb. First-aid volunteers are at Camp 10 Bear, Bill's, and the start/finish; " +
    "an ambulance stands by at the start/finish only.",

  notes: [
    "The 2026 edition already ran (July 17, 2026). Next is July 16–18, 2027, and the aid station sheet is republished each summer — check the current one before racing.",
    "No course maps are published and pre-running is forbidden. The route crosses 30+ private properties open only on race weekend.",
    "VT100 provides first-aid-level care only. You are responsible for your own health and safety, and any ambulance ride is billed to you.",
    "Sub-24 hours earns the large belt buckle; over 24 earns the small one.",
    "Camp 10 Bear is visited twice, 22 miles apart. Do not confuse the two when planning handler logistics.",
  ],

  sources: [
    { label: "Race details, times & pacer rules", url: "https://vermont100.com/race-details/" },
    { label: "Aid stations & cutoffs (spreadsheet)", url: "https://docs.google.com/spreadsheets/d/1jDkOLgzXf4Z2KYLrRHvrF2uZ6S-C3J8ZRBP9S8RFRb0/edit#gid=1796561063" },
    { label: "Runner's Handbook", url: "https://vermont100.com/runners-handbook/" },
  ],
};
