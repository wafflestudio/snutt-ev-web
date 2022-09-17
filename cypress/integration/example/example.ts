import { Then } from '@badeball/cypress-cucumber-preprocessor/lib/methods';

Then('네비바에 {} 텍스트가 나타난다', (str: string) => {
  str.split(',').forEach((item) => {
    cy.findByText(item).should('exist');
  });
});
