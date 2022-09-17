/* eslint-disable @typescript-eslint/no-var-requires */

const { defineConfig } = require('cypress');
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');

module.exports = defineConfig({
  video: false,
  viewportWidth: 390,
  viewportHeight: 844,
  e2e: {
    setupNodeEvents: async (on, config) => {
      await addCucumberPreprocessorPlugin(on, config);

      /**
       *  Cucumber .feature file preprocess
       */
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );

      return config;
    },
    baseUrl: 'http://localhost:3000',
    specPattern: [
      'cypress/integration/**/*.spec.ts',
      'cypress/integration/**/*.{feature,features}',
    ],
  },
});
