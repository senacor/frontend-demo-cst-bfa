/* eslint-disable import/no-extraneous-dependencies */
import { Matchers, Pact } from '@pact-foundation/pact';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CcVerificationService } from './cc-verification.service';
import { CreditCard } from '../models/credit-card';
/* eslint-disable import/no-extraneous-dependencies */
import { HTTPMethod } from "@pact-foundation/pact/common/request";
/* eslint-disable import/no-extraneous-dependencies */
import { expect } from '@jest/globals';

export default (provider: Pact) => () => {

  // configure angular testbed
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        CcVerificationService,
      ],
    });
  });

  afterEach(async () => {
    await provider.verify();
  });

  describe('verifyCreditCardInformation()', () => {
    describe('success cases', () => {
      describe('VISA', () => {
        const visaData: CreditCard = {
          holder: 'Robert Habeck',
          ccNumber: '4998 1234 5678 9345',
          expiration: '09/26',
          ccv: '408',
        };

        beforeAll(async () => {
          await provider.addInteraction({
            state: 'provider knows the syntax of a credit card',
            uponReceiving: `a request to verify the credit card with number ${visaData.ccNumber}`,
            withRequest: {
              method: HTTPMethod.POST,
              path: '/credit-card/verify',
              body: {
                holder: visaData.holder,
                ccNumber: visaData.ccNumber,
                expiration: visaData.expiration,
                ccv: visaData.ccv,
              },
            },
            willRespondWith: {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
              },
              body: {
                holder: Matchers.like(visaData.holder),
                ccNumber: Matchers.like(visaData.ccNumber),
                expiration: Matchers.like(visaData.expiration),
                ccv: Matchers.like(visaData.ccv),
              },
            },
          });
        });

        it('should get a validated credit card back', (done) => {
          const ccVerificationService = TestBed.inject(CcVerificationService);

          ccVerificationService
            .verifyCreditCardInformation(visaData)
            .subscribe({
              next: (response) => {
                expect(response).toMatchObject(visaData);
                done();
              },
              error: (error: Error) => {
                console.log(error.message);
              }
            });
        });

        afterAll(async () => {
          await provider.removeInteractions();
        });
      });
      describe('MasterCard', () => {
        const masterCardData: CreditCard = {
          holder: 'Brunhilde von Schöppingen',
          ccNumber: '5355 6723 1785 8940',
          expiration: '04/28',
          ccv: '123',
        };

        beforeAll(async () => {
          await provider.addInteraction({
            state: 'provider knows the syntax of a credit card',
            uponReceiving: `a request to verify the credit card with number ${masterCardData.ccNumber}`,
            withRequest: {
              method: HTTPMethod.POST,
              path: '/credit-card/verify',
              body: {
                holder: masterCardData.holder,
                ccNumber: masterCardData.ccNumber,
                expiration: masterCardData.expiration,
                ccv: masterCardData.ccv,
              },
            },
            willRespondWith: {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
              },
              body: {
                holder: Matchers.like(masterCardData.holder),
                ccNumber: Matchers.like(masterCardData.ccNumber),
                expiration: Matchers.like(masterCardData.expiration),
                ccv: Matchers.like(masterCardData.ccv),
              },
            },
          });
        });

        it('should get a validated credit card back', (done) => {
          const ccVerificationService = TestBed.inject(CcVerificationService);

          ccVerificationService
            .verifyCreditCardInformation(masterCardData)
            .subscribe({
              next: (response) => {
                expect(response).toMatchObject(masterCardData);
                done();
              },
              error: (error: Error) => {
                console.log(error.message);
              }
            });
        });

        afterAll(async () => {
          await provider.removeInteractions();
        });
      });
    });

    describe('error cases', () => {
      describe('VISA with expiration in past', () => {
          const visaData: CreditCard = {
            holder: 'Robert Habeck',
            ccNumber: '4998 1234 5678 9345',
            expiration: '04/21',
            ccv: '408',
          };

          beforeAll(async () => {
            await provider.addInteraction({
              state: 'provider knows the syntax of a credit card',
              uponReceiving: `a request to verify the expired credit card with number ${visaData.ccNumber}`,
              withRequest: {
                method: HTTPMethod.POST,
                path: '/credit-card/verify',
                body: {
                  holder: Matchers.like(visaData.holder),
                  ccNumber: Matchers.like(visaData.ccNumber),
                  expiration: Matchers.like(visaData.expiration),
                  ccv: Matchers.like(visaData.ccv),
                },
              },
              willRespondWith: {
                status: 412,
                headers: {
                  'Content-Type': 'application/json',
                },
                body: {
                  error: Matchers.like('The credit card is expired'),
                },
              },
            });
          });

          it('should get a validated credit card back', (done) => {
            const ccVerificationService = TestBed.inject(CcVerificationService);

            ccVerificationService
              .verifyCreditCardInformation(visaData)
              .subscribe({
                next: (response) => {
                },
                error: (error: Error) => {
                  expect(error.message).toContain('The credit card is expired');
                  done();
                }
              });
          });

          afterAll(async () => {
            await provider.removeInteractions();
          });
        });
    });
  });

};
