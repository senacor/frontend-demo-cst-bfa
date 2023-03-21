# Frontend Bundesagentur Example

This is a sample application to demonstrate the technologies used in a public agency.
It uses the following technology stack:
* [Angular](https://angular.io)
* [TypeScript](https://www.typescriptlang.org)
* [jest](https://jestjs.io) for unit tests and pact generation
* [ngrx](https://ngrx.io) for state management
* [PACT](https://pact.io) for contract testing
* [Cypress](https://www.cypress.io) for end to end tests / BDD
* [Eslint](https://eslint.org) for code style

## Description of the application

The focus of this application is the employment of certain technologies as a small demonstration.
It is in no way bulletproof and it does not need to be for this purpose.

The frontend application provides two pages, one of which is the entrypoint that can display data from the ngrx store.
The other page is an entry form where a user can provide credit card information.
Once the user enters the data, it is automatically formatted and upon submit a backend service running at `localhost:8080` will verify the data and return the data if it is valid or create an error message.

Please note: the autofill feature of e.g. Safari does not work on pages that are not served over SSL.
A workaround to serve the development server via SSL is provided.

## Serving the Angular frontend application in the browser

To run the application server enter the following commands into your terminal of choice:
```bash
npm install -f; npm run start
```

Afterwards the application should be served on `http://localhost:4200/`.

## Serving the application via SSL

To run the application dev server via SSL, there is one extra step to be completed - generating and trusting the certificate.
The trust part totally depends on your operating system of choice and will not be described here.

To generate the certificate run the script `./ssl/generate.sh`. It will use the provided `./ssl/certificate.cnf` and create two files `./ssl/localhost.crt` and `./ssl/localhost.key`.
The rest remains mostly the same. Once the certificate is prepared, run:
```bash
npm install -f; npm run start:ssl
```

Afterwards the application should be served on `https://localhost:4200/` and the autocompletion of credit card information in the browser should work.

## Running the unit tests

When creating this application there was no focus on unit tests. Therefore they are all lightweight and just checking that the component could be created.
To run the unit tests anyway, you can use the following command:
```bash
npm install -f; npm run test
```

## PACT

PACT files / contracts can be used to define the expected interactions between two services: a `consumer` (e.g. frontend) and a `provider` (e.g. backend).
In consumer driven contracts, the consumer defines the actions it wants to call on the provider - defining which parameters it wants to send and what shape these parameters are.
The provider can then verify its implementation against the requests of the consumer.
This behavior can be used for example to only deploy the application if frontend and backend both pass and validated their results.
The generation on the consumer can be done using the regular code against a mock server during generation.

### Generating the PACT file (JSON)

To generate a PACT file, you can use e.g. Jest for this purpose. You can create special unit tests which perform the following steps:
1. Spin up the PACT mock server on your port of choice
2. Define interactions in the mock server that should be responded to
3. Perform your actions against the mock server
4. Validate the received requests
5. Write the PACT file to the desired location
6. Turn off the PACT mock server

In this example the generation can be done using the following commands:
```bash
npm install -f; npm run pact:generate
```

The tests will be run from the `src/app/core/services/services.pact.spec.ts` file and create a file with the consumer and provider name under the `pacts` directory, containing all recorded interactions.

### Running a stub server based on the PACT file

While running the frontend application, it is also possible to use the PACT JSON from the previous step as a mock server to simulate a backend with its responses.
This can be done with the following example code:
```bash
pact stub --port 8080 --cors true --pact-version 3 --part-urls "<absolute path to pact.json>"
```

## Cypress

Cypress is an essential tool for running user acceptance tests (UAT) also referred to as end-to-end tests. It allows automating different kinds of browsers and to perform assertions against the behavior.
It is therefore referred to as a tool for BDD. In this example we use feature files written in Gherkin / Cucumber and follow natural language syntax. They describe the behavior and actions.
These are linked to TypeScript files that contain the actual commands that cypress shall perform.

The feature files can be located in the `cypress/e2e/` directory.

### What are these tests good for

Reasons why BDD tests are useful include (non-exhaustive list):
* Testing the feature in multiple browsers like an actual user would
* Verify the newly added feature did not cause unwanted side effects
* Test the entire frontend application without a backend (e.g. using PACT stubs)
* Test success and error cases
* Validate your application automatically before deploying it

### Working with feature files

An example of a feature description can be found below:
```gherkin
#language: de
Funktionalität: Bearbeitung der Formularstrecke

  Szenario: Löschen von eingegebenen Kreditkarteninformationen funktioniert wie erwartet
    Wenn ich Kreditkartendaten eingegeben habe
    Und auf den "Delete credit card information" Button klicke
    Und das Formular zeigt im Kreditkartenabschnitt den Text "No credit card information available" an
```

These feature files can be written by non technical users in the team and the actual implementation of the steps can be done by the developers.

### Using the PACT file to mock backend requests

A big feature that Cypress provides is intercepting requests. More on that subject can be found in the [documentation](https://docs.cypress.io/api/commands/intercept).
Basically what this allows you to do, is to use Cypress as a middleware and mock certain requests.

This can be combined with a PACT JSON for example. In the given example application, we do just that in the Cypress tests for the communication with the backend.
We can intercept a request based on our PACT file and wait for it to complete before continuing the test run.

An example would be the following steps:
```typescript
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
```

`interceptPact` in this case is a custom command that reads the PACT JSON and tries to find a corresponding interaction for the given `state` and `providerState` pair.
The example above would intercept a request based on the following definition and return the corresponding response

```json
    {
      "description": "a request to verify the credit card with number 4998 1234 5678 9345",
      "providerState": "provider knows the syntax of a credit card",
      "request": {
        "method": "POST",
        "path": "/credit-card/verify",
        "body": {
          "holder": "Robert Habeck",
          "ccNumber": "4998 1234 5678 9345",
          "expiration": "09/26",
          "ccv": "408"
        }
      },
      "response": {
        "status": 200,
        "headers": {
          "Content-Type": "application/json"
        },
        "body": {
          "holder": "Robert Habeck",
          "ccNumber": "4998 1234 5678 9345",
          "expiration": "09/26",
          "ccv": "408"
        },
        "matchingRules": {
          "$.body.holder": {
            "match": "type"
          },
          "$.body.ccNumber": {
            "match": "type"
          },
          "$.body.expiration": {
            "match": "type"
          },
          "$.body.ccv": {
            "match": "type"
          }
        }
      }
    }
```
