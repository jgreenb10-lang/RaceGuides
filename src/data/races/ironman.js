/* ---------------- IRONMAN RACE PROFILES ----------------
   All 40 US IRONMAN and IRONMAN 70.3 races, scraped from each race's own page
   on ironman.com on 2026-08-14. Per race we hold: the next scheduled date, the
   host location, the course profile IRONMAN publishes for each discipline, and
   the typical air and water temperatures.

   WHAT IS DELIBERATELY ABSENT: cut-off times and aid station counts. IRONMAN
   sets those per event and publishes them only in each event's Athlete
   Information Guide, so inventing them here would be exactly the kind of wrong
   number that ruins a race plan. Every profile links its own guide instead.

   The date shown is the NEXT scheduled edition as ironman.com lists it. Races
   whose 2026 running has already happened now show 2027 dates, and some show
   TBD because IRONMAN has not published the next date yet.

   Rows: [id, slug, tier, date, city, state, swim, bike, run, airHiF, airHiC,
          airLoF, airLoC, waterF, waterC]
   A null water temperature means ironman.com publishes none for that race.
*/

import {
  wetsuitStatus,
  SWIM_RULES,
  BIKE_RULES,
  PENALTY_RULES,
  RESULT_CODES,
  NO_PACER_NOTE,
  RULES_SOURCES,
} from "../ironmanRules.js";
import { ALL_RACES } from "../races.js";

/* Race names come from the directory rather than being derived from the id.
   Deriving them mangled the awkward ones — "LA Quinta" instead of La Quinta,
   "Coeur Dalene" instead of Coeur d'Alene, and the hyphenated Dallas-Little Elm
   and Rockford-Illinois. The directory already holds the official names, so
   there is no reason to have a second, worse copy. */
const NAME_BY_ID = Object.fromEntries(ALL_RACES.map((r) => [r.id, r.name]));

const FULL = "full";
const HALF = "703";

// prettier-ignore
const RAW = [
  ["im-texas", "im-texas", FULL, "April 24, 2027", "The Woodlands", "TX", "Lake", "Flat", "Rolling", 86, 30, 69, 20, 74, 23],
  ["im-jacksonville", "im-jacksonville", FULL, "May 16, 2027", "Jacksonville", "FL", "River", "Flat", "Rolling", 92, 33, 65, 18, 79, 26],
  ["im-lake-placid", "im-lake-placid", FULL, "July 25, 2027", "Lake Placid", "NY", "Lake", "Hilly", "Rolling", 75, 24, 50, 10, 72, 22],
  ["im-wisconsin", "im-wisconsin", FULL, "September 13, 2026", "Madison", "WI", "Lake", "Rolling", "Hilly", 77, 25, 56, 13, 70, 21],
  ["im-maryland", "im-maryland", FULL, "September 19, 2026", "Cambridge", "MD", "River", "Flat", "Flat", 80, 27, 59, 15, 72, 22],
  ["im-chattanooga", "im-chattanooga", FULL, "September 27, 2026", "Chattanooga", "TN", "River", "Rolling", "Rolling", 82, 28, 65, 18, 76, 24],
  ["im-world-championship", "im-world-championship-kona", FULL, "October 10, 2026", "Kona", "HI", "Ocean", "Rolling", "Rolling", 86, 30, 75, 24, null, null],
  ["im-california", "im-california", FULL, "October 18, 2026", "Sacramento", "CA", "River", "Flat", "Flat", 81, 27, 52, 11, 62, 17],
  ["im-florida", "im-florida", FULL, "November 7, 2026", "Panama City Beach", "FL", "Ocean", "Flat", "Flat", 81, 27, 61, 16, 71, 22],

  ["im703-dallas-little-elm", "im703-dallas-little-elm", HALF, "March 14, 2027", "Dallas", "TX", "Lake", "Rolling", "Rolling", 83, 28, 63, 17, 66, 19],
  ["im703-oceanside", "im703-oceanside", HALF, "April 3, 2027", "Oceanside", "CA", "Bay", "Hilly", "Rolling", 69, 21, 45, 7, 61, 16],
  ["im703-texas", "im703-texas", HALF, "April 4, 2027", "Galveston Island", "TX", "Bay", "Flat", "Flat", 79, 26, 67, 19, 71, 22],
  ["im703-gulf-coast", "im703-gulf-coast", HALF, "May 8, 2027", "Panama City Beach", "FL", "Ocean", "Flat", "Flat", 83, 29, 71, 22, 76, 24],
  ["im703-chattanooga", "im703-chattanooga", HALF, "May 16, 2027", "Chattanooga", "TN", "River", "Rolling", "Rolling", 84, 29, 63, 17, 72, 22],
  ["im703-hawaii", "im703-hawaii", HALF, "TBD, 2027", "Kohala Coast", "HI", "Ocean", "Rolling", "Rolling", 85, 29, 73, 23, 78, 26],
  ["im703-western-massachusetts", "im703-western-massachusetts", HALF, "TBD", "Springfield", "MA", "River", "Hilly", "Rolling", 74, 23, 53, 12, 67, 19],
  ["im703-omaha", "im703-omaha", HALF, "June 6, 2027", "Omaha", "NE", "Lake", "Rolling", "Rolling", 84, 29, 62, 17, null, null],
  ["im703-boulder", "im703-boulder", HALF, "TBD", "Boulder", "CO", "Reservoir", "Hilly", "Hilly", 79, 26, 61, 16, 71, 22],
  ["im703-pennsylvania", "im703-pennsylvania", HALF, "TBD", "State College", "PA", "Lake", "Rolling", "Rolling", 69, 21, 57, 14, 76, 24],
  ["im703-eagleman", "im703-eagleman", HALF, "June 13, 2027", "Cambridge", "MD", "River", "Flat", "Flat", 86, 30, 68, 20, 75, 24],
  ["im703-rockford-illinois", "im703-rockford-illinois", HALF, "June 13, 2027", "Rockford", "IL", "River", "Rolling", "Flat", 85, 29, 63, 17, 79, 26],
  ["im703-coeur-dalene", "im703-coeur-dalene", HALF, "TBD", "Coeur d'Alene", "ID", "Lake", "Hilly", "Rolling", 69, 21, 46, 8, 68, 20],
  ["im703-muncie", "im703-muncie", HALF, "TBD", "Muncie", "IN", "Reservoir", "Flat", "Rolling", 87, 31, 65, 18, 77, 25],
  ["im703-musselman", "im703-musselman", HALF, "July 11, 2027", "Geneva", "NY", "Lake", "Rolling", "Rolling", 81, 27, 64, 18, 72, 22],
  ["im703-new-mexico", "im703-ruidoso-new-mexico", HALF, "TBD", "Ruidoso", "NM", "Lake", "Rolling", "Hilly", 83, 29, 60, 16, 65, 18],
  ["im703-oregon", "im703-oregon", HALF, "TBD", "Salem", "OR", "River", "Flat", "Flat", 90, 32, 57, 14, 72, 22],
  ["im703-ohio", "im703-ohio", HALF, "TBD", "Sandusky", "OH", "Lake", "Flat", "Rolling", 80, 27, 63, 17, 77, 25],
  ["im703-boise", "im703-boise", HALF, "TBD", "Boise", "ID", "Reservoir", "Hilly", "Flat", 95, 35, 67, 19, 67, 19],
  ["im703-maine", "im703-maine", HALF, "July 25, 2027", "Augusta", "ME", "River", "Rolling", "Rolling", 82, 28, 62, 17, 75, 24],
  ["im703-northern-california", "im703-northern-california", HALF, "August 16, 2026", "Redding", "CA", "Lake", "Rolling", "Flat", 101, 38, 71, 22, 76, 24],
  ["im703-wisconsin", "im703-wisconsin", HALF, "September 12, 2026", "Madison", "WI", "Lake", "Rolling", "Hilly", 79, 26, 52, 11, 71, 22],
  ["im703-santa-cruz", "im703-santa-cruz", HALF, "September 13, 2026", "Santa Cruz", "CA", "Ocean", "Flat", "Rolling", 68, 20, 56, 13, 61, 16],
  ["im703-washington", "im703-washington", HALF, "September 20, 2026", "Richland", "WA", "River", "Rolling", "Flat", 78, 25, 50, 10, 70, 21],
  ["im703-michigan", "im703-michigan", HALF, "September 20, 2026", "Frankfort", "MI", "Lake", "Rolling", "Rolling", 78, 25, 58, 14, 65, 18],
  ["im703-new-york", "im703-new-york", HALF, "September 26, 2026", "Jones Beach", "NY", "Bay", "Flat", "Flat", 73, 23, 62, 16, 65, 18],
  ["im703-augusta", "im703-augusta", HALF, "September 27, 2026", "Augusta", "GA", "River", "Rolling", "Rolling", 76, 25, 66, 19, 74, 23],
  ["im703-waco", "im703-waco", HALF, "October 4, 2026", "Waco", "TX", "River", "Flat", "Rolling", 92, 34, 64, 18, 78, 26],
  ["im703-north-carolina", "im703-north-carolina", HALF, "October 17, 2026", "Wilmington", "NC", "Ocean", "Flat", "Rolling", 68, 20, 43, 6, 67, 19],
  ["im703-la-quinta", "im703-la-quinta", HALF, "December 6, 2026", "La Quinta", "CA", "Lake", "Flat", "Flat", 80, 26, 54, 12, 57, 14],
  ["im703-florida", "im703-florida", HALF, "December 13, 2026", "Haines City", "FL", "Lake", "Rolling", "Rolling", 78, 25, 53, 12, 67, 19],
];

const SEGMENTS = {
  [FULL]: { swim: "2.4 mi / 3.8 km", bike: "112 mi / 180 km", run: "26.2 mi / 42.2 km", total: "140.6 mi" },
  [HALF]: { swim: "1.2 mi / 1.9 km", bike: "56 mi / 90 km", run: "13.1 mi / 21.1 km", total: "70.3 mi" },
};

const TIER_LABEL = { [FULL]: "IRONMAN", [HALF]: "IRONMAN 70.3" };

function build(row) {
  const [id, slug, tier, date, city, state, swim, bike, run, hiF, hiC, loF, loC, waterF, waterC] = row;
  const seg = SEGMENTS[tier];
  const name = NAME_BY_ID[id] || id;

  return {
    id,
    slug,
    tier,
    tierLabel: TIER_LABEL[tier],
    name,
    date,
    city,
    state,
    location: `${city}, ${state}`,
    officialUrl: `https://www.ironman.com/races/${slug}`,
    athleteGuideUrl: `https://www.ironman.com/races/${slug}/pre-race-info`,
    courseUrl: `https://www.ironman.com/races/${slug}/course`,
    scheduleUrl: `https://www.ironman.com/races/${slug}/schedule`,
    segments: seg,
    swimType: swim,
    bikeProfile: bike,
    runProfile: run,
    airHiF: hiF, airHiC: hiC,
    airLoF: loF, airLoC: loC,
    waterF, waterC,
    wetsuit: wetsuitStatus(waterC),
  };
}

export const IRONMAN_RACES = RAW.map(build);
export const IRONMAN_BY_ID = Object.fromEntries(IRONMAN_RACES.map((r) => [r.id, r]));

export { SWIM_RULES, BIKE_RULES, PENALTY_RULES, RESULT_CODES, NO_PACER_NOTE, RULES_SOURCES };
