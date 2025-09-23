import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    retries: { runMode: 5, openMode: 4 },
      video: false,
      defaultCommandTimeout: 1000,
      pageLoadTimeout: 60000,
    },
});