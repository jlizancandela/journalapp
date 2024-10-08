import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/_test_/setup.ts",
    include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
  },
});
