const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "6yqt5f",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    baseUrl: "https://petstore.swagger.io/v2"
  },
});
