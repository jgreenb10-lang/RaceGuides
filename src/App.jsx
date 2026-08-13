import React, { useEffect, useState } from "react";
import Home from "./pages/Home.jsx";
import GearChecklist from "./GearChecklist.jsx";
import UltraRaceProfile from "./components/UltraRaceProfile.jsx";
import { WESTERN_STATES } from "./data/races/westernStates.js";

/* Races with a full guide built from the shared UltraRaceProfile template.
   Adding another ultra means adding a data file and one line here. */
const ULTRA_PROFILES = {
  "/western-states": WESTERN_STATES,
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
  if (ULTRA_PROFILES[route]) return <UltraRaceProfile race={ULTRA_PROFILES[route]} />;
  return <Home />;
}
