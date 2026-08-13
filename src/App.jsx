import React, { useEffect, useState } from "react";
import Home from "./pages/Home.jsx";
import GearChecklist from "./GearChecklist.jsx";

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

  if (route === "/moab240") return <GearChecklist />;
  return <Home />;
}
