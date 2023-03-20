/* eslint-disable import/no-extraneous-dependencies */
import { Matchers, Pact } from '@pact-foundation/pact';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CcVerificationService } from './cc-verification.service';
import { CreditCard } from '../models/credit-card';
/* eslint-disable import/no-extraneous-dependencies */
import { HTTPMethods } from '@pact-foundation/pact/src/common/request';
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
              method: HTTPMethods.POST,
              path: '/credit-card/verify',
              body: Matchers.somethingLike(visaData),
            },
            willRespondWith: {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
              },
              body: visaData,
            },
          });
        });

        it('should get a validated credit card back', (done) => {
          const ccVerificationService = TestBed.inject(CcVerificationService);

          ccVerificationService
            .verifyCreditCardInformation(visaData)
            .subscribe((response) => {
              expect(response).toMatchObject(visaData);
              done();
            });
        });

        afterAll(async () => {
          await provider.removeInteractions();
        });
      });
    });
  });

};
