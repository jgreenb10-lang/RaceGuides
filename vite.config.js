import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

/* The site is served from GitHub Pages, which does not let us set HTTP response
   headers, so the policy has to ride along as a meta tag. Injected on build only
   — in dev, connect-src would block Vite's hot-reload websocket.

   The page loads nothing from anywhere else and sends nothing anywhere:
   no third-party scripts, no analytics, no fonts, no outbound connections. */
const CSP = [
  "default-src 'self'",
  // The build inlines all JS and CSS into index.html so StatiCrypt can encrypt
  // the whole site as one file — otherwise /assets/*.js would still be fetchable
  // unencrypted. Inlining is what forces 'unsafe-inline' here. Acceptable because
  // the app has no injection sink: no dangerouslySetInnerHTML, no eval, no
  // innerHTML, and React escapes every rendered value.
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  // data: covers the inline SVG favicon.
  "img-src 'self' data:",
  "font-src 'self'",
  // No fetch, XHR, websockets, or beacons — nothing phones home.
  "connect-src 'none'",
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
  plugins: [react(), viteSingleFile(), injectCsp()],
  // Relative asset paths so the build works at any GitHub Pages URL,
  // whether it lives at /repo-name/ or at the domain root.
  base: "./",
});
