import React from "react";
import ReactDOM from "react-dom/client";
import GearChecklist from "./GearChecklist.jsx";
import "./index.css";

/* CSP frame-ancestors only works as an HTTP header, and GitHub Pages can't send
   one — so refuse to render inside someone else's frame the old-fashioned way. */
if (window.top !== window.self) {
  window.top.location = window.self.location;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GearChecklist />
  </React.StrictMode>
);
