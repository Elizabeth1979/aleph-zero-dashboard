import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1",
    url: "http://127.0.0.1:3000",
    env: {
      ...process.env,
      // Auth.js requires a session-signing secret even for unauthenticated tests.
      // This is local test configuration, not a Google OAuth credential.
      AUTH_SECRET: "calm-compass-local-privacy-regression-only",
    },
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
