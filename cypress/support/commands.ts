// For more comprehensive examples of custom
// commands please read more at:
// https://on.cypress.io/custom-commands

// @ts-ignore
declare global {
  namespace Cypress {
    interface Chainable {
      interceptPact(
        consumer: string,
        provider: string,
        state: string,
        providerState: string,
        alias: string,
        times?: number,
      ): Chainable,
      setValidOAuthCredentials(
      ): Chainable,
    }
  }
}

/* eslint-disable import/no-extraneous-dependencies */
import { Method } from 'cypress/types/net-stubbing';
import { Interaction } from '../../pacts/interaction.type';
import { backendBaseUrl } from '../e2e/settings';

Cypress.Commands.add('interceptPact', (
  consumer: string,
  provider: string,
  state: string,
  providerState: string,
  alias: string,
  times?: number,
) => {
  const filePath = `./pacts/${consumer}-${provider}.json`;

  cy.readFile(filePath)
    .then((content: { [key: string]: any }) => {

      if (!content['interactions']) {
        throw new Error('The object does not have the required "interactions" key!');
      }

      const interactions = <Interaction[]>content['interactions'];
      const relevantInteraction = interactions.find((interaction: Interaction) => {
        return interaction.description === state && interaction.providerState === providerState;
      });

      if (relevantInteraction === undefined) {
        throw new Error(`Could not find matching pact interaction for specified state-providerState pair! state: "${state}", providerState: "${providerState}"`);
      }

      let url = `${backendBaseUrl}${relevantInteraction.request.path}`;
      const query = relevantInteraction.request.query;
      if (query !== undefined && query !== '') {
        url = `${url}${query}`;
      }

      cy
        .intercept({
          method: <Method>relevantInteraction.request.method,
          url: url,
          times: times ?? 1,
        }, {
          statusCode: relevantInteraction.response.status,
          headers: relevantInteraction.response.headers ?? undefined,
          body: relevantInteraction.response.body ?? undefined,
        })
        .as(alias);
    });
});

Cypress.Commands.add('setValidOAuthCredentials', () => {

  const creationTime = (Date.now());
  const expirationTime = (Date.now() + (600 * 1000));

  cy.window().then((window) => {
    window.sessionStorage.setItem('refreshToken', '+++++refresh_token+++++');
    window.sessionStorage.setItem('nonce', '+++++nonce+++++');
    window.sessionStorage.setItem('expiresAt', expirationTime.toString());
    window.sessionStorage.setItem('id_token_expires_at', expirationTime.toString());
    window.sessionStorage.setItem('access_token_stored_at', creationTime.toString());
    window.sessionStorage.setItem('id_token_stored_at', creationTime.toString());
    window.sessionStorage.setItem('id_token', '+++++id_token+++++');
    window.sessionStorage.setItem('access_token', '+++++access_token+++++');
    window.sessionStorage.setItem('PKCE_verifier', '+++++pkce_verifier+++++');
    window.sessionStorage.setItem('session_state', 'undefined');
    window.sessionStorage.setItem('id_token_claims_obj', '[]');
    window.sessionStorage.setItem('granted_scopes', '["read", "write"]');
  });
});
