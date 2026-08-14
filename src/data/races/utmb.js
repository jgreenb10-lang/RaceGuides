/* ---------------- UTMB (ULTRA-TRAIL DU MONT-BLANC) ----------------
   Metric race — distances are kilometres exactly as UTMB publishes them, with
   no conversion. The loop crosses France, Italy, and Switzerland.

   UTMB has NO PACERS. Being accompanied by anyone not registered in the race,
   outside the marked spectator zones, breaches the self-sufficiency principle
   and is penalised. What exists instead is a "personal assistant" allowed at
   certain aid stations only.

   Barrier (cut-off) times are the times you must LEAVE the checkpoint,
   whatever time you arrived. The start is Friday 17:45, so every barrier after
   midnight carries an explicit cutoffDayOffset rather than relying on the
   rollover heuristic.

   Sources (all montblanc.utmb.world, retrieved 2026-08-13):
     Course, checkpoints, barriers .. /races/UTMB
     Regulations (self-sufficiency,
       assistance, cut-offs, rest) ... /races-runners/other-information/regulation
     Mandatory equipment ............ /races-runners/runners/mandatory-equipment
*/

export const UTMB = {
  id: "utmb",
  name: "UTMB",
  tagline: "Ultra-Trail du Mont-Blanc — 174 km around Mont Blanc through France, Italy, and Switzerland",
  accent: "#1B4F8C",
  unit: "km",
  officialUrl: "https://montblanc.utmb.world/races/UTMB",
  sourceUrl: "https://montblanc.utmb.world/races/UTMB",

  distance: 176.8,
  elevationGain: 9900, // metres
  cutoffHours: 46.75,
  startLine: "Chamonix, France",
  finishLine: "Chamonix, France",
  startTimeLabel: "5:45 PM Friday",
  finishDeadlineLabel: "4:30 PM Sunday (46h 45m)",

  keyFacts: [
    ["Distance", "174 km (176.8 km of checkpoints)"],
    ["Elevation gain", "9,900 m+"],
    ["Time limit", "46h 45m"],
    ["Start", "Chamonix, Friday 17:45"],
    ["Countries", "France, Italy, Switzerland"],
    ["Pacers", "Not allowed"],
    ["Assistance", "Certain aid stations only"],
    ["2026 date", "Friday 28 August 2026"],
  ],

  courseNotes:
    "A full loop of the Mont Blanc massif from Chamonix, through Italy and Switzerland and " +
    "back into France, with roughly 9,900 m of positive elevation gain. Created in 2003, it " +
    "is now the 100M final of the UTMB World Series. The start is at 17:45 on Friday, so " +
    "every runner covers two nights on the mountain. UTMB notes that distance and elevation " +
    "may be adjusted for terrain constraints, so treat the numbers as the published plan " +
    "rather than a guarantee.",

  extraColumns: [{ key: "legKm", label: "Leg" }],

  /* Barriers are published for the main checkpoints only; the rest are timing
     points without a hard limit. */
  aidStations: [
    { name: "Les Houches", mile: 9.1, legKm: "9.1", medical: false, dropBag: false, crew: "No", pacerChange: false, cutoff: null },
    { name: "Saint-Gervais", mile: 22.8, legKm: "13.7", medical: true, dropBag: false, crew: "Assistance", pacerChange: false, cutoff: "10:00pm", cutoffDayOffset: 0 },
    { name: "Les Contamines", mile: 32.5, legKm: "9.6", medical: true, dropBag: true, crew: "Assistance", pacerChange: false, cutoff: "12:00am", cutoffDayOffset: 1 },
    { name: "La Balme", mile: 41.1, legKm: "8.6", medical: false, dropBag: false, crew: "No", pacerChange: false, cutoff: "2:00am", cutoffDayOffset: 1 },
    { name: "Les Chapieux", mile: 52.2, legKm: "11.1", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: "5:15am", cutoffDayOffset: 1 },
    { name: "Lac Combal", mile: 69.5, legKm: "17.2", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: "10:00am", cutoffDayOffset: 1 },
    { name: "Checrouit", mile: 78.4, legKm: "8.9", medical: false, dropBag: false, crew: "No", pacerChange: false, cutoff: null },
    { name: "Courmayeur", mile: 83.4, legKm: "4.9", medical: true, dropBag: true, crew: "Assistance", pacerChange: false, cutoff: "1:15pm", cutoffDayOffset: 1 },
    { name: "Refuge Bertone", mile: 88.7, legKm: "5.2", medical: false, dropBag: false, crew: "No", pacerChange: false, cutoff: null },
    { name: "Arnouvaz", mile: 101.7, legKm: "12.9", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: "6:15pm", cutoffDayOffset: 1 },
    { name: "La Fouly", mile: 116.2, legKm: "14.5", medical: true, dropBag: false, crew: "Assistance", pacerChange: false, cutoff: "10:30pm", cutoffDayOffset: 1 },
    { name: "Champex-Lac", mile: 130.5, legKm: "14.2", medical: true, dropBag: true, crew: "Assistance", pacerChange: false, cutoff: "2:30am", cutoffDayOffset: 2 },
    { name: "Trient", mile: 147, legKm: "16.5", medical: true, dropBag: false, crew: "Assistance", pacerChange: false, cutoff: "8:00am", cutoffDayOffset: 2 },
    { name: "Vallorcine", mile: 158.4, legKm: "11.3", medical: true, dropBag: false, crew: "Assistance", pacerChange: false, cutoff: "11:15am", cutoffDayOffset: 2 },
    { name: "La Flégère", mile: 169.8, legKm: "11.4", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: "2:45pm", cutoffDayOffset: 2 },
    { name: "Chamonix (Finish)", mile: 176.8, legKm: "6.9", medical: true, dropBag: true, crew: "Yes", pacerChange: false, cutoff: "4:30pm", cutoffDayOffset: 2 },
  ],

  pacersAllowed: false,
  noPacerNote:
    "UTMB forbids being accompanied along any part of the route by anyone not registered in " +
    "the race, outside the marked spectator zones near aid stations. Accepting company " +
    "elsewhere violates the self-sufficiency principle and marshals may penalise you for it. " +
    "What you get instead is one personal assistant at certain aid stations.",

  pacerRules: [
    "One personal assistant is allowed at certain aid stations only, in the area reserved for it and at the team leader's discretion.",
    "That assistant may hand over a bag of at most 30 litres — nothing else.",
    "Medical assistance from your crew is strictly forbidden. Only small care such as massage or treating a blister, and only with the runner seated, never lying down.",
    "The rest of the aid station is strictly for runners.",
    "No accompanying runners outside the marked spectator zones — this is the rule that rules out pacing.",
    "No dogs or other animals, including service animals.",
  ],

  crewRules: [
    "Mandatory equipment must be carried in a pack for the whole race and cannot be swapped out along the route. Marshals can check it at any time, and non-compliance risks disqualification.",
    "Aid stations serve food and drink for consumption on site. The organisation refills bottles with still water and sports drink only.",
    "Leave each aid station carrying enough food and drink to reach the next one — this is a semi-autonomy race.",
    "You must wear your race bib to enter an aid station.",
    "One of your two headlamps must have a red-light mode, which is mandatory through the Réserve des Contamines-Montjoie.",
    "Rest areas with camp beds and blankets exist at some aid stations.",
  ],

  aidStationSupplies:
    "Aid stations provide drinks and food to eat on site; the organisation fills bottles and " +
    "hydration packs with still water and electrolyte/sports drink. Personal collapsible cups " +
    "are required — there are no disposable cups. New for 2026, Champex-Lac (km 130) stocks a " +
    "selection of Asian products including noodles, soups, and buns.",

  notes: [
    "Cut-offs are the time you must LEAVE the checkpoint, no matter when you arrived. Miss one and your bib is cut and you are bussed back.",
    "When the start runs in waves, the time limit and barriers are calculated from the LAST wave's departure.",
    "This is a semi-autonomy race: carry your own food, fluid, and weather gear between stations.",
    "Two nights out. The 17:45 Friday start means even fast runners run in the dark twice.",
    "Distance and elevation may be adjusted for terrain, and revised cut-offs are announced by SMS.",
    "Entry requires UTMB World Series Running Stones — it is not an open-entry race.",
  ],

  sources: [
    { label: "Course & barrier times", url: "https://montblanc.utmb.world/races/UTMB" },
    { label: "Race regulations", url: "https://montblanc.utmb.world/races-runners/other-information/regulation" },
    { label: "Mandatory equipment", url: "https://montblanc.utmb.world/races-runners/runners/mandatory-equipment" },
  ],
};
