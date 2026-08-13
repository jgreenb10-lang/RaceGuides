import React, { useState, useEffect, useMemo } from "react";
import { ExternalLink, MapPin, Compass, Zap, Plus, Trash2, Users, AlertTriangle } from "lucide-react";

/* A race-agnostic profile page. Everything shown comes from the `race` object
   passed in (see src/data/races/westernStates.js for the shape), so adding a
   new ultra is a data file plus a route — not another copy of this file.

   The algorithms here are the ones proven on the Moab 240 page: cutoff-buffer
   projection from your current position, and pacer-zone assignment derived from
   wherever the race actually allows pacer swaps. */

const CREAM = "#FAF6EF";
const LINE = "#E5D9C7";
const INK = "#2B1B12";
const MUTED = "#6b5644";

/* "10:30am" -> minutes since midnight. Returns null on anything unparseable. */
function parseClock(s) {
  if (!s) return null;
  const m = String(s).trim().match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
  if (!m) return null;
  let h = parseInt(m[1], 10) % 12;
  if (/pm/i.test(m[3])) h += 12;
  return h * 60 + parseInt(m[2], 10);
}

function formatDuration(mins) {
  if (mins === null || !isFinite(mins)) return "—";
  const neg = mins < 0;
  const a = Math.abs(Math.round(mins));
  const h = Math.floor(a / 60);
  const m = a % 60;
  return `${neg ? "−" : ""}${h}h ${String(m).padStart(2, "0")}m`;
}

function formatPace(minPerMile) {
  if (!isFinite(minPerMile) || minPerMile <= 0) return "—";
  const m = Math.floor(minPerMile);
  const s = Math.round((minPerMile - m) * 60);
  return `${m}:${String(s).padStart(2, "0")}/mi`;
}

/* Cutoffs are wall-clock strings that roll past midnight. Walk them in course
   order and add a day whenever the clock goes backwards, so every station gets
   an elapsed-hours-from-start value the calculator can use. */
function withElapsedCutoffs(race) {
  const startMin = parseClock(race.startTimeLabel?.match(/\d{1,2}:\d{2}\s*(am|pm)/i)?.[0]) ?? 5 * 60;
  let dayOffset = 0;
  let prevAbs = startMin;
  return race.aidStations.map((st) => {
    const c = parseClock(st.cutoff);
    if (c === null) return { ...st, cutoffElapsedH: null };
    let abs = c + dayOffset * 1440;
    while (abs < prevAbs) {
      dayOffset += 1;
      abs = c + dayOffset * 1440;
    }
    prevAbs = abs;
    return { ...st, cutoffElapsedH: (abs - startMin) / 60 };
  });
}

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

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "aid", label: "Aid Stations" },
  { id: "pace", label: "Pace Calculator" },
  { id: "crew", label: "Crew & Pacers" },
  { id: "notes", label: "Race Notes" },
];

export default function UltraRaceProfile({ race }) {
  const [tab, setTab] = useState("overview");
  const accent = race.accent || "#1F6F6B";

  const stations = useMemo(() => withElapsedCutoffs(race), [race]);

  const [curMile, setCurMile] = useState(0);
  const [curH, setCurH] = useState(0);
  const [curM, setCurM] = useState(0);

  const [pacers, setPacers] = useStoredState(`race-${race.id}-pacers`, []);
  const [zoneAssign, setZoneAssign] = useStoredState(`race-${race.id}-zones`, {});

  /* Zones run between consecutive legal pacer-swap points, starting wherever
     pacing becomes legal and ending at the finish. */
  const zones = useMemo(() => {
    const pts = stations.filter(
      (s) => race.pacerChangeStations?.includes(s.name) && s.mile >= (race.pacerStartMile ?? 0)
    );
    const finish = stations[stations.length - 1];
    const seq = [...pts];
    if (finish && seq.length && seq[seq.length - 1].name !== finish.name) seq.push(finish);
    const out = [];
    for (let i = 0; i < seq.length - 1; i++) {
      out.push({
        id: `${seq[i].name}->${seq[i + 1].name}`,
        from: seq[i].name,
        to: seq[i + 1].name === finish.name ? "Finish" : seq[i + 1].name,
        miles: Math.round((seq[i + 1].mile - seq[i].mile) * 10) / 10,
      });
    }
    return out;
  }, [stations, race]);

  const totalPaceable = useMemo(
    () => Math.round(zones.reduce((a, z) => a + z.miles, 0) * 10) / 10,
    [zones]
  );

  const elapsed = curH + curM / 60;
  const projection = useMemo(() => {
    if (!curMile || elapsed <= 0) return null;
    const pace = (elapsed * 60) / curMile;
    const projected = (pace * race.distance) / 60;
    const next = stations.find((s) => s.mile > curMile && s.cutoffElapsedH !== null);
    const nextEta = next ? (pace * next.mile) / 60 : null;
    return {
      pace,
      projected,
      makesCutoff: projected <= race.cutoffHours,
      next,
      nextEta,
      nextBuffer: next && nextEta !== null ? (next.cutoffElapsedH - nextEta) * 60 : null,
    };
  }, [curMile, elapsed, stations, race]);

  const addPacer = () =>
    setPacers((p) => [...p, { id: `p${Date.now()}`, name: "" }]);
  const updatePacer = (id, name) =>
    setPacers((p) => p.map((x) => (x.id === id ? { ...x, name } : x)));
  const removePacer = (id) => {
    setPacers((p) => p.filter((x) => x.id !== id));
    setZoneAssign((z) => {
      const next = { ...z };
      Object.keys(next).forEach((k) => {
        if (next[k] === id) delete next[k];
      });
      return next;
    });
  };

  const pacerTotals = useMemo(() => {
    const t = {};
    zones.forEach((z) => {
      const who = zoneAssign[z.id];
      if (who) t[who] = Math.round(((t[who] || 0) + z.miles) * 10) / 10;
    });
    return t;
  }, [zones, zoneAssign]);

  const card = { backgroundColor: "#FFFFFF", border: `1px solid ${LINE}` };

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
            <Compass size={13} />
            <span>{race.startLine}</span>
          </div>
          <h1
            className="text-3xl font-bold mt-2 leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {race.name}
          </h1>
          <p className="mt-1 text-sm" style={{ color: MUTED }}>
            {race.tagline}
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
              <h2 className="text-lg font-bold mb-3" style={{ color: accent }}>
                At a Glance
              </h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {race.keyFacts.map(([k, v]) => (
                  <div key={k}>
                    <div className="text-xs" style={{ color: MUTED }}>{k}</div>
                    <div className="font-bold">{v}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-6 rounded-lg p-4" style={card}>
              <h2 className="text-lg font-bold mb-2" style={{ color: accent }}>
                The Course
              </h2>
              <p className="text-xs" style={{ color: MUTED }}>
                {race.courseNotes}
              </p>
            </section>

            <section className="rounded-lg p-4" style={card}>
              <h2 className="text-lg font-bold mb-2" style={{ color: accent }}>
                Official Links
              </h2>
              <div className="flex flex-wrap gap-2">
                {race.sources.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: CREAM, color: accent, border: `1px solid ${LINE}` }}
                  >
                    {s.label}
                    <ExternalLink size={11} />
                  </a>
                ))}
              </div>
            </section>
          </>
        )}

        {tab === "aid" && (
          <section className="mb-8">
            <div className="mb-3 pb-2" style={{ borderBottom: `2px solid ${accent}` }}>
              <h2 className="text-lg font-bold" style={{ color: accent }}>Aid Station Chart</h2>
              <p className="text-xs mt-0.5" style={{ color: MUTED }}>
                Cutoffs are the time you must <b>leave</b> the station. Splits are the
                published 24-hour and 30-hour paces.
              </p>
            </div>
            <div className="rounded-lg overflow-x-auto" style={{ border: `1px solid ${LINE}` }}>
              <table className="text-xs" style={{ minWidth: 660 }}>
                <thead>
                  <tr style={{ backgroundColor: accent, color: "#fff" }}>
                    <th className="text-left py-2 px-2">Station</th>
                    <th className="text-left py-2 px-2">Mile</th>
                    <th className="text-left py-2 px-2">Med</th>
                    <th className="text-left py-2 px-2">Drop Bag</th>
                    <th className="text-left py-2 px-2">Crew</th>
                    <th className="text-left py-2 px-2">Pacer</th>
                    <th className="text-left py-2 px-2">24h</th>
                    <th className="text-left py-2 px-2">30h</th>
                    <th className="text-left py-2 px-2">Cutoff</th>
                  </tr>
                </thead>
                <tbody>
                  {stations.map((a, i) => (
                    <tr key={a.name} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : CREAM }}>
                      <td className="py-1.5 px-2 font-semibold whitespace-nowrap">{a.name}</td>
                      <td className="py-1.5 px-2 font-mono">{a.mile}</td>
                      <td className="py-1.5 px-2">{a.medical ? "Yes" : ""}</td>
                      <td className="py-1.5 px-2 whitespace-nowrap">
                        {a.dropBag === true ? "Yes" : a.dropBag || ""}
                      </td>
                      <td className="py-1.5 px-2 whitespace-nowrap">{a.crew}</td>
                      <td className="py-1.5 px-2 whitespace-nowrap">
                        {a.pacerChange === true ? "Swap OK" : a.pacerChange || ""}
                      </td>
                      <td className="py-1.5 px-2 font-mono whitespace-nowrap" style={{ color: MUTED }}>{a.split24}</td>
                      <td className="py-1.5 px-2 font-mono whitespace-nowrap" style={{ color: MUTED }}>{a.split30}</td>
                      <td className="py-1.5 px-2 font-mono whitespace-nowrap font-semibold">
                        {a.cutoff || "—"}
                        {a.cutoffDefault && <span style={{ color: "#B5502E" }}>*</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3" style={{ color: MUTED }}>
              <span style={{ color: "#B5502E" }}>*</span> Default cutoff — identical to the next
              station's, for emergency use at hard-to-access stations. Scroll the table sideways
              for all columns.
            </p>
            <div className="mt-4 rounded-lg p-3 text-xs" style={{ ...card, color: MUTED }}>
              <b style={{ color: INK }}>What's on the tables:</b> {race.aidStationSupplies}
            </div>
          </section>
        )}

        {tab === "pace" && (
          <section className="mb-8">
            <div className="mb-3 pb-2" style={{ borderBottom: `2px solid ${accent}` }}>
              <h2 className="text-lg font-bold" style={{ color: accent }}>Pace Calculator</h2>
              <p className="text-xs mt-0.5" style={{ color: MUTED }}>
                Enter where you are and how long you've been running. Everything below is
                projected from your average pace so far.
              </p>
            </div>

            <div className="rounded-lg p-4 mb-4" style={card}>
              <div className="grid grid-cols-3 gap-2">
                <label className="block">
                  <span className="text-xs" style={{ color: MUTED }}>Current mile</span>
                  <input
                    type="number" min="0" max={race.distance} step="0.1" value={curMile}
                    onChange={(e) => setCurMile(parseFloat(e.target.value) || 0)}
                    className="w-full text-sm px-2 py-1 rounded mt-0.5"
                    style={{ backgroundColor: CREAM, border: `1px solid ${LINE}`, color: INK }}
                  />
                </label>
                <label className="block">
                  <span className="text-xs" style={{ color: MUTED }}>Hours in</span>
                  <input
                    type="number" min="0" step="1" value={curH}
                    onChange={(e) => setCurH(parseFloat(e.target.value) || 0)}
                    className="w-full text-sm px-2 py-1 rounded mt-0.5"
                    style={{ backgroundColor: CREAM, border: `1px solid ${LINE}`, color: INK }}
                  />
                </label>
                <label className="block">
                  <span className="text-xs" style={{ color: MUTED }}>Minutes</span>
                  <input
                    type="number" min="0" max="59" step="1" value={curM}
                    onChange={(e) => setCurM(parseFloat(e.target.value) || 0)}
                    className="w-full text-sm px-2 py-1 rounded mt-0.5"
                    style={{ backgroundColor: CREAM, border: `1px solid ${LINE}`, color: INK }}
                  />
                </label>
              </div>
            </div>

            {!projection && (
              <div className="rounded-lg p-4 text-xs text-center" style={{ ...card, color: MUTED }}>
                Enter a mile and an elapsed time to see your projection.
              </div>
            )}

            {projection && (
              <>
                <div className="rounded-lg p-4 mb-4" style={card}>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-xs" style={{ color: MUTED }}>Average pace</div>
                      <div className="font-bold text-lg">{formatPace(projection.pace)}</div>
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: MUTED }}>Projected finish</div>
                      <div
                        className="font-bold text-lg"
                        style={{ color: projection.makesCutoff ? "#1F6F6B" : "#B5502E" }}
                      >
                        {formatDuration(projection.projected * 60)}
                      </div>
                    </div>
                  </div>
                  <div
                    className="mt-3 pt-3 text-xs"
                    style={{ borderTop: `1px solid ${LINE}`, color: projection.makesCutoff ? "#1F6F6B" : "#B5502E" }}
                  >
                    {projection.makesCutoff ? (
                      <>
                        On pace for a {race.cutoffHours}-hour finish with{" "}
                        <b>{formatDuration((race.cutoffHours - projection.projected) * 60)}</b> to spare.
                      </>
                    ) : (
                      <>
                        <AlertTriangle size={12} className="inline mr-1" />
                        Projected <b>{formatDuration((projection.projected - race.cutoffHours) * 60)}</b>{" "}
                        past the {race.cutoffHours}-hour limit at this pace.
                      </>
                    )}
                  </div>
                </div>

                {projection.next && (
                  <div className="rounded-lg p-4 mb-4" style={card}>
                    <div className="text-xs mb-1" style={{ color: MUTED }}>Next cutoff</div>
                    <div className="font-bold">
                      {projection.next.name} <span className="font-mono text-xs">(mi {projection.next.mile})</span>
                    </div>
                    <div className="text-xs mt-1" style={{ color: MUTED }}>
                      Must leave by <b style={{ color: INK }}>{projection.next.cutoff}</b> ·{" "}
                      {formatDuration(projection.next.cutoffElapsedH * 60)} elapsed
                    </div>
                    <div
                      className="text-sm font-bold mt-2"
                      style={{ color: projection.nextBuffer >= 0 ? "#1F6F6B" : "#B5502E" }}
                    >
                      {projection.nextBuffer >= 0
                        ? `${formatDuration(projection.nextBuffer)} of buffer`
                        : `${formatDuration(Math.abs(projection.nextBuffer))} behind`}
                    </div>
                  </div>
                )}

                <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ backgroundColor: accent, color: "#fff" }}>
                        <th className="text-left py-2 px-2">Upcoming station</th>
                        <th className="text-left py-2 px-2">Your ETA</th>
                        <th className="text-left py-2 px-2">Cutoff</th>
                        <th className="text-left py-2 px-2">Margin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stations
                        .filter((s) => s.mile > curMile && s.cutoffElapsedH !== null)
                        .map((s, i) => {
                          const eta = (projection.pace * s.mile) / 60;
                          const margin = (s.cutoffElapsedH - eta) * 60;
                          return (
                            <tr key={s.name} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : CREAM }}>
                              <td className="py-1.5 px-2 font-semibold">{s.name}</td>
                              <td className="py-1.5 px-2 font-mono">{formatDuration(eta * 60)}</td>
                              <td className="py-1.5 px-2 font-mono">{s.cutoff}</td>
                              <td
                                className="py-1.5 px-2 font-mono font-semibold"
                                style={{ color: margin >= 0 ? "#1F6F6B" : "#B5502E" }}
                              >
                                {formatDuration(margin)}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </section>
        )}

        {tab === "crew" && (
          <>
            <section className="mb-6">
              <div className="mb-3 pb-2 flex items-center gap-2" style={{ borderBottom: `2px solid ${accent}` }}>
                <Users size={16} color={accent} />
                <h2 className="text-lg font-bold" style={{ color: accent }}>Assign Pacers to Zones</h2>
              </div>
              <p className="text-xs mb-3" style={{ color: MUTED }}>
                Pacing is legal from <b>{race.pacerStartStation}</b> (mile {race.pacerStartMile}) onward.
                Only real swap points are listed. Saved to your own browser only.
              </p>

              {pacers.length === 0 && (
                <div
                  className="rounded-lg p-4 text-xs text-center mb-3"
                  style={{ backgroundColor: "#FFFFFF", border: `1px dashed ${LINE}`, color: MUTED }}
                >
                  No pacers added yet. Hit “Add pacer” to start.
                </div>
              )}

              <div className="space-y-2 mb-3">
                {pacers.map((p) => (
                  <div key={p.id} className="flex items-center gap-2 rounded-lg p-2" style={card}>
                    <input
                      value={p.name}
                      placeholder="Pacer name"
                      onChange={(e) => updatePacer(p.id, e.target.value)}
                      className="flex-1 min-w-0 text-sm px-2 py-1 rounded"
                      style={{ backgroundColor: CREAM, border: `1px solid ${LINE}`, color: INK }}
                    />
                    {pacerTotals[p.id] ? (
                      <span className="text-xs font-mono font-semibold whitespace-nowrap" style={{ color: accent }}>
                        {pacerTotals[p.id]} mi
                      </span>
                    ) : null}
                    <button onClick={() => removePacer(p.id)} aria-label="Remove pacer" style={{ color: "#B5502E" }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addPacer}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg mb-4"
                style={{ backgroundColor: accent, color: "#FFFFFF" }}
              >
                <Plus size={14} /> Add pacer
              </button>

              <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ backgroundColor: accent, color: "#fff" }}>
                      <th className="text-left py-2 px-2">Zone</th>
                      <th className="text-left py-2 px-2">Distance</th>
                      <th className="text-left py-2 px-2">Pacer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {zones.map((z, i) => (
                      <tr key={z.id} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : CREAM }}>
                        <td className="py-1.5 px-2 font-semibold">{z.from} → {z.to}</td>
                        <td className="py-1.5 px-2 font-mono whitespace-nowrap">{z.miles} mi</td>
                        <td className="py-1.5 px-2">
                          <select
                            value={zoneAssign[z.id] || ""}
                            onChange={(e) =>
                              setZoneAssign((prev) => {
                                const next = { ...prev };
                                if (e.target.value) next[z.id] = e.target.value;
                                else delete next[z.id];
                                return next;
                              })
                            }
                            className="text-xs px-1.5 py-1 rounded w-full"
                            style={{ backgroundColor: CREAM, border: `1px solid ${LINE}`, color: INK }}
                          >
                            <option value="">Unassigned</option>
                            {pacers.map((p) => (
                              <option key={p.id} value={p.id}>{p.name || "Unnamed pacer"}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-2" style={{ color: MUTED }}>
                {Object.keys(zoneAssign).length} of {zones.length} zones assigned ·{" "}
                {totalPaceable} total pace-able miles from {race.pacerStartStation} to the finish
              </p>
            </section>

            <section className="mb-6 rounded-lg p-4" style={card}>
              <h2 className="text-base font-bold mb-2" style={{ color: accent }}>Pacer Rules</h2>
              <ul className="text-xs space-y-1.5" style={{ color: MUTED }}>
                {race.pacerRules.map((r, i) => (
                  <li key={i}>• {r}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-lg p-4" style={card}>
              <h2 className="text-base font-bold mb-2" style={{ color: accent }}>Crew Rules</h2>
              <ul className="text-xs space-y-1.5" style={{ color: MUTED }}>
                {race.crewRules.map((r, i) => (
                  <li key={i}>• {r}</li>
                ))}
              </ul>
            </section>
          </>
        )}

        {tab === "notes" && (
          <>
            <section className="mb-6 rounded-lg p-4" style={card}>
              <h2 className="text-lg font-bold mb-2" style={{ color: accent }}>Things That Will Bite You</h2>
              <ul className="text-xs space-y-2" style={{ color: MUTED }}>
                {race.notes.map((n, i) => (
                  <li key={i}>• {n}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-lg p-4" style={card}>
              <h2 className="text-base font-bold mb-2" style={{ color: accent }}>Where This Came From</h2>
              <p className="text-xs mb-2" style={{ color: MUTED }}>
                Every number on this page is transcribed from the race's own website. Details
                change year to year — the official site is the authority if anything conflicts.
              </p>
              <div className="flex flex-wrap gap-2">
                {race.sources.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: CREAM, color: accent, border: `1px solid ${LINE}` }}
                  >
                    {s.label}
                    <ExternalLink size={11} />
                  </a>
                ))}
              </div>
            </section>
          </>
        )}

        <footer className="mt-10 pt-4 text-xs text-center" style={{ color: "#a3927d", borderTop: `1px solid ${LINE}` }}>
          <div className="flex items-center justify-center gap-1">
            <MapPin size={12} />
            <span>{race.startLine} → {race.finishLine}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
