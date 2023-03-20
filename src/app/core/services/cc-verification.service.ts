import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { CreditCard } from '../models/credit-card';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CcVerificationService {

  constructor(private httpClient: HttpClient) {
  }

  verifyCreditCardInformation(creditCard: CreditCard): Observable<CreditCard> {
    return this.httpClient
      .post<CreditCard>('/credit-card/verify', {
      ccNumber: creditCard.ccNumber,
      expiration: creditCard.expiration,
    })
      .pipe(
        retry(2),
        catchError(error => {
          console.log(error);

          if (error.status === 0) {
            return throwError(() => new Error('Network error'));
          }

          if (error.status >= 400 && error.status < 500) {
            return throwError(() => new Error('Request error'));
          }

          if (error.status >= 500 && error.status < 600) {
            return throwError(() => new Error('Server side error'));
          }

          return throwError(() => new Error('Generic error'));
        }),
      );
  }

}
