import React from "react";
import { Check, ExternalLink, AlertTriangle } from "lucide-react";

/* Renders one of the shared kits from src/data/gearKits.js, plus any
   race-specific mandatory list the race declares. Ticks are stored per race so
   two races don't share one checklist. */

const CREAM = "#FAF6EF";
const LINE = "#E5D9C7";
const INK = "#2B1B12";
const MUTED = "#6b5644";

export default function GearGuide({ kit, checked, onToggle, mandatoryGear, mandatoryNote, accent }) {
  const groups = kit.groups;
  const total =
    groups.reduce((a, g) => a + g.items.length, 0) + (mandatoryGear ? mandatoryGear.length : 0);
  const done = Object.values(checked).filter(Boolean).length;

  const row = (key, name, note, links, groupAccent) => {
    const on = !!checked[key];
    return (
      <div
        key={key}
        className="rounded-lg p-2.5"
        style={{ backgroundColor: "#FFFFFF", border: `1px solid ${on ? groupAccent : LINE}` }}
      >
        <button onClick={() => onToggle(key)} className="w-full text-left flex items-start gap-2.5">
          <span
            className="flex-shrink-0 mt-0.5 rounded flex items-center justify-center"
            style={{
              width: 16,
              height: 16,
              backgroundColor: on ? groupAccent : "transparent",
              border: `1.5px solid ${on ? groupAccent : "#C9B79E"}`,
            }}
          >
            {on && <Check size={11} color="#fff" />}
          </span>
          <span className="min-w-0">
            <span
              className="text-xs font-semibold block"
              style={{ color: on ? MUTED : INK, textDecoration: on ? "line-through" : "none" }}
            >
              {name}
            </span>
            {note && (
              <span className="text-xs block mt-0.5" style={{ color: MUTED }}>
                {note}
              </span>
            )}
          </span>
        </button>
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2 pl-[26px]">
            {links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: CREAM, color: groupAccent, border: `1px solid ${LINE}` }}
              >
                {l.label}
                <ExternalLink size={9} />
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        className="mb-4 rounded-lg p-3 flex items-center justify-between"
        style={{ backgroundColor: "#FFFFFF", border: `1px solid ${LINE}` }}
      >
        <span className="text-xs" style={{ color: MUTED }}>
          Packed
        </span>
        <span className="text-sm font-bold" style={{ color: accent }}>
          {done} / {total}
        </span>
      </div>

      <p className="text-xs mb-4" style={{ color: MUTED }}>
        {kit.intro}
      </p>

      {mandatoryGear && mandatoryGear.length > 0 && (
        <section className="mb-5">
          <div className="mb-2 pb-1.5 flex items-center gap-2" style={{ borderBottom: "2px solid #B5502E" }}>
            <AlertTriangle size={15} color="#B5502E" />
            <h2 className="text-base font-bold" style={{ color: "#B5502E" }}>
              Mandatory for This Race
            </h2>
          </div>
          {mandatoryNote && (
            <p className="text-xs mb-2" style={{ color: MUTED }}>
              {mandatoryNote}
            </p>
          )}
          <div className="space-y-1.5">
            {mandatoryGear.map((item) => {
              const name = typeof item === "string" ? item : item.name;
              return row(`race-${name}`, name, typeof item === "string" ? null : item.note, typeof item === "string" ? null : item.links, "#B5502E");
            })}
          </div>
        </section>
      )}

      {groups.map((group) => (
        <section key={group.id} className="mb-5">
          <div className="mb-2 pb-1.5" style={{ borderBottom: `2px solid ${group.accent}` }}>
            <h2 className="text-base font-bold" style={{ color: group.accent }}>
              {group.title}
            </h2>
            {group.note && (
              <p className="text-xs mt-0.5" style={{ color: MUTED }}>
                {group.note}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            {group.items.map((item) =>
              row(`${group.id}-${item.name}`, item.name, item.note, item.links, group.accent)
            )}
          </div>
        </section>
      ))}

      <p className="text-xs" style={{ color: MUTED }}>
        Ticks save to your own browser only. Links go to retailers for convenience — always
        check your race's own mandatory kit list, which is the one that gets enforced.
      </p>
    </>
  );
}
