import React, { useState, useMemo } from "react";
import { ExternalLink, Zap, Droplet, ShoppingCart, AlertTriangle } from "lucide-react";
import { PRODUCTS } from "../data/nutritionProducts.js";

/* Shared fuelling planner. Same maths as the Moab 240 page, but the race
   duration comes from whatever race is rendering it, so it works for an 8-hour
   70.3 and a 70-hour mountain ultra alike.

   You pick products, set an hourly carb and sodium target, and it works out how
   many servings the whole race needs, what your actual rates come out at, and
   when to take each item.

   The targets are the athlete's to set. Defaults differ by sport because the
   sensible starting point does: a 70.3 is short and hard so carb rates run
   high, while a 100-miler is long and slow and the limiter is usually the
   stomach. These are starting points to test in training, not prescriptions. */

const CREAM = "#FAF6EF";
const LINE = "#E5D9C7";
const INK = "#2B1B12";
const MUTED = "#6b5644";

export const NUTRITION_DEFAULTS = {
  "ironman-703": { carb: 80, sodium: 700, hours: 6 },
  "ironman-full": { carb: 75, sodium: 800, hours: 12 },
  ultra: { carb: 60, sodium: 500, hours: 30 },
};

function fmtClock(startHour, elapsedH) {
  const total = (startHour + elapsedH) % 24;
  const h = Math.floor(total);
  const m = Math.round((total - h) * 60);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

function fmtElapsed(h) {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  return `${hh}:${String(mm).padStart(2, "0")}`;
}

export default function NutritionPlanner({
  kind, // "ironman-703" | "ironman-full" | "ultra"
  accent = "#1F6F6B",
  raceHours,
  setRaceHours,
  selectedIds,
  setSelectedIds,
  carbTarget,
  setCarbTarget,
  sodiumTarget,
  setSodiumTarget,
  startHour = 6,
  durationNote,
}) {
  const [showTimeline, setShowTimeline] = useState(false);

  const selected = useMemo(
    () => PRODUCTS.filter((p) => selectedIds.includes(p.id)),
    [selectedIds]
  );
  const carbProducts = selected.filter((p) => p.category === "carb");
  const electrolytes = selected.filter((p) => p.category === "electrolyte");

  /* Carb products are shared evenly across the hourly carb target; electrolyte
     capsules then top up whatever sodium the carbs don't already cover. */
  const plan = useMemo(() => {
    if (!carbProducts.length || !raceHours) return null;

    const carbPerHourEach = carbTarget / carbProducts.length;
    const rows = carbProducts.map((p) => {
      const perHour = carbPerHourEach / p.carbs;
      return {
        product: p,
        perHour,
        total: Math.ceil(perHour * raceHours),
        intervalH: perHour > 0 ? 1 / perHour : null,
      };
    });

    const carbSodiumPerHour = rows.reduce((a, r) => a + r.perHour * r.product.sodium, 0);
    const sodiumGap = Math.max(0, sodiumTarget - carbSodiumPerHour);

    const elecRows = electrolytes.map((p) => {
      const perHour = p.sodium > 0 ? sodiumGap / p.sodium : 0;
      return {
        product: p,
        perHour,
        total: Math.ceil(perHour * raceHours),
        intervalH: perHour > 0 ? 1 / perHour : null,
      };
    });

    const all = [...rows, ...elecRows];
    const totalCarbs = rows.reduce((a, r) => a + r.total * r.product.carbs, 0);
    const totalSodium = all.reduce((a, r) => a + r.total * r.product.sodium, 0);
    const totalCaffeine = all.reduce(
      (a, r) => a + r.total * (r.product.caffeine || 0),
      0
    );

    return {
      rows,
      elecRows,
      all,
      carbSodiumPerHour,
      sodiumGap,
      totalCarbs,
      totalSodium,
      totalCaffeine,
      actualCarbRate: totalCarbs / raceHours,
      actualSodiumRate: totalSodium / raceHours,
    };
  }, [carbProducts, electrolytes, carbTarget, sodiumTarget, raceHours]);

  /* One event per serving, ordered by when it falls. */
  const events = useMemo(() => {
    if (!plan) return [];
    const out = [];
    plan.all.forEach((r) => {
      if (!r.intervalH || !isFinite(r.intervalH)) return;
      for (let t = r.intervalH; t <= raceHours + 0.001; t += r.intervalH) {
        out.push({ time: t, product: r.product });
      }
    });
    return out.sort((a, b) => a.time - b.time);
  }, [plan, raceHours]);

  const toggle = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const card = { backgroundColor: "#FFFFFF", border: `1px solid ${LINE}` };
  const sodiumOk = plan && Math.abs(plan.actualSodiumRate - sodiumTarget) <= sodiumTarget * 0.15;

  return (
    <>
      <section className="mb-6">
        <div className="mb-3 pb-2 flex items-center gap-2" style={{ borderBottom: `2px solid ${accent}` }}>
          <Droplet size={16} color={accent} />
          <h2 className="text-lg font-bold" style={{ color: accent }}>Targets</h2>
        </div>

        <div className="rounded-lg p-4" style={card}>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <label className="block">
              <span className="text-xs" style={{ color: MUTED }}>Carbs g/hr</span>
              <input
                type="number" min="0" step="5" value={carbTarget}
                onChange={(e) => setCarbTarget(parseFloat(e.target.value) || 0)}
                className="w-full text-sm px-2 py-1 rounded mt-0.5"
                style={{ backgroundColor: CREAM, border: `1px solid ${LINE}`, color: INK }}
              />
            </label>
            <label className="block">
              <span className="text-xs" style={{ color: MUTED }}>Sodium mg/hr</span>
              <input
                type="number" min="0" step="50" value={sodiumTarget}
                onChange={(e) => setSodiumTarget(parseFloat(e.target.value) || 0)}
                className="w-full text-sm px-2 py-1 rounded mt-0.5"
                style={{ backgroundColor: CREAM, border: `1px solid ${LINE}`, color: INK }}
              />
            </label>
            <label className="block">
              <span className="text-xs" style={{ color: MUTED }}>Race hours</span>
              <input
                type="number" min="1" step="0.5" value={raceHours}
                onChange={(e) => setRaceHours(parseFloat(e.target.value) || 0)}
                className="w-full text-sm px-2 py-1 rounded mt-0.5"
                style={{ backgroundColor: CREAM, border: `1px solid ${LINE}`, color: INK }}
              />
            </label>
          </div>
          <p className="text-xs" style={{ color: MUTED }}>
            {durationNote ||
              "Set race hours to your realistic finish time, not your dream one — the plan scales to it."}{" "}
            Test any target in training before you race it; the gut has to be trained like anything else.
          </p>
        </div>
      </section>

      <section className="mb-6">
        <div className="mb-3 pb-2 flex items-center gap-2" style={{ borderBottom: `2px solid ${accent}` }}>
          <ShoppingCart size={16} color={accent} />
          <h2 className="text-lg font-bold" style={{ color: accent }}>Pick Your Fuel</h2>
        </div>
        <div className="space-y-2">
          {PRODUCTS.map((p) => {
            const on = selectedIds.includes(p.id);
            return (
              <div
                key={p.id}
                className="rounded-lg p-3"
                style={{ backgroundColor: "#FFFFFF", border: `1px solid ${on ? accent : LINE}` }}
              >
                <button onClick={() => toggle(p.id)} className="w-full text-left">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{p.name}</div>
                      <div className="text-xs mt-0.5" style={{ color: MUTED }}>
                        {p.serving} · {p.carbs}g carbs · {p.sodium}mg sodium
                        {p.caffeine ? ` · ${p.caffeine}mg caffeine` : ""}
                      </div>
                    </div>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: on ? accent : CREAM,
                        color: on ? "#fff" : MUTED,
                        border: `1px solid ${on ? accent : LINE}`,
                      }}
                    >
                      {on ? "In plan" : "Add"}
                    </span>
                  </div>
                  {p.note && (
                    <div className="text-xs mt-1" style={{ color: MUTED }}>{p.note}</div>
                  )}
                </button>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {p.links.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: CREAM, color: accent, border: `1px solid ${LINE}` }}
                    >
                      {l.label}
                      <ExternalLink size={9} />
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {!plan && (
        <div className="rounded-lg p-4 text-xs text-center mb-6" style={{ ...card, color: MUTED }}>
          Pick at least one carb product to build a plan.
        </div>
      )}

      {plan && (
        <>
          <section className="mb-6">
            <div className="mb-3 pb-2 flex items-center gap-2" style={{ borderBottom: `2px solid ${accent}` }}>
              <ShoppingCart size={16} color={accent} />
              <h2 className="text-lg font-bold" style={{ color: accent }}>Shopping List</h2>
            </div>
            <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ backgroundColor: accent, color: "#fff" }}>
                    <th className="text-left py-2 px-2">Product</th>
                    <th className="text-left py-2 px-2">Every</th>
                    <th className="text-left py-2 px-2">Buy</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.all.map((r, i) => (
                    <tr key={r.product.id} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : CREAM }}>
                      <td className="py-1.5 px-2 font-semibold">{r.product.name}</td>
                      <td className="py-1.5 px-2 font-mono whitespace-nowrap">
                        {r.intervalH && isFinite(r.intervalH)
                          ? `${Math.round(r.intervalH * 60)} min`
                          : "—"}
                      </td>
                      <td className="py-1.5 px-2 font-mono font-bold">{r.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-2" style={{ color: MUTED }}>
              Quantities cover {raceHours} hours and are rounded up. Buy 10–20% extra — you will
              drop some, and crew will want spares in drop bags.
            </p>
          </section>

          <section className="mb-6 rounded-lg p-4" style={card}>
            <h2 className="text-base font-bold mb-2" style={{ color: accent }}>What That Actually Delivers</h2>
            <div className="text-xs space-y-1.5" style={{ color: MUTED }}>
              <div>Total carbs: <b style={{ color: INK }}>{Math.round(plan.totalCarbs)}g</b></div>
              <div>Total sodium: <b style={{ color: INK }}>{Math.round(plan.totalSodium)}mg</b></div>
              {plan.totalCaffeine > 0 && (
                <div>Total caffeine: <b style={{ color: INK }}>{Math.round(plan.totalCaffeine)}mg</b></div>
              )}
              <div>
                Actual carb rate: <b style={{ color: INK }}>{Math.round(plan.actualCarbRate)}g/hr</b>
              </div>
              <div>
                Actual sodium rate: <b style={{ color: INK }}>{Math.round(plan.actualSodiumRate)}mg/hr</b>{" "}
                {sodiumOk ? (
                  <span style={{ color: "#1F6F6B" }}>✓ on target</span>
                ) : (
                  <span style={{ color: "#B5502E" }}>
                    — {plan.actualSodiumRate < sodiumTarget
                      ? "short; add an electrolyte capsule to close the gap"
                      : "over target; drop a capsule or lower the target"}
                  </span>
                )}
              </div>
            </div>
            {plan.totalCaffeine > 600 && (
              <div className="mt-2 pt-2 text-xs flex items-start gap-1.5" style={{ borderTop: `1px solid ${LINE}`, color: "#B5502E" }}>
                <AlertTriangle size={12} className="mt-0.5 flex-shrink-0" />
                <span>
                  That is a lot of caffeine over the race. Spread it out and save it for when you
                  actually need it rather than taking it from the gun.
                </span>
              </div>
            )}
          </section>

          <section className="mb-6">
            <button
              onClick={() => setShowTimeline((s) => !s)}
              className="w-full rounded-lg p-3 flex items-center justify-between"
              style={card}
            >
              <span className="text-base font-bold flex items-center gap-2" style={{ color: accent }}>
                <Zap size={15} /> Race-Day Timing Plan
              </span>
              <span className="text-xs font-semibold" style={{ color: MUTED }}>
                {showTimeline ? "Hide" : `Show ${events.length} intakes`}
              </span>
            </button>

            {showTimeline && (
              <div className="rounded-lg overflow-hidden mt-3" style={{ border: `1px solid ${LINE}` }}>
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ backgroundColor: accent, color: "#fff" }}>
                      <th className="text-left py-2 px-2">Elapsed</th>
                      <th className="text-left py-2 px-2">Clock</th>
                      <th className="text-left py-2 px-2">Take</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((e, i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : CREAM }}>
                        <td className="py-1.5 px-2 font-mono" style={{ color: MUTED }}>{fmtElapsed(e.time)}</td>
                        <td className="py-1.5 px-2 font-mono" style={{ color: MUTED }}>{fmtClock(startHour, e.time)}</td>
                        <td className="py-1.5 px-2 font-semibold">{e.product.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}

      <p className="text-xs" style={{ color: MUTED }}>
        Your selections and targets save to your own browser only. This is a planning tool, not
        medical or nutritional advice — over-drinking plain water at high sweat rates causes
        hyponatremia, which is dangerous. Practise your plan in training.
      </p>
    </>
  );
}
