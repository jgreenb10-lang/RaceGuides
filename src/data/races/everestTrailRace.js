/* ---------------- EVEREST TRAIL RACE ----------------
   The odd one out on this site: a six-day STAGE race, not a single push, so it
   is marked stageRace: true. That hides the pace calculator and pacer-zone
   tools, which project against a single finish cutoff this race does not have.

   The organisers publish per-stage distances and total elevation, but not
   per-stage cutoff times, so none are shown. Nothing here is estimated —
   where a figure isn't published, the field is left out.

   Note the correct official domain is everesttrailrace.com. The directory
   previously pointed at a trailrunningnepal.org page, which returns 403.

   Sources (all everesttrailrace.com, retrieved 2026-08-14):
     Distances, stages, altitude, self-sufficiency .. /en/the-race/duplicat-de-the-race
     Day-by-day programme ........................... /en/runners/programm
     Rules .......................................... /en/runners/rules
     Compulsory equipment ........................... /en/runners/compulsory-equipment
*/

export const EVEREST_TRAIL_RACE = {
  id: "everest-trail-race",
  name: "Everest Trail Race",
  tagline: "Solukhumbu, Nepal — six stages, 170 km, and 26,000 m of climbing under Everest",
  accent: "#6B4F9E",
  unit: "km",
  stageRace: true,
  officialUrl: "https://www.everesttrailrace.com/en/",
  sourceUrl: "https://www.everesttrailrace.com/en/the-race/duplicat-de-the-race",

  distance: 170,
  elevationGain: 26000, // metres, total across all six stages
  startLine: "Solukhumbu, Nepal",
  finishLine: "Lukla, Nepal",
  startTimeLabel: "Stage race — one stage per day",
  finishDeadlineLabel: "Six stages over six days",

  keyFacts: [
    ["Format", "6 stages, 6 days"],
    ["Total distance", "~170 km"],
    ["Total elevation gain", "26,000 m+"],
    ["Max altitude", "4,104 m"],
    ["Altitude range", "2,000–4,100 m"],
    ["Daily gain/loss", "3,600–5,400 m"],
    ["Accommodation", "Camp each night"],
    ["2026 edition", "9–21 November 2026"],
  ],

  courseNotes:
    "A six-day stage race through the Solukhumbu region of the Nepali Himalaya, between " +
    "2,000 and 4,100 m of altitude, with Everest, Lhotse, Ama Dablam, Tamserku, Kangtega, " +
    "Makalu, and Kanchenjunga on the skyline. Roughly 170 km in total with more than 26,000 m " +
    "of cumulative ascent, and daily elevation change of 3,600 to 5,400 m. Runners cover one " +
    "stage per day and sleep in tented camps. It is a free-style race, open to both elite " +
    "runners and strong mountain walkers. The region is reachable only on foot, the way its " +
    "Sherpa, Rai, and Tamang inhabitants have always travelled it.",

  stageNote:
    "Six stages, one per day, each finishing at a camp. Distances are as published by the " +
    "organisers. Per-stage cutoff times are not published on the public site, so none are " +
    "shown here — check the current regulations for those.",

  extraColumns: [{ key: "stageKm", label: "Distance" }],

  /* `mile` here is cumulative km, used only for ordering and the summary. */
  aidStations: [
    { name: "Stage 1", mile: 25, stageKm: "~25 km", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Stage 2", mile: 51, stageKm: "~26 km", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Stage 3", mile: 81, stageKm: "~30 km", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Stage 4", mile: 108.5, stageKm: "~27.5 km", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Stage 5", mile: 140.5, stageKm: "~32 km", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Stage 6", mile: 170.5, stageKm: "~30 km", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
  ],

  pacersAllowed: false,
  noPacerNote:
    "This is a supported stage race, not a crewed 100-miler. There are no pacers and no " +
    "roadside crew — the area is only reachable on foot. The organisation provides all meals " +
    "and on-route supplies, and runners sleep in ETR camps. Friends and family can attend " +
    "through the separate official Companions programme.",

  pacerRules: [
    "No pacers. The race is run in stages with the organisation providing all support.",
    "Self-sufficiency here covers technical equipment only — sleeping bag, warm clothing, hat, thermal blanket, and the rest of the compulsory kit, carried by the runner throughout.",
    "It is NOT a food-self-sufficiency race: ETR provides breakfast, on-route supplies, lunch, and dinner in camp every day.",
    "Companions travel on their own official programme with separate registration, fees, and insurance.",
  ],

  crewRules: [
    "There is no crew access in the conventional sense — Solukhumbu is reachable only on foot.",
    "ETR handles all logistics: transfers, camps, tents, and meals for the duration.",
    "Personal baggage is handed over in Kathmandu before the race and returned afterwards.",
    "Technical and medical checks happen in Kathmandu the day before travel to the first camp.",
    "Friends and family should register through the Companions programme rather than trying to reach the course independently.",
  ],

  aidStationSupplies:
    "The organisation supplies food and drink on route and all meals in camp — breakfast, " +
    "stage supplies, lunch, and dinner. Runners carry their own compulsory technical kit " +
    "rather than their own food.",

  notes: [
    "This is a six-day stage race, so there is no single finish cutoff and no pace calculator on this page.",
    "Altitude is the defining difficulty: stages run between 2,000 m and 4,104 m, and the daily elevation change reaches 5,400 m.",
    "The 2026 edition runs 9–21 November, with the six race stages between 13 and 18 November. The surrounding days cover travel, checks, and the return to Kathmandu.",
    "Compulsory kit includes a sleeping bag and warm clothing for genuinely cold Himalayan nights — weigh your choices carefully, because you carry them for six days.",
    "The official site is everesttrailrace.com. Third-party listings for this race are often out of date.",
  ],

  sources: [
    { label: "The race (distances & stages)", url: "https://www.everesttrailrace.com/en/the-race/duplicat-de-the-race" },
    { label: "Day-by-day programme", url: "https://www.everesttrailrace.com/en/runners/programm" },
    { label: "Rules", url: "https://www.everesttrailrace.com/en/runners/rules" },
    { label: "Compulsory equipment", url: "https://www.everesttrailrace.com/en/runners/compulsory-equipment" },
  ],
};
