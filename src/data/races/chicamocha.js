/* ---------------- CHICAMOCHA CANYON RACE — 100 MILLAS ----------------
   Metric. Colombia's longest and roughest trail race, through the Chicamocha
   Canyon in Santander, starting and finishing in San Gil.

   Two kinds of closing time appear on the official checkpoint table and they
   are NOT the same thing:
     - Six checkpoints carry a hard "CIERRE DE PC" tied to a published
       TIEMPO LÍMITE in hours. Those are the real cutoffs and are the only
       ones this file puts in the `cutoff` field.
     - The rest show an approximate closing time ("aproximadamente"). Those
       are kept in a separate column so the pace calculator never treats a
       soft estimate as a hard barrier.

   PCAA = "Puesto de Control Asistido Autorizado" — the checkpoints where
   personal assistance from family/crew is authorised.

   Sources (all chicamochacanyonrace.com, retrieved 2026-08-14):
     Checkpoint table image .. /wp-content/uploads/2026/07/TABLAS-DE-PCS...png
     Technical specs image ... /wp-content/uploads/2026/06/100-millas-2025-aspectos-tecnicos.jpg
     Race page ............... /100-millas/
*/

export const CHICAMOCHA = {
  id: "chicamocha-canyon-race",
  name: "Chicamocha Canyon Race 100 Millas",
  tagline: "San Gil, Colombia — the longest and roughest trail race in the country",
  accent: "#C1571F",
  unit: "km",
  officialUrl: "https://chicamochacanyonrace.com/100-millas/",
  sourceUrl: "https://chicamochacanyonrace.com/100-millas/",

  distance: 166.51,
  elevationGain: 6712, // metres
  elevationLoss: 6712,
  cutoffHours: 49,
  startLine: "San Gil (Centro Comercial El Puente), Santander",
  finishLine: "San Gil, Santander",
  startTimeLabel: "8:00 AM Saturday",
  finishDeadlineLabel: "9:00 AM Monday (49 hours)",

  keyFacts: [
    ["Distance", "166.51 km / ~103 mi"],
    ["Elevation gain", "6,712 m+"],
    ["Elevation loss", "6,712 m−"],
    ["Time limit", "49 hours"],
    ["High / low point", "2,151 m / 466 m"],
    ["Longest climb", "1,180 m"],
    ["Typical temps", "16–40 °C"],
    ["Technical surface", "70%"],
  ],

  courseNotes:
    "A loop from San Gil through the Chicamocha Canyon, climbing hard to the south-east onto " +
    "the high left bank of the canyon between nature reserves and the old cobbled roads of " +
    "Mogotes and Curití. After the Picacho de Aratoca the route descends the central spine of " +
    "the canyon to Panachi, then drops through technical terrain into the lowest part of the " +
    "race at Jordán before rejoining the CCR marathon course back to San Gil. The 2026 edition " +
    "is roughly 70% new route. Between 24 and 49 hours of running, one or two nights, " +
    "temperatures from 16 to 40 °C, and 70% technical surface. Difficulty is rated máxima.",

  extraColumns: [
    { key: "alt", label: "Alt" },
    { key: "limitH", label: "Limit" },
    { key: "approxClose", label: "Approx close" },
  ],

  aidStations: [
    { name: "Polideportivo Palocortado", mile: 17.5, alt: "1990 m", limitH: "—", approxClose: "Sat ~3:00pm", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Pitiguao (PCAA)", mile: 33.69, alt: "1709 m", limitH: "9 h", approxClose: "—", medical: true, dropBag: false, crew: "Assistance", pacerChange: false, cutoff: "5:00pm" },
    { name: "K45", mile: 44.69, alt: "2150 m", limitH: "—", approxClose: "Sat ~8:00pm", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Curití (PCAA)", mile: 54.1, alt: "1490 m", limitH: "12 h", approxClose: "—", medical: true, dropBag: true, crew: "Assistance", pacerChange: false, cutoff: "8:00pm" },
    { name: "Las Vueltas", mile: 61.6, alt: "1770 m", limitH: "—", approxClose: "Sat ~11:00pm", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Morros", mile: 73, alt: "1143 m", limitH: "—", approxClose: "Sun ~1:00am", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Aratoca (PCAA)", mile: 85.7, alt: "1774 m", limitH: "24 h", approxClose: "—", medical: true, dropBag: false, crew: "Assistance", pacerChange: false, cutoff: "8:00am" },
    { name: "Panachi (PCAA)", mile: 104.6, alt: "1297 m", limitH: "—", approxClose: "Sun ~12:00pm", medical: true, dropBag: false, crew: "Assistance", pacerChange: false, cutoff: null },
    { name: "Jordán", mile: 120.48, alt: "470 m", limitH: "36 h", approxClose: "—", medical: true, dropBag: true, crew: "—", pacerChange: false, cutoff: "8:00pm" },
    { name: "El Punto", mile: 128.88, alt: "1554 m", limitH: "—", approxClose: "Mon ~1:00am", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Villanueva (PCAA)", mile: 135.88, alt: "1455 m", limitH: "—", approxClose: "Mon ~3:00am", medical: true, dropBag: false, crew: "Assistance", pacerChange: false, cutoff: null },
    { name: "Barichara (PCAA)", mile: 144.38, alt: "1337 m", limitH: "42 h", approxClose: "—", medical: true, dropBag: false, crew: "Assistance", pacerChange: false, cutoff: "2:00am" },
    { name: "Hotel Carigua", mile: 153.48, alt: "1811 m", limitH: "—", approxClose: "Mon ~5:00am", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "San Gil (Meta)", mile: 166.51, alt: "1114 m", limitH: "49 h", approxClose: "—", medical: true, dropBag: true, crew: "Yes", pacerChange: false, cutoff: "9:00am" },
  ],

  pacersAllowed: false,
  noPacerNote:
    "CCR publishes no pacer provision. Family and crew support happens at the five designated " +
    "assistance points — the checkpoints marked PCAA (Puesto de Control Asistido Autorizado) — " +
    "rather than through pacers on course. Confirm the current rules in the Manual del Corredor " +
    "before relying on this.",

  pacerRules: [
    "Assistance from family and crew is authorised at PCAA checkpoints: Pitiguao, Curití, Aratoca, Panachi, Villanueva, and Barichara.",
    "The technical sheet lists five family assistance points and two runner drop bags (Curití and Jordán).",
    "The Manual del Corredor is the authority on what assistance is permitted — check it before the race.",
  ],

  crewRules: [
    "Personal assistance only at PCAA checkpoints. Curití holds runner bag no. 1 and Jordán holds bag no. 2.",
    "Hot food is served at Curití, Aratoca, Jordán, Barichara, and the finish. Hydration is available at all 13 hydration zones.",
    "Temperatures swing from 16 to 40 °C — crew should plan ice and cold fluids for the low canyon sections around Jordán (470 m).",
    "The route can change at short notice for safety reasons; entrants are notified directly.",
  ],

  aidStationSupplies:
    "13 hydration zones, 4 feeding zones, and 15 on-route controls. Every checkpoint carries " +
    "hydration and fruit; hot food appears at Curití, Aratoca, Jordán, Barichara, and the " +
    "finish. First aid is available at most points.",

  notes: [
    "Only six checkpoints have hard cutoffs, tied to published hour limits: Pitiguao (9h), Curití (12h), Aratoca (24h), Jordán (36h), Barichara (42h), and the finish (49h). The other closing times are approximate and are shown in their own column here.",
    "The 2026 edition ran on 18 July 2026. Check the official site for the next edition's date and updated tables.",
    "Roughly 70% of the 2026 route was new, and the organisers expect faster times than previous years.",
    "Worth 6 ITRA points and carries a UTMB Index.",
    "The canyon floor at Jordán sits at 470 m and gets brutally hot; the high point is 2,151 m. Plan for both.",
    "The 100-mile route had a late variation between Aratoca and Panachi (sector Picacho) — always download the current GPX.",
  ],

  sources: [
    { label: "100 Millas race page", url: "https://chicamochacanyonrace.com/100-millas/" },
    { label: "Manual del corredor & FAQ", url: "https://chicamochacanyonrace.com/manualdelcorredor-faqs/" },
    { label: "Checkpoint table (image)", url: "https://chicamochacanyonrace.com/wp-content/uploads/2026/07/TABLAS-DE-PCS.pptx-33-x-21.6-cm-33-x-25-cm-36-x-30-cm-6.png" },
  ],
};
