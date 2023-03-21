/* eslint-disable import/no-extraneous-dependencies */
import { defineStep as And, Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';

beforeEach(() => {
  cy.viewport(1280, 720);
});

Given(/die geöffnete Unterseite für die Eingabe der Kreditkartendaten/, () => {
  cy.visit('/main/cc-information');
});

Then(/werden ([^"]*) Bilder für die Kreditkartenarten angezeigt/, (numberOfCreditCardImages: number) => {
  cy.get('img.cc-types__img')
    .should('have.length', numberOfCreditCardImages);
});

And(/es werden ([^"]*) Eingabefelder für Kreditkarteninformationen angezeigt/, (numberOfInputs: number) => {
  cy.get('input')
    .should('have.length', numberOfInputs);
});

When(/ich in das Kreditkartenformular die Daten "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" eintrage/, (
  accountHolder: string,
  creditCardNumber: string,
  expiration: string,
  ccv: string,
) => {
  cy.get('[data-cy="cc-holder-input"]')
    .type(accountHolder);

  cy.get('[data-cy="cc-number-input"]')
    .type(creditCardNumber);

  cy.get('[data-cy="cc-expiry-input"]')
    .type(expiration);

  cy.get('[data-cy="cc-cvc-input"]')
    .type(ccv);
});

Then(/wird als Karteninhaber "([^"]*)" angezeigt/, (accountHolder: string) => {
  cy.get('[data-cy="cc-holder-input"]')
    .should('have.value', accountHolder);
});

And(/es wird als Kreditkartennummer "([^"]*)" angezeigt/, (formattedCreditCardNumber: string) => {
  cy.get('[data-cy="cc-number-input"]')
    .should('have.value', formattedCreditCardNumber);
});

And(/es wird als Ablaufdatum "([^"]*)" angezeigt/, (expirationDate: string) => {
  cy.get('[data-cy="cc-expiry-input"]')
    .should('have.value', expirationDate);
});

And(/es wird als CCV "([^"]*)" angezeigt/, (ccv: string) => {
  cy.get('[data-cy="cc-cvc-input"]')
    .should('have.value', ccv);
});

And(/das Bild der Visa-Karte ist farblich markiert/, () => {
  cy.get('img.cc-types__img.cc-types__img--visa')
    .should('have.class', 'cc-types__img--active');
});

And(/das Bild der MasterCard-Karte ist farblich markiert/, () => {
  cy.get('img.cc-types__img.cc-types__img--mastercard')
    .should('have.class', 'cc-types__img--active');
});

And(/das Bild der American Express-Karte ist farblich markiert/, () => {
  cy.get('img.cc-types__img.cc-types__img--amex')
    .should('have.class', 'cc-types__img--active');
});

And(/das Bild der Discover-Karte ist farblich markiert/, () => {
  cy.get('img.cc-types__img.cc-types__img--disc')
    .should('have.class', 'cc-types__img--active');
});

And(/das Bild der Welt-Karte ist farblich markiert/, () => {
  cy.get('img.cc-types__img.cc-types__img--generic')
    .should('have.class', 'cc-types__img--active');
});
