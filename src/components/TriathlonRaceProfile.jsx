import React, { useState, useEffect, useMemo } from "react";
import { ExternalLink, MapPin, Waves, Bike, Footprints, AlertTriangle, Check, Thermometer } from "lucide-react";
import { wetsuitStatus, WETSUIT_LIMITS } from "../data/ironmanRules.js";
import { SWIM_RULES, BIKE_RULES, PENALTY_RULES, RESULT_CODES, NO_PACER_NOTE, RULES_SOURCES } from "../data/ironmanRules.js";

/* Profile page for IRONMAN and IRONMAN 70.3 races.

   Deliberately NOT a copy of UltraRaceProfile. A triathlon has no pacers, no
   crew on course, and no aid-station cutoff chart to project against — so
   there is no pacer-zone tool and no cutoff calculator here. What it has
   instead is the stuff that actually decides a triathlon day: the wetsuit
   call, the two transitions, drafting penalties, and a gear list split by
   discipline.

   Cut-off times are set per event and published only in each Athlete
   Information Guide, so this page links that guide rather than asserting
   numbers it cannot source. */

const CREAM = "#FAF6EF";
const LINE = "#E5D9C7";
const INK = "#2B1B12";
const MUTED = "#6b5644";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "course", label: "Course" },
  { id: "wetsuit", label: "Wetsuit" },
  { id: "rules", label: "Rules" },
  { id: "gear", label: "Gear" },
];

/* Gear split the way a triathlon actually needs it. Shared across every
   IRONMAN race; the wetsuit line adapts to what the rules allow. */
const GEAR = [
  {
    id: "swim",
    title: "Swim",
    icon: Waves,
    accent: "#1F6F6B",
    items: [
      "Wetsuit (if legal — see the Wetsuit tab)",
      "Official swim cap (issued at check-in)",
      "Goggles, plus a spare pair",
      "Anti-fog spray or baby shampoo",
      "Body glide for neck and shoulders",
      "Tri kit to wear under the wetsuit",
      "Timing chip and ankle strap",
    ],
  },
  {
    id: "t1",
    title: "T1 — swim to bike",
    icon: Bike,
    accent: "#8C6B52",
    items: [
      "Bike shoes",
      "Helmet (must be buckled BEFORE you touch the bike)",
      "Sunglasses",
      "Race belt with number",
      "Towel to mark your spot and dry your feet",
      "Sunscreen",
    ],
  },
  {
    id: "bike",
    title: "Bike",
    icon: Bike,
    accent: "#B5502E",
    items: [
      "Bike, serviced and with fresh tyres",
      "Two bottles minimum, plus a frame or aero bottle",
      "Nutrition taped or bento-boxed to the frame",
      "Spare tube or tubular, CO2 and inflator, tyre levers",
      "Multi-tool",
      "Bike computer, charged",
      "Special needs bag (full IRONMAN only)",
    ],
  },
  {
    id: "t2",
    title: "T2 — bike to run",
    icon: Footprints,
    accent: "#8C6B52",
    items: [
      "Run shoes with elastic laces",
      "Socks, if you wear them",
      "Hat or visor",
      "Run nutrition",
      "Salt tablets",
    ],
  },
  {
    id: "run",
    title: "Run & general",
    icon: Footprints,
    accent: "#1F6F6B",
    items: [
      "Handheld or run belt flask",
      "Anti-chafe balm",
      "Headlamp for late finishers at full-distance races",
      "Post-race dry clothes bag",
      "Photo ID and race documents for check-in",
    ],
  },
];

function useStoredState(key, initial) {
  const [value, setValue] = useState(initial);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw));
    } catch (e) {}
    setLoaded(true);
  }, [key]);
  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }, [key, value, loaded]);
  return [value, setValue];
}

const LEVEL_COLOR = {
  mandatory: "#1F6F6B",
  allowed: "#1F6F6B",
  conditional: "#B5502E",
  prohibited: "#B5502E",
};

export default function TriathlonRaceProfile({ race }) {
  const [tab, setTab] = useState("overview");
  const accent = race.tier === "full" ? "#B5502E" : "#1B4F8C";

  const [checked, setChecked] = useStoredState(`tri-${race.id}-gear`, {});
  const toggle = (k) => setChecked((p) => ({ ...p, [k]: !p[k] }));

  /* Let the athlete try a temperature of their own — race-morning water is
     rarely the published average. */
  const [tempC, setTempC] = useState(race.waterC ?? "");
  const liveStatus = useMemo(() => {
    const n = parseFloat(tempC);
    return isFinite(n) ? wetsuitStatus(n) : null;
  }, [tempC]);

  const card = { backgroundColor: "#FFFFFF", border: `1px solid ${LINE}` };
  const totalGear = GEAR.reduce((a, g) => a + g.items.length, 0);
  const doneGear = Object.values(checked).filter(Boolean).length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: CREAM, color: INK }}>
      <div className="max-w-2xl mx-auto px-5 py-8">
        <a href="#/" className="text-xs font-semibold" style={{ color: accent }}>
          ← All races
        </a>

        <header className="mb-6 mt-2">
          <div
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold"
            style={{ color: accent }}
          >
            <MapPin size={13} />
            <span>{race.location}</span>
          </div>
          <h1
            className="text-3xl font-bold mt-2 leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {race.name}
          </h1>
          <p className="mt-1 text-sm" style={{ color: MUTED }}>
            {race.tierLabel} · {race.segments.total} · {race.date}
          </p>

          <div className="flex gap-1.5 mt-5 overflow-x-auto pb-1" style={{ WebkitOverflowScrolling: "touch" }}>
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex-shrink-0 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap"
                style={{
                  backgroundColor: tab === t.id ? accent : "#FFFFFF",
                  color: tab === t.id ? "#FFFFFF" : accent,
                  border: `1px solid ${tab === t.id ? accent : LINE}`,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </header>

        {tab === "overview" && (
          <>
            <section className="mb-6 rounded-lg p-4" style={card}>
              <h2 className="text-lg font-bold mb-3" style={{ color: accent }}>Distances</h2>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-xs flex items-center gap-1" style={{ color: MUTED }}><Waves size={11} /> Swim</div>
                  <div className="font-bold">{race.segments.swim}</div>
                  <div className="text-xs" style={{ color: MUTED }}>{race.swimType}</div>
                </div>
                <div>
                  <div className="text-xs flex items-center gap-1" style={{ color: MUTED }}><Bike size={11} /> Bike</div>
                  <div className="font-bold">{race.segments.bike}</div>
                  <div className="text-xs" style={{ color: MUTED }}>{race.bikeProfile}</div>
                </div>
                <div>
                  <div className="text-xs flex items-center gap-1" style={{ color: MUTED }}><Footprints size={11} /> Run</div>
                  <div className="font-bold">{race.segments.run}</div>
                  <div className="text-xs" style={{ color: MUTED }}>{race.runProfile}</div>
                </div>
              </div>
            </section>

            <section className="mb-6 rounded-lg p-4" style={card}>
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: accent }}>
                <Thermometer size={16} /> Typical Conditions
              </h2>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-xs" style={{ color: MUTED }}>Air high</div>
                  <div className="font-bold">{race.airHiF}°F</div>
                  <div className="text-xs" style={{ color: MUTED }}>{race.airHiC}°C</div>
                </div>
                <div>
                  <div className="text-xs" style={{ color: MUTED }}>Air low</div>
                  <div className="font-bold">{race.airLoF}°F</div>
                  <div className="text-xs" style={{ color: MUTED }}>{race.airLoC}°C</div>
                </div>
                <div>
                  <div className="text-xs" style={{ color: MUTED }}>Avg water</div>
                  <div className="font-bold">{race.waterF !== null ? `${race.waterF}°F` : "—"}</div>
                  <div className="text-xs" style={{ color: MUTED }}>
                    {race.waterC !== null ? `${race.waterC}°C` : "not published"}
                  </div>
                </div>
              </div>
              <p className="text-xs mt-3" style={{ color: MUTED }}>
                These are the typical figures IRONMAN publishes for this race, not a forecast.
              </p>
            </section>

            <section className="mb-6 rounded-lg p-4" style={{ backgroundColor: "#FFF7F3", border: "1px solid #E0B9A6" }}>
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} color="#B5502E" className="flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-base font-bold mb-1" style={{ color: "#B5502E" }}>Cut-off times</h2>
                  <p className="text-xs" style={{ color: MUTED }}>
                    IRONMAN sets swim, bike, run, and overall cut-offs per event and publishes them
                    only in that event's Athlete Information Guide. They are not listed here because
                    guessing them would be worse than not showing them. Open the guide below for this
                    race's actual numbers.
                  </p>
                  <a
                    href={race.athleteGuideUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full mt-2"
                    style={{ backgroundColor: "#B5502E", color: "#fff" }}
                  >
                    Athlete Guide<ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </section>

            <section className="rounded-lg p-4" style={card}>
              <h2 className="text-lg font-bold mb-2" style={{ color: accent }}>Official Links</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  ["Race page", race.officialUrl],
                  ["Course", race.courseUrl],
                  ["Schedule", race.scheduleUrl],
                  ["Athlete Guide", race.athleteGuideUrl],
                ].map(([label, url]) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: CREAM, color: accent, border: `1px solid ${LINE}` }}
                  >
                    {label}<ExternalLink size={11} />
                  </a>
                ))}
              </div>
            </section>
          </>
        )}

        {tab === "course" && (
          <>
            {[
              { key: "swim", icon: Waves, title: "Swim", dist: race.segments.swim, profile: race.swimType,
                body: `A ${race.swimType.toLowerCase()} swim of ${race.segments.swim}. Whether you can wear a wetsuit depends on the water temperature on race morning — see the Wetsuit tab. Personal paddlers and escorts are banned outright, and holding a kayak or raft is only legal if you make no forward progress doing it.` },
              { key: "t1", icon: Bike, title: "Transition 1", dist: "Swim → Bike", profile: "",
                body: "Wetsuit off, helmet on and buckled BEFORE you touch the bike, and no riding until you cross the mount line. This is the most common place to pick up an avoidable penalty." },
              { key: "bike", icon: Bike, title: "Bike", dist: race.segments.bike, profile: race.bikeProfile,
                body: `${race.segments.bike} on a course IRONMAN rates as ${race.bikeProfile.toLowerCase()}. Drafting is the rule that ends most days badly: stay 12 m back unless you are actively passing, and complete every pass you start within 25 seconds.` },
              { key: "t2", icon: Footprints, title: "Transition 2", dist: "Bike → Run", profile: "",
                body: "Dismount before the line, rack the bike, helmet stays on until the bike is racked. Shoes, hat, nutrition, and out." },
              { key: "run", icon: Footprints, title: "Run", dist: race.segments.run, profile: race.runProfile,
                body: `${race.segments.run} on ${race.runProfile.toLowerCase()} terrain, run entirely on your own — no pacers, and no crew handing you anything. Everything comes from official aid stations.` },
            ].map((s) => (
              <section key={s.key} className="mb-4 rounded-lg p-4" style={card}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h2 className="text-base font-bold flex items-center gap-2" style={{ color: accent }}>
                    <s.icon size={15} /> {s.title}
                  </h2>
                  <span className="text-xs font-mono whitespace-nowrap" style={{ color: MUTED }}>
                    {s.dist}{s.profile ? ` · ${s.profile}` : ""}
                  </span>
                </div>
                <p className="text-xs" style={{ color: MUTED }}>{s.body}</p>
              </section>
            ))}
            <p className="text-xs mt-3" style={{ color: MUTED }}>
              Course maps, elevation profiles, and aid station positions are on the{" "}
              <a href={race.courseUrl} target="_blank" rel="noopener noreferrer" style={{ color: accent }}>
                official course page
              </a>. Courses change year to year — always check before race week.
            </p>
          </>
        )}

        {tab === "wetsuit" && (
          <>
            <section className="mb-6">
              <div className="mb-3 pb-2 flex items-center gap-2" style={{ borderBottom: `2px solid ${accent}` }}>
                <Waves size={16} color={accent} />
                <h2 className="text-lg font-bold" style={{ color: accent }}>Wetsuit Legality</h2>
              </div>
              <p className="text-xs mb-3" style={{ color: MUTED }}>
                Worked out from the water temperature against the 2026 IRONMAN Competition Rules.
                The official call is made by the Head Referee on race morning — this tells you which
                way the rules point.
              </p>

              <div className="rounded-lg p-4 mb-4" style={card}>
                <label className="block mb-3">
                  <span className="text-xs" style={{ color: MUTED }}>Water temperature (°C)</span>
                  <input
                    type="number" step="0.1" value={tempC}
                    onChange={(e) => setTempC(e.target.value)}
                    placeholder={race.waterC !== null ? String(race.waterC) : "e.g. 21"}
                    className="w-full text-sm px-2 py-1 rounded mt-0.5"
                    style={{ backgroundColor: CREAM, border: `1px solid ${LINE}`, color: INK }}
                  />
                  <span className="text-xs" style={{ color: MUTED }}>
                    {race.waterC !== null
                      ? `Pre-filled with this race's published average of ${race.waterC} °C / ${race.waterF} °F.`
                      : "IRONMAN publishes no average water temperature for this race — enter one to check."}
                  </span>
                </label>

                {liveStatus && (
                  <div className="rounded-lg p-3" style={{ backgroundColor: CREAM, border: `1px solid ${LINE}` }}>
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      <div>
                        <div className="text-xs" style={{ color: MUTED }}>Age group</div>
                        <div className="font-bold text-sm" style={{ color: LEVEL_COLOR[liveStatus.level] }}>
                          {liveStatus.ageGroup}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs" style={{ color: MUTED }}>Professional</div>
                        <div className="font-bold text-sm" style={{ color: LEVEL_COLOR[liveStatus.level] }}>
                          {liveStatus.pro}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs" style={{ color: MUTED }}>{liveStatus.detail}</p>
                  </div>
                )}
              </div>

              <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ backgroundColor: accent, color: "#fff" }}>
                      <th className="text-left py-2 px-2">Water temperature</th>
                      <th className="text-left py-2 px-2">What the rules say</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [`Below ${WETSUIT_LIMITS.mandatoryBelowC} °C / 60.8 °F`, "Wetsuit mandatory for everyone"],
                      [`Up to ${WETSUIT_LIMITS.proMaxC} °C / 71.5 °F`, "Legal for everyone, professionals included"],
                      [`Up to ${WETSUIT_LIMITS.ageGroupMaxC} °C / 76.1 °F`, "Legal for age-groupers; professionals may not"],
                      [`Up to ${WETSUIT_LIMITS.nonCompetitiveMaxC} °C / 83.8 °F`, "Non-competitive wetsuit wave only — forfeits awards and slots"],
                      [`Above ${WETSUIT_LIMITS.nonCompetitiveMaxC} °C / 83.8 °F`, "Wetsuits prohibited"],
                    ].map(([a, b], i) => (
                      <tr key={a} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : CREAM }}>
                        <td className="py-1.5 px-2 font-mono whitespace-nowrap">{a}</td>
                        <td className="py-1.5 px-2">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-2" style={{ color: MUTED }}>
                Wetsuits max out at {WETSUIT_LIMITS.maxThicknessMm} mm thick. Neoprene booties are
                only legal at {WETSUIT_LIMITS.bootiesAtOrBelowC} °C / 65 °F or colder.
              </p>
            </section>
          </>
        )}

        {tab === "rules" && (
          <>
            <section className="mb-6 rounded-lg p-4" style={{ backgroundColor: "#FFF7F3", border: "1px solid #E0B9A6" }}>
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} color="#B5502E" className="flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-base font-bold mb-1" style={{ color: "#B5502E" }}>No pacers, no crew on course</h2>
                  <p className="text-xs" style={{ color: MUTED }}>{NO_PACER_NOTE}</p>
                </div>
              </div>
            </section>

            {[
              ["Swim Rules", SWIM_RULES],
              ["Bike & Drafting", BIKE_RULES],
              ["Penalties", PENALTY_RULES],
            ].map(([title, list]) => (
              <section key={title} className="mb-4 rounded-lg p-4" style={card}>
                <h2 className="text-base font-bold mb-2" style={{ color: accent }}>{title}</h2>
                <ul className="text-xs space-y-1.5" style={{ color: MUTED }}>
                  {list.map((r, i) => <li key={i}>• {r}</li>)}
                </ul>
              </section>
            ))}

            <section className="mb-4 rounded-lg p-4" style={card}>
              <h2 className="text-base font-bold mb-2" style={{ color: accent }}>Result Codes</h2>
              <ul className="text-xs space-y-1.5" style={{ color: MUTED }}>
                {RESULT_CODES.map(([code, meaning]) => (
                  <li key={code}>
                    <b style={{ color: INK }}>{code}</b> — {meaning}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-lg p-4" style={card}>
              <h2 className="text-base font-bold mb-2" style={{ color: accent }}>Where These Came From</h2>
              <p className="text-xs mb-2" style={{ color: MUTED }}>
                These are IRONMAN's global competition rules and apply at every race in this
                directory. Individual events can vary them slightly for local laws — the event's
                Athlete Information Guide wins where they conflict.
              </p>
              <div className="flex flex-wrap gap-2">
                {[...RULES_SOURCES, { label: "This race's Athlete Guide", url: race.athleteGuideUrl }].map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: CREAM, color: accent, border: `1px solid ${LINE}` }}
                  >
                    {s.label}<ExternalLink size={11} />
                  </a>
                ))}
              </div>
            </section>
          </>
        )}

        {tab === "gear" && (
          <>
            <div className="mb-4 rounded-lg p-3 flex items-center justify-between" style={card}>
              <span className="text-xs" style={{ color: MUTED }}>Packed</span>
              <span className="text-sm font-bold" style={{ color: accent }}>{doneGear} / {totalGear}</span>
            </div>

            {GEAR.map((group) => (
              <section key={group.id} className="mb-5">
                <div className="mb-2 pb-1.5 flex items-center gap-2" style={{ borderBottom: `2px solid ${group.accent}` }}>
                  <group.icon size={15} color={group.accent} />
                  <h2 className="text-base font-bold" style={{ color: group.accent }}>{group.title}</h2>
                </div>
                <div className="space-y-1.5">
                  {group.items.map((item) => {
                    const key = `${group.id}-${item}`;
                    const on = !!checked[key];
                    return (
                      <button
                        key={key}
                        onClick={() => toggle(key)}
                        className="w-full text-left rounded-lg p-2.5 flex items-start gap-2.5 transition-colors"
                        style={{ backgroundColor: "#FFFFFF", border: `1px solid ${on ? group.accent : LINE}` }}
                      >
                        <span
                          className="flex-shrink-0 mt-0.5 rounded flex items-center justify-center"
                          style={{
                            width: 16, height: 16,
                            backgroundColor: on ? group.accent : "transparent",
                            border: `1.5px solid ${on ? group.accent : "#C9B79E"}`,
                          }}
                        >
                          {on && <Check size={11} color="#fff" />}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: on ? MUTED : INK, textDecoration: on ? "line-through" : "none" }}
                        >
                          {item}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
            <p className="text-xs" style={{ color: MUTED }}>
              Ticks are saved in your own browser only. This is a general IRONMAN list — check your
              race's Athlete Guide for anything event-specific.
            </p>
          </>
        )}

        <footer className="mt-10 pt-4 text-xs text-center" style={{ color: "#a3927d", borderTop: `1px solid ${LINE}` }}>
          <div className="flex items-center justify-center gap-1">
            <MapPin size={12} />
            <span>{race.location} · {race.date}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
