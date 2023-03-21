/* eslint-disable import/no-extraneous-dependencies */
import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

beforeEach(() => {
  cy.viewport(1280, 720);
});

When(/ich die URL "([^"]*)" aufrufe/, (url: string) => {
  cy.visit(url);
});

Then(/werde ich zur URL "([^"]*)" weitergeleitet/, (redirectUrl: string) => {
  cy.url().should('contain', redirectUrl);
});
