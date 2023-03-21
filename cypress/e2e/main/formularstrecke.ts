/* eslint-disable import/no-extraneous-dependencies */
import { defineStep as And, Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';

const cardValidationRequestAlias = 'postCardVerify';
const consumer = "credit-card-form";
const provider = 'credit-card-backend';

beforeEach(() => {
  cy.viewport(1280, 720);
});

Given(/ein Aufruf der Seite unter "([^"]*)"/, (url: string) => {
  cy.visit(url);
});

And(/das Formular zeigt im Kreditkartenabschnitt den Text "([^"]*)" an/, (message: string) => {
  cy.get('[data-cy="credit-card-information"]')
    .should('contain.text', message);
});

When(/ich den Button "([^"]*)" anklicke/, (buttonText: string) => {
  cy.get('button')
    .contains(buttonText)
    .click();
});

And(/ich in das Kreditkartenformular die Daten "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" eintrage/, (
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

And(/ich erwarte, dass die Verifikation im Backend erfolgreich verläuft/, () => {
  cy.interceptPact(
    consumer,
    provider,
    `a request to verify the credit card with number 4998 1234 5678 9345`,
    `provider knows the syntax of a credit card`,
    cardValidationRequestAlias,
  );
});
And(/ich erwarte, dass die Verifikation im Backend wegen einem Datum in der Vergangenheit fehlschlägt/, () => {
  cy.interceptPact(
    consumer,
    provider,
    `a request to verify the expired credit card with number 4998 1234 5678 9345`,
    `provider knows the syntax of a credit card`,
    cardValidationRequestAlias,
    3,
  );
});

And(/auf den "Delete credit card information" Button klicke/, () => {
  cy.get('button')
    .contains('Delete credit card information')
    .click();
});

And(/auf den "Apply credit card information" Button klicke/, () => {
  cy.get('button')
    .contains('Apply credit card information')
    .click();

  cy.wait(['@'+ cardValidationRequestAlias]);
});

Then(/befinde ich mich auf der Übersichtsseite/, () => {
  cy.url()
    .should('contain', '/main');
  cy.url()
    .should('not.contain', 'cc-information');
});

And(/das Formular zeigt "([^"]*)" als "([^"]*)" an/, (field: string, value: string) => {
  let alias = '';
  switch (field) {
    case 'Account holder':
      alias = '[data-cy="cc-account-holder"]';
      break;
    case 'CC #':
      alias = '[data-cy="cc-number"]';
      break;
    case 'Expiration':
      alias = '[data-cy="cc-expiration"]';
      break;
    case 'CCV':
      alias = '[data-cy="cc-ccv"]';
      break;
  }

  cy.get(alias)
    .should('contain', `${field}: ${value}`);
});

When(/ich Kreditkartendaten eingegeben habe/, () => {
  const accountHolder = 'Robert Habeck';
  const ccNumber = '4998 1234 5678 9345';
  const expiration = '09/26';
  const ccv = '408';

  const digitsOnly = ccNumber.replace(/\D/g, '').substring(0, 16);
  const maskedCcNumber = `${digitsOnly.substr(0, 4)} **** **** *${digitsOnly.substr(13)}`;


  cy.get('button')
    .contains('Enter credit card information')
    .click();

  cy.get('[data-cy="cc-holder-input"]')
    .type(accountHolder);

  cy.get('[data-cy="cc-number-input"]')
    .type(ccNumber);

  cy.get('[data-cy="cc-expiry-input"]')
    .type(expiration);

  cy.get('[data-cy="cc-cvc-input"]')
    .type(ccv);

  cy.interceptPact(
    consumer,
    provider,
    `a request to verify the credit card with number 4998 1234 5678 9345`,
    `provider knows the syntax of a credit card`,
    cardValidationRequestAlias,
  );

  cy.get('button')
    .contains('Apply credit card information')
    .click();

  cy.wait(['@' + cardValidationRequestAlias]);

  cy.get('[data-cy="cc-account-holder"]')
    .should('contain', `Account holder: ${accountHolder}`);

  cy.get('[data-cy="cc-number"]')
    .should('contain', `CC #: ${maskedCcNumber}`);

  cy.get('[data-cy="cc-expiration"]')
    .should('contain', `Expiration: ${expiration}`);

  cy.get('[data-cy="cc-ccv"]')
    .should('contain', `CCV: ${ccv}`);
});
Then(/zeigt das Formular im Kreditkartenabschnitt den Text "([^"]*)" an/, (message: string) => {
  cy.get('[data-cy="credit-card-information"]')
    .should('contain.text', message);
});

Then(/wird die Fehlermeldung "([^"]*)" angezeigt/, (errorMessage: string) => {
  cy.get('[data-cy="error-message"]')
    .should('contain', errorMessage);
});
