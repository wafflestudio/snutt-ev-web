import { When } from '@badeball/cypress-cucumber-preprocessor';

When('{} 에 접속', (url: string) => {
  cy.visit(url);
});
