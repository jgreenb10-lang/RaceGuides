import React, { useMemo, useState } from "react";
import { Search, MapPin, Calendar, ExternalLink, Compass } from "lucide-react";
import { ALL_RACES, SPORT_LABELS } from "../data/races.js";

const SPORT_ACCENT = {
  "ironman-full": "#1F4E8C",
  "ironman-703": "#3E7CB1",
  ultra: "#4F7942",
};

const REGIONS = ["All", "Northeast", "Midwest", "South", "West", "International"];
const SPORTS = ["All", "ironman-full", "ironman-703", "ultra"];

function monthKey(dateStr) {
  // dateStr is "YYYY-MM-DD" or "YYYY-MM" for looser dates.
  return dateStr.slice(0, 7);
}

function monthLabel(key) {
  const [y, m] = key.split("-");
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState("All");
  const [region, setRegion] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = ALL_RACES.filter((r) => {
      if (sport !== "All" && r.sport !== sport) return false;
      if (region !== "All" && r.region !== region) return false;
      if (q) {
        const hay = `${r.name} ${r.city} ${r.state} ${r.country}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (sortBy === "date") list = [...list].sort((a, b) => a.date.localeCompare(b.date));
    if (sortBy === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "state") list = [...list].sort((a, b) => (a.state || a.country).localeCompare(b.state || b.country));
    return list;
  }, [query, sport, region, sortBy]);

  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach((r) => {
      const key = sortBy === "date" ? monthKey(r.date) : "__all__";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(r);
    });
    return Array.from(map.entries());
  }, [filtered, sortBy]);

  const counts = useMemo(() => {
    const c = { "ironman-full": 0, "ironman-703": 0, ultra: 0 };
    ALL_RACES.forEach((r) => { c[r.sport] = (c[r.sport] || 0) + 1; });
    return c;
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF6EF", color: "#2B1B12" }}>
      <div className="max-w-3xl mx-auto px-5 py-8">
        <header className="mb-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold" style={{ color: "#B5502E" }}>
            <Compass size={14} />
            <span>Endurance Race Guides</span>
          </div>
          <h1 className="text-3xl font-bold mt-2 leading-tight" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Every IRONMAN + the World's Toughest 100-Milers
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#6b5644" }}>
            {counts["ironman-full"]} full-distance IRONMAN races, {counts["ironman-703"]} IRONMAN 70.3 races — every
            one on the 2026 U.S. calendar — plus {counts.ultra} of the world's most legendary 100+ mile ultramarathons.
            Every date and link below is sourced from official race sites and cross-checked against independent
            listings; confirm on the official page before you register or book travel.
          </p>
        </header>

        <div className="mb-4 grid grid-cols-3 gap-2">
          {[
            { label: "IRONMAN (Full)", key: "ironman-full", count: counts["ironman-full"] },
            { label: "IRONMAN 70.3", key: "ironman-703", count: counts["ironman-703"] },
            { label: "100+ Mile Ultras", key: "ultra", count: counts.ultra },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setSport(sport === s.key ? "All" : s.key)}
              className="rounded-lg p-3 text-left"
              style={{
                backgroundColor: sport === s.key ? SPORT_ACCENT[s.key] : "#FFFFFF",
                border: `1px solid ${SPORT_ACCENT[s.key]}`,
              }}
            >
              <div className="text-xl font-bold" style={{ color: sport === s.key ? "#fff" : SPORT_ACCENT[s.key] }}>{s.count}</div>
              <div className="text-[11px] font-semibold" style={{ color: sport === s.key ? "#fff" : "#6b5644" }}>{s.label}</div>
            </button>
          ))}
        </div>

        <div className="rounded-lg p-3 mb-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
          <div className="flex items-center gap-2 rounded-md px-2.5 py-2 mb-3" style={{ backgroundColor: "#FAF6EF", border: "1px solid #E5D9C7" }}>
            <Search size={14} color="#6b5644" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by race, city, or state..."
              className="flex-1 min-w-0 text-sm bg-transparent outline-none"
              style={{ color: "#2B1B12" }}
            />
          </div>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: region === r ? "#2B1B12" : "#FAF6EF",
                  color: region === r ? "#fff" : "#6b5644",
                  border: "1px solid #E5D9C7",
                }}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "#6b5644" }}>{filtered.length} race{filtered.length === 1 ? "" : "s"}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs" style={{ color: "#6b5644" }}>Sort:</span>
              {[["date", "Date"], ["name", "Name"], ["state", "State"]].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className="text-xs font-semibold px-2 py-1 rounded"
                  style={{
                    backgroundColor: sortBy === key ? "#1F6F6B" : "transparent",
                    color: sortBy === key ? "#fff" : "#1F6F6B",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="rounded-lg p-6 text-sm text-center" style={{ backgroundColor: "#FFFFFF", border: "1px dashed #E5D9C7", color: "#6b5644" }}>
            No races match those filters.
          </div>
        )}

        {grouped.map(([key, races]) => (
          <section key={key} className="mb-6">
            {sortBy === "date" && (
              <div className="mb-2 pb-1.5 text-xs font-bold uppercase tracking-wide" style={{ borderBottom: "2px solid #E5D9C7", color: "#8C6B52" }}>
                {monthLabel(key)}
              </div>
            )}
            <div className="space-y-2">
              {races.map((r) => {
                const accent = SPORT_ACCENT[r.sport];
                return (
                  <div
                    key={r.id}
                    className="rounded-lg p-3.5"
                    style={{ backgroundColor: "#FFFFFF", border: `1px solid ${r.profileStatus === "deep" ? accent : "#E5D9C7"}` }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm">{r.name}</span>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: accent, color: "#fff" }}
                          >
                            {SPORT_LABELS[r.sport]}
                          </span>
                          {r.profileStatus === "deep" && (
                            <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded" style={{ backgroundColor: "#EAF4F3", color: "#1F6F6B", border: "1px solid #1F6F6B" }}>
                              Full guide
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: "#6b5644" }}>
                          <span className="flex items-center gap-1"><Calendar size={11} />{r.dateLabel}</span>
                          <span className="flex items-center gap-1"><MapPin size={11} />{r.city}{r.state ? `, ${r.state}` : r.country ? `, ${r.country}` : ""}</span>
                        </div>
                        <div className="mt-1 text-xs" style={{ color: "#6b5644" }}>{r.distanceLabel}</div>
                        {r.note && <div className="mt-1 text-xs italic" style={{ color: "#8C6B52" }}>{r.note}</div>}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2.5">
                      {r.profileHref && (
                        <a
                          href={r.profileHref}
                          className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: accent, color: "#fff" }}
                        >
                          Open full guide
                        </a>
                      )}
                      <a
                        href={r.officialUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: "#FAF6EF", color: "#6b5644", border: "1px solid #E5D9C7" }}
                      >
                        Official site<ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <footer className="mt-10 pt-4 text-xs text-center" style={{ color: "#a3927d", borderTop: "1px solid #E5D9C7" }}>
          Dates and details researched from official race sites and cross-checked against independent listings —
          always confirm on the official page before registering or booking travel. Full interactive guides
          (aid stations, cutoffs, gear, training plans) are being added race by race; races marked "Full guide"
          above have one today.
        </footer>
      </div>
    </div>
  );
}
