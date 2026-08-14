/* ---------------- IRONMAN GLOBAL COMPETITION RULES ----------------
   These apply to every IRONMAN and IRONMAN 70.3 race, so they live in one
   place rather than being repeated in 40 data files. Transcribed from the
   official 2026 IRONMAN Competition Rules PDF (effective 2 March 2026).

   IMPORTANT — what is NOT here: cut-off times. The rules state explicitly
   that swim, bike, run, and overall cut-offs are set per event and published
   in that event's Athlete Information Guide. This file therefore does not
   assert any cut-off numbers, and each race links its own guide instead.

   Source: https://www.ironman.com/sites/default/files/2026-02/2026%20IRONMAN%20Competition%20Rules_Final_V2.pdf
   Rules index: https://www.ironman.com/resources/rules-and-policies/competition-rules
*/

/* Water-temperature thresholds, in Celsius, straight from Section 4.02. The
   race-morning call belongs to the Head Referee — these are the rule limits. */
export const WETSUIT_LIMITS = {
  mandatoryBelowC: 16, // 60.8 F — wetsuits required at or below this
  ageGroupMaxC: 24.5, // 76.1 F — legal up to and including
  nonCompetitiveMaxC: 28.8, // 83.8 F — above ageGroupMax, IRONMAN MAY allow a
  // separate non-competitive wetsuit wave, which forfeits
  // age-group awards and World Championship slots
  proMaxC: 21.9, // 71.5 F — professionals only
  bootiesAtOrBelowC: 18.3, // 65.0 F — neoprene booties allowed only at/below
  maxThicknessMm: 5,
};

/* Given a water temperature in Celsius, work out what the rules allow.
   Returns null when no temperature is known rather than guessing. */
export function wetsuitStatus(waterC) {
  if (waterC === null || waterC === undefined || !isFinite(waterC)) return null;
  const L = WETSUIT_LIMITS;
  if (waterC < L.mandatoryBelowC) {
    return {
      level: "mandatory",
      ageGroup: "Wetsuit MANDATORY",
      pro: "Wetsuit MANDATORY",
      detail: `Below ${L.mandatoryBelowC} °C / 60.8 °F, wetsuits are compulsory for professionals and age-groupers alike.`,
    };
  }
  if (waterC <= L.proMaxC) {
    return {
      level: "allowed",
      ageGroup: "Wetsuit legal",
      pro: "Wetsuit legal",
      detail: `At or below ${L.proMaxC} °C / 71.5 °F, wetsuits are legal for every athlete including professionals.`,
    };
  }
  if (waterC <= L.ageGroupMaxC) {
    return {
      level: "allowed",
      ageGroup: "Wetsuit legal",
      pro: "No wetsuit (pros)",
      detail: `Age-groupers may wear a wetsuit up to ${L.ageGroupMaxC} °C / 76.1 °F, but professionals lose the option above ${L.proMaxC} °C / 71.5 °F.`,
    };
  }
  if (waterC <= L.nonCompetitiveMaxC) {
    return {
      level: "conditional",
      ageGroup: "Non-competitive wave only",
      pro: "No wetsuit",
      detail: `Above ${L.ageGroupMaxC} °C / 76.1 °F, IRONMAN may at its discretion offer a separate non-competitive wetsuit wave. Taking it forfeits age-group awards and World Championship slots.`,
    };
  }
  return {
    level: "prohibited",
    ageGroup: "Wetsuit PROHIBITED",
    pro: "Wetsuit PROHIBITED",
    detail: `Above ${L.nonCompetitiveMaxC} °C / 83.8 °F, wetsuits are banned outright.`,
  };
}

export const SWIM_RULES = [
  "Wetsuits may cover anything except face, hands, and feet, and may not exceed 5 mm thick.",
  "A race kit may be worn under the wetsuit, and a neoprene cap is allowed when wetsuits are — but the official issued cap goes on the outside.",
  "Neoprene booties are only permitted when the water is 18.3 °C / 65 °F or colder.",
  "When wetsuits are banned, swimwear must be 100% textile, must not cover the neck, and must not extend past the elbows or knees. Buoyancy shorts are prohibited.",
  "Personal paddlers and escorts are prohibited — an automatic disqualification.",
  "You may hold a kayak, boat, or stationary raft without penalty, so long as you make no forward progress doing so.",
  "Knowing and following the swim course is entirely your responsibility. No time adjustments are made for going off course.",
  "Swim cut-off times are published in each event's Athlete Information Guide.",
];

export const BIKE_RULES = [
  "Drafting is prohibited. The draft zone is 12 m long for age-groupers (about six bike lengths) and 20 m for professionals.",
  "Once you enter someone's draft zone you must complete the pass — backing out is itself a violation.",
  "Age-groupers get 25 seconds to complete a pass; professionals get 45 seconds.",
  "Passing a professional must be done to the side, never straight up the slipstream from behind.",
  "An overtaken athlete must drop out of the passing athlete's draft zone immediately and keep moving rearward out of it.",
  "Staying inside the draft zone of a passing athlete for more than 25 seconds is an overtaken violation.",
];

export const PENALTY_RULES = [
  "Yellow card: 30-second penalty at 70.3 races, 60-second at full IRONMAN races.",
  "Blue card: 2:00 penalty at 70.3 races, 3:00 at full IRONMAN races. This is the drafting penalty.",
  "Red card: disqualification.",
  "Referees issue penalties with a coloured card plus a verbal instruction.",
  "Serious violations can bring suspension from multiple events or lifetime expulsion.",
  "A referee may penalise or disqualify anyone judged to have gained an unfair advantage or created a dangerous situation.",
];

export const RESULT_CODES = [
  ["DNS", "Did not start — entered but never started."],
  ["DSQ", "Disqualified — started and was disqualified."],
  ["DNF", "Did not finish — started but never crossed the line, or crossed after the course closed."],
  [
    "NC",
    "Not classified — finished before the course closed but missed a discipline or overall cut-off. You get a time, not a result.",
  ],
];

/* The single biggest difference from the ultras on this site. */
export const NO_PACER_NOTE =
  "IRONMAN is an individual, unassisted race. There are no pacers, and no crew on course — " +
  "everything you need comes from you, your bike, or an official aid station. Personal " +
  "paddlers or escorts in the swim are an automatic disqualification, and drafting on the " +
  "bike carries a 2- to 3-minute penalty. Support crews spectate; they do not assist.";

export const RULES_SOURCES = [
  {
    label: "2026 IRONMAN Competition Rules (PDF)",
    url: "https://www.ironman.com/sites/default/files/2026-02/2026%20IRONMAN%20Competition%20Rules_Final_V2.pdf",
  },
  {
    label: "Rules & policies index",
    url: "https://www.ironman.com/resources/rules-and-policies/competition-rules",
  },
];
