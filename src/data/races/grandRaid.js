/* ---------------- GRAND RAID DE LA RÉUNION (DIAGONALE DES FOUS) ----------------
   Metric. Transcribed from the official 2026 "barrières horaires" PDF, which
   lists every point on the course with its opening and closing time. The
   closing time (fermeture) is the cutoff.

   Point types, from the PDF's own legend:
     DEP = Départ (start)         CP = Point de contrôle (checkpoint)
     PR  = Point repère (marker)  BV = Base vie (life base)
     ARR = Arrivée (finish)

   Rows without a closing time are indicative timing points, not eliminating
   barriers ("pointage indicatif non éliminatoire").

   The race runs Thursday 18:00 to Sunday 16:00 — 70 hours across three
   midnights. The elapsed-time rollover handles that without explicit day
   offsets because the barrier clock steps backwards at each new day.

   ASSISTANCE: the PDF has an "Assistance personnelle" column whose per-row
   values do not survive text extraction reliably, so this file does NOT guess
   which points allow it. The two Bases Vie are marked; for anything else,
   check the official PDF, which is linked below and is the authority.

   Sources (all grandraid-reunion.com, retrieved 2026-08-14):
     Barrier times PDF ... /IMG/pdf/diagonale_des_fous_barrieres_horaires_2026.pdf
     Course page ......... /fr/les-courses/la-diagonale-des-fous/
     Règlement ........... /reglement
*/

export const GRAND_RAID = {
  id: "grand-raid-reunion",
  name: "Diagonale des Fous",
  tagline: "Grand Raid de la Réunion — 180 km across the island, Saint-Pierre to Saint-Denis",
  accent: "#B5502E",
  unit: "km",
  officialUrl: "https://www.grandraid-reunion.com/fr/les-courses/la-diagonale-des-fous/",
  sourceUrl: "https://www.grandraid-reunion.com/IMG/pdf/diagonale_des_fous_barrieres_horaires_2026.pdf",

  distance: 180.6,
  elevationGain: 10199, // metres, cumulative D+ from the official table
  elevationLoss: 10161,
  cutoffHours: 70,
  startLine: "Saint-Pierre (Ravine Blanche), La Réunion",
  finishLine: "Saint-Denis (La Redoute), La Réunion",
  startTimeLabel: "6:00 PM Thursday",
  finishDeadlineLabel: "4:00 PM Sunday (70 hours)",

  keyFacts: [
    ["Distance", "180.6 km / ~112 mi"],
    ["Elevation gain", "10,199 m+"],
    ["Elevation loss", "10,161 m−"],
    ["Time limit", "70 hours"],
    ["Start", "Saint-Pierre, Thursday 18:00"],
    ["Finish", "Saint-Denis, Sunday 16:00"],
    ["Bases Vie", "Hell-Bourg, Ilet Savannah"],
    ["2026 dates", "15–18 October 2026"],
  ],

  courseNotes:
    "A diagonal crossing of Réunion from Saint-Pierre in the south to Saint-Denis in the " +
    "north, through the UNESCO-listed Pitons, Cirques et Remparts of Réunion National Park. " +
    "The race starts in darkness at 18:00 and crosses lush forest, steep rocky ridges, " +
    "ravines, and rivers, with climbs to over 2,400 m. Runners face three nights, tropical " +
    "heat, and weather that shifts fast with altitude. Note that reconnaissance between " +
    "Bassin Plat and Piton Sec is strictly forbidden — that section crosses private land " +
    "open only on race day.",

  extraColumns: [
    { key: "type", label: "Type" },
    { key: "opens", label: "Opens" },
    { key: "alt", label: "Alt" },
  ],

  aidStations: [
    { name: "Domaine Vidot", mile: 14, type: "CP1", opens: "Thu 22:00", alt: "647 m", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: "1:30am" },
    { name: "Notre Dame de la Paix (École)", mile: 33.4, type: "CP2", opens: "Fri 00:30", alt: "1687 m", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: "7:00am" },
    { name: "Nez de Bœuf (parking)", mile: 45.4, type: "CP3", opens: "Fri 01:45", alt: "2023 m", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: "10:30am" },
    { name: "Mare à Boue", mile: 55.6, type: "CP4", opens: "Fri 02:30", alt: "1606 m", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: "1:00pm" },
    { name: "Coteau Kerveguen", mile: 65.1, type: "CP5", opens: "—", alt: "2187 m", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Croisée Coteau Kerveguen", mile: 67.6, type: "CP6", opens: "Fri 04:30", alt: "2476 m", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: "5:30pm" },
    { name: "Intersection Cap Anglais", mile: 70.5, type: "PR3", opens: "—", alt: "2154 m", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Gîte de Bélouve", mile: 76.4, type: "CP7", opens: "Fri 05:30", alt: "1504 m", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: "8:30pm" },
    { name: "Hell-Bourg", mile: 80.4, type: "BV1", opens: "Fri 05:45", alt: "995 m", medical: true, dropBag: true, crew: "Base vie", pacerChange: false, cutoff: "1:00am" },
    { name: "Parking Bras Marrons", mile: 84.1, type: "PR4", opens: "—", alt: "745 m", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Ilet Mare d'Affouches", mile: 85.7, type: "PR5", opens: "—", alt: "896 m", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Grand Sable / Plaine des Merles", mile: 87, type: "PR6", opens: "—", alt: "1028 m", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Int. Bélier / La Nouvelle / Col de Fourche", mile: 92.9, type: "PR7", opens: "—", alt: "1773 m", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Plaine des Merles", mile: 93.6, type: "CP8", opens: "Fri 08:30", alt: "1808 m", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: "6:00am" },
    { name: "Départ Sentier Scout", mile: 95.8, type: "CP9", opens: "Fri 08:30", alt: "1635 m", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: "7:00am" },
    { name: "La Plaque", mile: 102.2, type: "CP10", opens: "—", alt: "906 m", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Ilet à Bourse", mile: 104.2, type: "PR9", opens: "—", alt: "896 m", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Grand Place les Bas (École)", mile: 107.6, type: "CP10", opens: "Fri 10:00", alt: "670 m", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: "11:30am" },
    { name: "Rivière des Galets — Roche Ancrée", mile: 111.1, type: "PR10", opens: "—", alt: "581 m", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Roche Plate — Plateau Cerf", mile: 116.2, type: "CP11", opens: "Fri 11:30", alt: "1257 m", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: "4:30pm" },
    { name: "La Brèche", mile: 118.7, type: "PR12", opens: "—", alt: "575 m", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Ti Col Maïdo", mile: 122.2, type: "PR12", opens: "—", alt: "1329 m", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Maïdo — Tête Dure", mile: 123.7, type: "CP12", opens: "Fri 13:30", alt: "1236 m", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: "8:30pm" },
    { name: "Ilet Savannah", mile: 140.3, type: "BV2", opens: "Fri 15:30", alt: "126 m", medical: true, dropBag: true, crew: "Base vie", pacerChange: false, cutoff: "12:15am" },
    { name: "Chemin Ratinaud — Kalla", mile: 147.7, type: "CP13", opens: "Fri 16:30", alt: "445 m", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: "3:00am" },
    { name: "Grande Montagne (La Résidence)", mile: 153.7, type: "PR13", opens: "—", alt: "57 m", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "La Possession — Place Festival", mile: 154.9, type: "CP14", opens: "Fri 17:00", alt: "3 m", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: "6:30am" },
    { name: "Grande Chaloupe", mile: 164.3, type: "CP15", opens: "Fri 18:30", alt: "10 m", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: "9:00am" },
    { name: "Saint Bernard — Les Bambous", mile: 168.8, type: "PR14", opens: "—", alt: "454 m", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "Colorado", mile: 173.6, type: "CP15", opens: "Fri 19:30", alt: "685 m", medical: true, dropBag: false, crew: "—", pacerChange: false, cutoff: "1:30pm" },
    { name: "Belvédère de La Vigie", mile: 177.6, type: "PR15", opens: "—", alt: "345 m", medical: false, dropBag: false, crew: "—", pacerChange: false, cutoff: null },
    { name: "La Redoute (Finish)", mile: 180.6, type: "ARR", opens: "Fri 20:00", alt: "49 m", medical: true, dropBag: true, crew: "Yes", pacerChange: false, cutoff: "4:00pm" },
  ],

  pacersAllowed: false,
  noPacerNote:
    "The règlement forbids competitors from being accompanied for any part of the race by " +
    "anyone not entered in it, outside the marked tolerance zones near aid posts. It names " +
    "\"lièvres\" (pacers), accompagnateurs, and \"porteurs d'eau\" (water carriers) explicitly. " +
    "Personal assistance is permitted only at the official refreshment posts.",

  pacerRules: [
    "No pacers. The règlement bans \"assistance volante\" of any kind — pacers (lièvres), accompaniers, and water carriers alike.",
    "Being accompanied by a non-participant for any part of the course, outside the marked tolerance zones near aid posts, is a penalty under Article 17.",
    "Personal assistance is allowed only at official refreshment posts set up by the organisation.",
    "Tolerance zones near aid posts are signalled by the chef de poste — stay inside them.",
  ],

  crewRules: [
    "Personal assistance happens only at official refreshment posts. The two Bases Vie — Hell-Bourg (km 80.4) and Ilet Savannah (km 140.3) — are the major ones.",
    "The authoritative list of which points allow personal assistance is the \"Assistance personnelle\" column of the official barrier-times PDF, linked below.",
    "Any personal refreshment you arrange must respect Grand Raid's distance rules, especially inside the National Park.",
    "Crew should brief themselves on protecting the natural environments the route crosses — the règlement makes runners responsible for their supporters here.",
    "Runners must install the SARA EVENT app on their phone.",
  ],

  aidStationSupplies:
    "Posts vary widely: some carry full refreshments with soup and hot meals, others are " +
    "indicative timing points with nothing. Medical cover across the course includes doctors, " +
    "nurses, physios, podiatrists, first-aiders, and osteopaths, but only at listed posts. " +
    "The barrier-times PDF marks exactly which services each point offers.",

  notes: [
    "The course page carries a standing notice that it is being updated and the route may still change for administrative or trail-condition reasons.",
    "Reconnaissance between Bassin Plat and Piton Sec is strictly forbidden — private land, open only on race day.",
    "Points marked PR are indicative timing only, with no eliminating barrier. CP, BV, and ARR points carry hard cutoffs.",
    "70 hours from an 18:00 Thursday start means three nights out for most of the field.",
    "The barrier table can be modified by the organisation as circumstances require — check the current PDF before the race.",
  ],

  sources: [
    { label: "Barrier times (official PDF)", url: "https://www.grandraid-reunion.com/IMG/pdf/diagonale_des_fous_barrieres_horaires_2026.pdf" },
    { label: "Course description", url: "https://www.grandraid-reunion.com/fr/les-courses/la-diagonale-des-fous/" },
    { label: "Règlement", url: "https://www.grandraid-reunion.com/reglement" },
  ],
};
