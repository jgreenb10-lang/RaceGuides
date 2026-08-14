/* ---------------- ERYRI 100M (ULTRA-TRAIL SNOWDONIA BY UTMB) ----------------
   The race is now branded Eryri by UTMB and its site has moved from
   snowdonia.utmb.world to eryri.utmb.world. Metric, like the rest of the UTMB
   World Series.

   Being a UTMB World Series event, the same self-sufficiency regime applies:
   no pacers, and a personal assistant only at designated locations. Eryri is
   explicit that assistance points are limited by parking and remoteness.

   The start is Friday 14:00 and the race runs 48 hours to Sunday 14:00, so
   barriers after midnight carry explicit cutoffDayOffset values.

   Sources (all eryri.utmb.world, retrieved 2026-08-14):
     Course, checkpoints, barrier times, aid stations, support crew
       ... /races/Eryri-100M
*/

export const ERYRI_100 = {
  id: "ultra-trail-snowdonia",
  name: "Eryri 100M (Ultra-Trail Snowdonia)",
  tagline: "Llanberis, Wales — beautiful beyond belief, savage beyond reason",
  accent: "#3B6E4B",
  unit: "km",
  officialUrl: "https://eryri.utmb.world/races/Eryri-100M",
  sourceUrl: "https://eryri.utmb.world/races/Eryri-100M",

  distance: 163.9,
  elevationGain: 9200, // metres
  cutoffHours: 48,
  startLine: "Llanberis, Wales",
  finishLine: "Llanberis, Wales",
  startTimeLabel: "2:00 PM Friday",
  finishDeadlineLabel: "2:00 PM Sunday (48 hours)",

  keyFacts: [
    ["Distance", "163 km / ~101 mi"],
    ["Elevation gain", "9,200 m+"],
    ["Time limit", "48 hours"],
    ["Start", "Llanberis, Friday 14:00"],
    ["Checkpoints", "13"],
    ["Pacers", "Not allowed"],
    ["Assistance", "Designated locations only"],
    ["2026 date", "Friday 15 May 2026"],
  ],

  courseNotes:
    "A grand tour of Eryri (Snowdonia) starting and finishing in Llanberis, at the foot of " +
    "Yr Wyddfa (Snowdon), the highest peak in Wales. The route climbs through technical trails " +
    "and exposed mountain ridges deep into Eryri National Park, over jagged summits including " +
    "Glyder Fawr, Carnedd Llewelyn, Moel Siabod, Moelwyn Mawr, Cnicht, Moel Hebog, Yr Wyddfa, " +
    "Mynydd Mawr, and Moel Eilio. Terrain runs from rocky scree and boulder fields to boggy " +
    "moorland, past glacial lakes like Llyn Gwynant and Llyn Idwal and the remains of the " +
    "historic slate industry.",

  extraColumns: [{ key: "legKm", label: "Leg" }],

  aidStations: [
    { name: "Pen-y-Pass", mile: 11.9, legKm: "11.9", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: "5:30pm", cutoffDayOffset: 0 },
    { name: "Ogwen Valley", mile: 21.8, legKm: "9.9", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: "8:00pm", cutoffDayOffset: 0 },
    { name: "Llyn Eigiau", mile: 37.2, legKm: "15.3", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: "12:30am", cutoffDayOffset: 1 },
    { name: "Capel Curig", mile: 49.4, legKm: "12.2", medical: true, dropBag: true, crew: "Assistance", pacerChange: false, cutoff: "3:00am", cutoffDayOffset: 1 },
    { name: "Dolwyddelan", mile: 59.7, legKm: "10.2", medical: true, dropBag: false, crew: "Assistance", pacerChange: false, cutoff: "6:00am", cutoffDayOffset: 1 },
    { name: "Blaenau Ffestiniog", mile: 72.2, legKm: "12.5", medical: true, dropBag: true, crew: "Assistance", pacerChange: false, cutoff: "9:30am", cutoffDayOffset: 1 },
    { name: "Croesor", mile: 84.6, legKm: "12.3", medical: true, dropBag: false, crew: "Assistance", pacerChange: false, cutoff: "1:00pm", cutoffDayOffset: 1 },
    { name: "Gwastadanas", mile: 98.2, legKm: "13.6", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: "4:45pm", cutoffDayOffset: 1 },
    { name: "Beddgelert", mile: 112.2, legKm: "14", medical: true, dropBag: true, crew: "Assistance", pacerChange: false, cutoff: "8:30pm", cutoffDayOffset: 1 },
    { name: "Rhyd-Ddu", mile: 126.6, legKm: "14.3", medical: true, dropBag: false, crew: "Assistance", pacerChange: false, cutoff: "2:00am", cutoffDayOffset: 2 },
    { name: "Bron-y-Fedw", mile: 139.1, legKm: "12.5", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: "6:45am", cutoffDayOffset: 2 },
    { name: "Betws Garmon", mile: 147.5, legKm: "8.3", medical: true, dropBag: false, crew: "Assistance", pacerChange: false, cutoff: "9:45am", cutoffDayOffset: 2 },
    { name: "Llanberis (Finish)", mile: 163.9, legKm: "16.4", medical: true, dropBag: true, crew: "Yes", pacerChange: false, cutoff: "2:00pm", cutoffDayOffset: 2 },
  ],

  pacersAllowed: false,
  noPacerNote:
    "Eryri is a UTMB World Series event and runs the same semi-autonomy rules as UTMB: no " +
    "pacers, and no being accompanied on course by anyone not registered in the race. Support " +
    "crews may give personal assistance at designated locations only — the organisers are " +
    "deliberately selective because several aid stations are remote with almost no parking.",

  pacerRules: [
    "No pacers. This is a semi-autonomous / self-sufficient event.",
    "Support crews may provide personal assistance only at designated locations.",
    "Assistance points are limited on purpose — remote stations with no realistic parking are excluded.",
    "The organisers strongly advise having a crew regardless, given the length and remoteness of the course.",
  ],

  crewRules: [
    "Personal assistance is allowed only at designated aid stations. Check the current race guide for which ones — the list is short by design.",
    "Arrange for someone to drive you home. The organisers explicitly warn against driving yourself after finishing.",
    "Mandatory kit must be carried throughout and is subject to spot checks.",
    "The route passes through Capel Curig, Dolwyddelan, Blaenau Ffestiniog, Croesor, Beddgelert, Rhyd Ddu, and Betws Garmon — the realistic places to meet a runner.",
  ],

  aidStationSupplies:
    "Aid stations sit at strategic intervals with basic food, drink, and shelter. Larger ones " +
    "are well stocked with hot food, hot drinks, cold drinks, water, cola, and Näak energy " +
    "products, and are usually inside buildings or marquees with seating and rest areas. " +
    "Toilets at every location, including women's toilets with period products.",

  notes: [
    "The race has rebranded from Ultra-Trail Snowdonia to Eryri by UTMB, and the site moved to eryri.utmb.world.",
    "48 hours from a 14:00 Friday start means two full nights on exposed Welsh mountain ridges.",
    "Welsh mountain weather is the real hazard — mandatory kit exists because conditions on the ridges change fast.",
    "Barriers are the time you must leave the checkpoint, not arrive.",
    "Entry is through the UTMB World Series, so Running Stones apply.",
  ],

  sources: [
    { label: "Eryri 100M race page", url: "https://eryri.utmb.world/races/Eryri-100M" },
    { label: "All Eryri races", url: "https://eryri.utmb.world/" },
  ],
};
