/* eslint-disable */

const { defineConfig } = require('cypress');

const BASE_URL = 'http://localhost:3000';

module.exports = defineConfig({
  video: false,
  viewportWidth: 390,
  viewportHeight: 844,
  defaultCommandTimeout: 10000,
  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
    baseUrl: BASE_URL,
  },
});
