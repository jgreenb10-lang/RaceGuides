/* ---------------- WESTERN STATES ENDURANCE RUN ----------------
   Every figure below is transcribed from the race's own website. Nothing here
   is estimated or inferred — where a value isn't published, the field is left
   out rather than guessed.

   Sources (all wser.org, retrieved 2026-08-13):
     Checkpoint chart, cutoffs, 24/30-hour splits ... /course/aid-stations/
     Course, elevation, start time, 30-hour limit ... /course-description/
     Pacer rules ............................. /pacer-rules/
     Crew rules .............................. /crew-rules/
*/

export const WESTERN_STATES = {
  id: "western-states",
  name: "Western States Endurance Run",
  tagline: "The original 100-miler — Olympic Valley to Auburn, California",
  accent: "#1F6F6B",
  officialUrl: "https://www.wser.org/",
  sourceUrl: "https://www.wser.org/course/aid-stations/",

  distance: 100.2,
  elevationGain: 18090, // 2,550 ft to Emigrant Pass + 15,540 ft thereafter
  elevationLoss: 22970,
  cutoffHours: 30,
  startLine: "Olympic Valley, CA",
  finishLine: "Placer High School, Auburn, CA",
  startTimeLabel: "5:00 AM Saturday (last full weekend in June)",
  finishDeadlineLabel: "10:59:59 AM Sunday",

  keyFacts: [
    ["Distance", "100.2 mi"],
    ["Elevation gain", "~18,090 ft"],
    ["Elevation loss", "~22,970 ft"],
    ["Time limit", "30 hours"],
    ["Start", "Olympic Valley, 5:00 AM"],
    ["Finish", "Placer High School, Auburn"],
    ["Aid stations", "20 (10 major medical checkpoints)"],
    ["Entry", "Lottery (plus qualifying race)"],
  ],

  courseNotes:
    "Climbs 2,550 ft in the first 4.5 miles from the Olympic Valley floor (6,200 ft) " +
    "to Emigrant Pass (8,750 ft), then heads west along the Western States Trail, " +
    "climbing another 15,540 ft and descending 22,970 ft into Auburn. Much of the " +
    "trail is remote and reachable only by foot, horse, or helicopter. The canyons " +
    "between Last Chance and Michigan Bluff are the hottest, hardest miles on the course.",

  /* Checkpoint chart, verbatim from the official table.
     cutoff = time you must LEAVE the aid station by.
     A cutoff marked default:true is a fallback equal to the next station's cutoff,
     intended for emergency use at hard-to-access stations. */
  aidStations: [
    { name: "Olympic Valley", mile: 0, medical: true, dropBag: false, crew: "Yes (multiple)", pacerChange: false, split24: "5:00am", split30: "5:00am", cutoff: null },
    { name: "Lyon Ridge", mile: 10.3, medical: false, dropBag: false, crew: "No", pacerChange: false, split24: "7:10am", split30: "7:40am", cutoff: "10:30am", cutoffDefault: true },
    { name: "Red Star Ridge", mile: 15.8, medical: true, dropBag: true, crew: "No", pacerChange: false, split24: "8:20am", split30: "9:10am", cutoff: "10:30am" },
    { name: "Duncan Canyon", mile: 24.4, medical: false, dropBag: false, crew: "Yes (1 vehicle)", pacerChange: false, split24: "10:00am", split30: "11:15am", cutoff: "12:30pm" },
    { name: "Robinson Flat", mile: 30.3, medical: true, dropBag: true, crew: "Yes (shuttle)", pacerChange: false, split24: "11:30am", split30: "1:10pm", cutoff: "2:10pm" },
    { name: "Miller's Defeat", mile: 34.4, medical: false, dropBag: false, crew: "No", pacerChange: false, split24: "12:25pm", split30: "2:15pm", cutoff: "3:15pm" },
    { name: "Dusty Corners", mile: 38, medical: false, dropBag: false, crew: "Yes (1 vehicle)", pacerChange: false, split24: "1:10pm", split30: "3:05pm", cutoff: "4:05pm" },
    { name: "Last Chance", mile: 43.3, medical: true, dropBag: true, crew: "No", pacerChange: false, split24: "2:05pm", split30: "4:20pm", cutoff: "5:25pm" },
    { name: "Devil's Thumb", mile: 47.8, medical: true, dropBag: true, crew: "No", pacerChange: false, split24: "3:30pm", split30: "6:05pm", cutoff: "7:10pm" },
    { name: "El Dorado Creek", mile: 52.9, medical: false, dropBag: false, crew: "No", pacerChange: false, split24: "4:40pm", split30: "7:30pm", cutoff: "8:40pm" },
    { name: "Michigan Bluff", mile: 55.7, medical: true, dropBag: true, crew: "Yes (shuttle)", pacerChange: "After 8pm", split24: "5:40pm", split30: "8:50pm", cutoff: "9:55pm" },
    { name: "Foresthill", mile: 62, medical: true, dropBag: true, crew: "Yes (multiple)", pacerChange: true, split24: "7:15pm", split30: "10:45pm", cutoff: "11:45pm" },
    { name: "Dardanelles (Cal-1)", mile: 65.7, medical: false, dropBag: false, crew: "No", pacerChange: false, split24: "8:00pm", split30: "12:00am", cutoff: "2:40am", cutoffDefault: true },
    { name: "Peachstone (Cal-2)", mile: 70.7, medical: true, dropBag: false, crew: "No", pacerChange: false, split24: "9:20pm", split30: "1:40am", cutoff: "2:40am" },
    { name: "Ford's Bar (Cal-3)", mile: 73, medical: false, dropBag: false, crew: "No", pacerChange: false, split24: "10:00pm", split30: "2:35am", cutoff: "5:00am", cutoffDefault: true },
    { name: "Rucky Chucky", mile: 78, medical: true, dropBag: "Far Side", crew: "Yes (Near Side shuttle)", pacerChange: true, split24: "11:10pm", split30: "4:00am", cutoff: "5:00am" },
    { name: "Green Gate", mile: 79.8, medical: false, dropBag: false, crew: "Yes (on foot)", pacerChange: true, split24: "11:45pm", split30: "4:55am", cutoff: "5:50am" },
    { name: "Auburn Lake Trails", mile: 85.2, medical: true, dropBag: true, crew: "No", pacerChange: false, split24: "1:05am", split30: "6:25am", cutoff: "7:15am" },
    { name: "Quarry Rd", mile: 90.7, medical: false, dropBag: false, crew: "No", pacerChange: false, split24: "2:25am", split30: "8:00am", cutoff: "8:40am" },
    { name: "Pointed Rocks", mile: 94.3, medical: true, dropBag: true, crew: "Yes (on foot)", pacerChange: true, split24: "3:30am", split30: "9:15am", cutoff: "9:40am" },
    { name: "Robie Point", mile: 98.9, medical: false, dropBag: false, crew: "Yes (on foot)", pacerChange: true, split24: "4:40am", split30: "10:38am", cutoff: "11:00am", cutoffDefault: true },
    { name: "Placer High School", mile: 100.2, medical: true, dropBag: true, crew: "Yes (multiple)", pacerChange: false, split24: "5:00am", split30: "11:00am", cutoff: "11:00am" },
  ],

  /* Pacing legally starts at Foresthill (mile 62). Michigan Bluff (55.7) only
     counts if the runner leaves it after 8 p.m., so it is not treated as the
     default zone start. */
  pacerStartMile: 62,
  pacerStartStation: "Foresthill",
  pacerChangeStations: ["Foresthill", "Rucky Chucky", "Green Gate", "Pointed Rocks", "Robie Point"],

  pacerRules: [
    "One pacer at a time, from Foresthill (mile 62) to the finish.",
    "Leaving Michigan Bluff (mile 56) after 8 p.m. earns you a pacer from there instead.",
    "No pacers or crew anywhere along Bath Rd as of 2025 — they wait inside the Foresthill aid station.",
    "Pacer swaps only at Foresthill, Rucky Chucky (near side), Green Gate, Pointed Rocks, and Robie Point.",
    "Pacers must be 18+, collect a number, and sign a release at Pacer Central.",
    "Muling is expressly forbidden — no carrying water, food, lights, or clothing for your runner.",
    "Pacers enter and leave every aid station with their runner, never ahead or behind.",
    "From the top of Bath Road to Main & California, and from Robie Point to the finish, anyone may accompany the runner — but still no aid or muling.",
  ],

  crewRules: [
    "Crew only at aid stations designated for crew in that year's Participant Guide.",
    "Stay within a 200-yard radius of the aid station while helping your runner.",
    "One vehicle per runner at every aid station except Foresthill. No motor homes except at Foresthill.",
    "No crew at all at Lyon Ridge, Red Star Ridge, Miller's Defeat, Last Chance, Devil's Thumb, El Dorado Creek, Dardanelles, Peachstone, Ford's Bar, Rucky Chucky (far side), Auburn Lake Trails, or Quarry Road.",
    "No crew vehicles at Deadwood Ridge, Bath Road, either side of the Rucky Chucky river crossing, Green Gate, Highway 49 Crossing, or Robie Point.",
    "Foot access only: Rucky Chucky near side (shuttle or 3.5-mi hike), Green Gate (1.25-mi hike), Pointed Rocks (0.75-mi hike), and Robie Point.",
    "At Foresthill, crews may give aid at one location only between the top of Bath Road and California Street.",
    "Drive at or below the speed limit — access roads are narrow and enforcement is strict. Bad parking can get your runner disqualified.",
  ],

  aidStationSupplies:
    "Water, GU Hydration Drink Tabs, ROCTANE Energy Drink, Sprite/7Up, and Coke at most stations. " +
    "Night stations add soup, hot coffee, and hot chocolate. Food runs to saltines, pretzels, chips, " +
    "GU ROCTANE and Liquid Energy Gels, oranges, bananas, melon, potatoes, cookies, candy, and sandwiches. " +
    "Hot soup at the River Crossing, Auburn Lake Trails, and Pointed Rocks.",

  notes: [
    "Western States is a cupless race — carry your own soft flask or cup.",
    "Cutoffs are the time you must LEAVE the aid station, not arrive. Miss one and you are pulled.",
    "Ibuprofen and Naprosyn are not provided at aid stations — NSAIDs plus 100 miles is a kidney risk.",
    "Cutoffs are generous early. If you are near them in the first half, the 30-hour finish is already in danger.",
    "Drop bags must fit through a 6\" x 8\" opening, be no longer than 16\", and one per aid station.",
  ],

  sources: [
    { label: "Aid stations & cutoffs", url: "https://www.wser.org/course/aid-stations/" },
    { label: "Course description", url: "https://www.wser.org/course-description/" },
    { label: "Pacer rules", url: "https://www.wser.org/pacer-rules/" },
    { label: "Crew rules", url: "https://www.wser.org/crew-rules/" },
  ],
};
