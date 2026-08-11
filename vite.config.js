import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/* The site is served from GitHub Pages, which does not let us set HTTP response
   headers, so the policy has to ride along as a meta tag. Injected on build only
   — in dev, connect-src would block Vite's hot-reload websocket.

   The page loads nothing from anywhere else and sends nothing anywhere:
   no third-party scripts, no analytics, no fonts, no outbound connections. */
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  // React writes styles as inline style attributes, which needs unsafe-inline.
  "style-src 'self' 'unsafe-inline'",
  // data: covers the inline SVG favicon.
  "img-src 'self' data:",
  "font-src 'self'",
  // No fetch, XHR, websockets, or beacons — nothing phones home.
  "connect-src 'none'",
  "form-action 'none'",
  // No frame-ancestors here: browsers ignore it in a meta tag, and GitHub Pages
  // can't send real headers. Anti-framing is handled in main.jsx instead.
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

function injectCsp() {
  return {
    name: "inject-csp",
    apply: "build",
    transformIndexHtml(html) {
      return html.replace(
        "</title>",
        `</title>\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), injectCsp()],
  // Relative asset paths so the build works at any GitHub Pages URL,
  // whether it lives at /repo-name/ or at the domain root.
  base: "./",
});
