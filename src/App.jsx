import React, { useEffect, useState } from "react";
import Home from "./pages/Home.jsx";
import GearChecklist from "./GearChecklist.jsx";
import UltraRaceProfile from "./components/UltraRaceProfile.jsx";
import { WESTERN_STATES } from "./data/races/westernStates.js";
import { HARDROCK_100 } from "./data/races/hardrock100.js";
import { VERMONT_100 } from "./data/races/vermont100.js";
import { HURT_100 } from "./data/races/hurt100.js";
import { UTMB } from "./data/races/utmb.js";
import { ERYRI_100 } from "./data/races/eryri100.js";
import { UTMR } from "./data/races/utmr.js";
import { GRAND_RAID } from "./data/races/grandRaid.js";
import { CHICAMOCHA } from "./data/races/chicamocha.js";
import { EVEREST_TRAIL_RACE } from "./data/races/everestTrailRace.js";
import TriathlonRaceProfile from "./components/TriathlonRaceProfile.jsx";
import { IRONMAN_BY_ID } from "./data/races/ironman.js";

/* Races with a full guide built from the shared UltraRaceProfile template.
   Adding another ultra means adding a data file and one line here. */
const ULTRA_PROFILES = {
  "/western-states": WESTERN_STATES,
  "/hardrock-100": HARDROCK_100,
  "/vermont-100": VERMONT_100,
  "/hurt-100": HURT_100,
  "/utmb": UTMB,
  "/ultra-trail-snowdonia": ERYRI_100,
  "/utmr": UTMR,
  "/grand-raid-reunion": GRAND_RAID,
  "/chicamocha-canyon-race": CHICAMOCHA,
  "/everest-trail-race": EVEREST_TRAIL_RACE,
};

function getRoute() {
  const hash = window.location.hash.replace(/^#/, "");
  return hash || "/";
}

export default function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    // A new page should start at the top, not wherever the directory was scrolled to.
    window.scrollTo(0, 0);
  }, [route]);

  if (route === "/moab240") return <GearChecklist />;

  /* The `key` matters: without it React reuses the same component instance
     when you move between two races, so per-race state (the wetsuit
     temperature box, the pace calculator inputs) carries over from the
     previous race and shows the wrong answer. Keying by race id forces a
     fresh mount. */
  const ultra = ULTRA_PROFILES[route];
  if (ultra) return <UltraRaceProfile key={ultra.id} race={ultra} />;

  /* All 40 IRONMAN races share one route shape and one template, so they are
     matched by id rather than listed individually. */
  const tri = IRONMAN_BY_ID[route.replace(/^\//, "")];
  if (tri) return <TriathlonRaceProfile key={tri.id} race={tri} />;

  return <Home />;
}
