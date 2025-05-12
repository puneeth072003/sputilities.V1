import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Ensure unknown routes are redirected to index.html
    historyApiFallback: true,
  },
});
