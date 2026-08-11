import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the build works at any GitHub Pages URL,
  // whether it lives at /repo-name/ or at the domain root.
  base: "./",
});
