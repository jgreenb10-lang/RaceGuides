/* ---------------- ULTRA TOUR MONTE ROSA (170 KM ULTRA TOUR) ----------------
   The single-stage 170 km race around Monte Rosa, through Switzerland and
   Italy. Metric. UTMR explicitly forbids muling and pacing, so there is no
   pacer plan to make — only designated support checkpoints.

   ONE DISCREPANCY, HANDLED DELIBERATELY: the official checkpoint table labels
   the Macugnaga cutoff (20:30) as "Sat, 05 Sep". That cannot be right — the
   race itself closes at 16:00 on Saturday, so a Saturday 20:30 cutoff at km
   126 would fall four and a half hours AFTER the finish. Read as Friday 04
   Sep it lands at 40h30m elapsed, which sits correctly between the Rifugio
   Pastore cutoff (33h15m) and Saas Fee (52h). This file uses the Friday
   reading; the times are transcribed exactly as published either way, and the
   elapsed values are derived from the natural ordering rather than the printed
   date labels. Confirm against the current race guide before relying on it.

   Sources (all ultratourmonterosa.com, retrieved 2026-08-14):
     Checkpoints, distances, cutoffs, course .. /170km-ultra-tour-info/
     Support / pacing rules ................... /useful-information/supporters/
     Obligatory equipment ..................... /useful-information/obligatory-equipment/
*/

export const UTMR = {
  id: "utmr",
  name: "Ultra Tour Monte Rosa",
  tagline: "Grächen, Switzerland — 171 km and 11,600 m of climb around Monte Rosa",
  accent: "#7A5C9E",
  unit: "km",
  officialUrl: "https://www.ultratourmonterosa.com/170km-ultra-tour-info/",
  sourceUrl: "https://www.ultratourmonterosa.com/170km-ultra-tour-info/",

  distance: 170.1,
  elevationGain: 11600, // metres
  elevationLoss: 11600,
  cutoffHours: 60,
  startLine: "Grächen, Switzerland",
  finishLine: "Grächen, Switzerland",
  startTimeLabel: "4:00 AM Thursday",
  finishDeadlineLabel: "4:00 PM Saturday (60 hours)",

  keyFacts: [
    ["Distance", "171 km / ~106 mi"],
    ["Ascent", "11,600 m+"],
    ["Descent", "11,600 m−"],
    ["Time limit", "60 hours"],
    ["Start", "Grächen, Thursday 04:00"],
    ["Max starters", "300"],
    ["ITRA points", "6"],
    ["2026 date", "3 September 2026"],
  ],

  courseNotes:
    "A full loop around Monte Rosa from Grächen, crossing between Switzerland and Italy. " +
    "The race founder Lizzy Hawker describes the route as more challenging than UTMB — more " +
    "climb, more technical terrain, more altitude, and glacier crossings. Highlights include " +
    "the Charles Kuonen suspension bridge around dawn, the Matterhorn skyline above Zermatt " +
    "at km 41, and the huge climb out of Zermatt to the Theodulpass at 3,295 m where the last " +
    "2 km are run on ice. From there the route takes Italian valleys and the wild traverse " +
    "south of Monte Rosa beneath its Himalayan-scale south face, before the long Höhenweg " +
    "home from Saas Fee to Grächen.",

  extraColumns: [
    { key: "legKm", label: "Leg" },
    { key: "alt", label: "Alt" },
  ],

  aidStations: [
    { name: "CP1 Europahütte", mile: 17.7, legKm: "17.7", alt: "2266 m", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: null },
    { name: "CP2 Täschalp", mile: 27, legKm: "9.3", alt: "2172 m", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: null },
    { name: "CP3 Zermatt", mile: 37.1, legKm: "10.1", alt: "1600 m", medical: true, dropBag: true, crew: "Designated", pacerChange: false, cutoff: "1:00pm" },
    { name: "CP4 Trockenersteg", mile: 46.6, legKm: "9.5", alt: "2937 m", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: null },
    { name: "CP5 Teodul", mile: 50.6, legKm: "4.0", alt: "3324 m", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: null },
    { name: "CP6 Rifugio Ferraro", mile: 67.5, legKm: "16.9", alt: "2083 m", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: "11:50pm" },
    { name: "CP7 Gressoney-la-Trinité", mile: 79.5, legKm: "12.0", alt: "1629 m", medical: true, dropBag: true, crew: "Designated", pacerChange: false, cutoff: "5:00am" },
    { name: "CP8 Passo dei Salati", mile: 89, legKm: "9.5", alt: "2961 m", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: null },
    { name: "CP9 Rifugio Pastore", mile: 103.9, legKm: "14.9", alt: "1575 m", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: "1:15pm" },
    { name: "Colle del Turlo", mile: 115.6, legKm: "11.7", alt: "2701 m", medical: false, dropBag: false, crew: "No", pacerChange: false, cutoff: null },
    { name: "CP10 Macugnaga", mile: 126.1, legKm: "10.5", alt: "1310 m", medical: true, dropBag: true, crew: "Designated", pacerChange: false, cutoff: "8:30pm" },
    { name: "CP11 Monte Moro Pass", mile: 132.6, legKm: "6.5", alt: "2789 m", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: null },
    { name: "CP12 Saas Fee", mile: 149.2, legKm: "16.6", alt: "1792 m", medical: true, dropBag: true, crew: "Designated", pacerChange: false, cutoff: "8:00am" },
    { name: "CP13 Hannigalp", mile: 166.3, legKm: "17.1", alt: "2123 m", medical: true, dropBag: false, crew: "No", pacerChange: false, cutoff: null },
    { name: "Grächen (Finish)", mile: 170.1, legKm: "3.8", alt: "1618 m", medical: true, dropBag: true, crew: "Yes", pacerChange: false, cutoff: "4:00pm" },
  ],

  pacersAllowed: false,
  noPacerNote:
    "UTMR allows no muling and no pacing at all. Support from friends and family is permitted " +
    "at designated checkpoints only, and never between them — so there are no pacer zones to " +
    "plan, only checkpoints where your crew can legally meet you.",

  pacerRules: [
    "No muling and no pacing, at any point on the course.",
    "Support from friends and family is allowed at designated checkpoints only.",
    "No support of any kind is allowed between checkpoints.",
    "Support must not interfere with the operation of the checkpoint.",
  ],

  crewRules: [
    "Driving routes between checkpoints are long and difficult — this is genuinely a foot race through terrain cars cannot shortcut.",
    "Zermatt has plentiful accommodation; Gressoney and Macugnaga have options 5–10 km away.",
    "Crew without a car should base themselves in Grächen and use Swiss public transport to reach the Zermatt and Saas Fee checkpoints.",
    "Equipment checks happen at registration the day before the race.",
    "The UTMR Facebook group \"Friends of Ultra Tour Monte Rosa\" is the organisers' suggested place to arrange car sharing.",
  ],

  aidStationSupplies:
    "Checkpoints vary between water-only points and full refreshment stations with snacks and " +
    "meals; drop bags, rest facilities, first aid, and ambulance cover are available at some but " +
    "not all. The Italian-side checkpoints after the Theodulpass are noted by the organisers for " +
    "their food and coffee. Check the official checkpoint table for exactly which services each " +
    "one offers before planning your fuelling.",

  notes: [
    "60 hours from a 04:00 Thursday start means up to two full nights out at altitude.",
    "The final 2 km to the Theodulpass (3,295 m) are run on ice. This is a genuine high-mountain course with glacier crossings.",
    "The organisers state prior mountain running experience is needed and that the full route is more challenging than UTMB.",
    "Capped at 300 starters and worth 6 ITRA points.",
    "The official table's date label for the Macugnaga cutoff appears to be a typo — see the note at the top of this file. Confirm against the current race guide.",
  ],

  sources: [
    { label: "170 km route, checkpoints & cutoffs", url: "https://www.ultratourmonterosa.com/170km-ultra-tour-info/" },
    { label: "Information for supporters", url: "https://www.ultratourmonterosa.com/useful-information/supporters/" },
    { label: "Obligatory equipment", url: "https://www.ultratourmonterosa.com/useful-information/obligatory-equipment/" },
    { label: "Regulations", url: "https://www.ultratourmonterosa.com/useful-information/regulations/" },
  ],
};
