import { AfterViewChecked, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addCreditCardInformation } from '../../core/state/actions/credit-card.actions';
import { CcVerificationService } from '../../core/services/cc-verification.service';
import { CreditCard } from '../../core/models/credit-card';

@Component({
  selector: 'app-credit-card-from',
  templateUrl: './credit-card-from.component.html',
  styleUrls: ['./credit-card-from.component.scss'],
})
export class CreditCardFromComponent implements AfterViewChecked {

  // logic for the credit card form shamelessly borrowed from: https://codepen.io/murani/pen/KyVbrp

  @ViewChild('ccHolderInput') ccHolderInput!: HTMLInputElement;

  @ViewChild('ccNumberInput') ccNumberInput!: HTMLInputElement;

  @ViewChild('ccExpirationInput') ccExpirationInput!: HTMLInputElement;

  @ViewChild('ccCCVInput') ccCCVInput!: HTMLInputElement;

  creditCardForm = new FormGroup({
    creditCardHolder: new FormControl('', [Validators.required, Validators.minLength(5)]),
    creditCardNumber: new FormControl('', [Validators.required, Validators.pattern('^\\d{4} \\d{4} \\d{4} \\d{4}$')]),
    creditCardExpiration: new FormControl('', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/\\d{2}$')]),
    creditCardVerification: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]),
  });

  errorMessage: string = '';

  constructor(
    private router: Router,
    private store: Store,
    private ccService: CcVerificationService,
  ) {
  }

  ngAfterViewChecked() {
    this.creditCardForm.get('creditCardNumber')?.valueChanges.subscribe((value) => {
      this.updateCreditCardNumberInput(value as string);
      this.highlightCC(value as string);
    });

    this.creditCardForm.get('creditCardExpiration')?.valueChanges.subscribe((value) => {
      this.updateExpiryInput(value as string);
    });
  }

  checkAndApplyForm() {
    this.errorMessage = '';
    if (this.creditCardForm.valid) {
      const creditCard: CreditCard = {
        holder: this.creditCardForm.value.creditCardHolder ?? '',
        ccNumber: this.creditCardForm.value.creditCardNumber ?? '',
        expiration: this.creditCardForm.value.creditCardExpiration ?? '',
        ccv: this.creditCardForm.value.creditCardVerification ?? '',
      };

      // call backend verification service
      this.ccService.verifyCreditCardInformation(creditCard).subscribe({
        next: (verifiedCreditCard: CreditCard) => {
          this.store.dispatch(addCreditCardInformation({ creditCard: verifiedCreditCard }));
          this.router.navigate(['/main'], { replaceUrl: true });
        },
        error: (error: Error) => {
          this.errorMessage = error.message;
        },
      });
    } else {
      this.errorMessage = 'The form is invalid, please check again';
    }
  }

  highlightCC(ccValue: string) {
    let ccCardType = '',
      ccCardTypePatterns = {
        amex: /^3/,
        visa: /^4/,
        mastercard: /^5/,
        disc: /^6/,

        generic: /(^1|^2|^7|^8|^9|^0)/,
      };

    for (const cardType in ccCardTypePatterns) {
      // @ts-ignore
      if (ccCardTypePatterns[cardType].test(ccValue) ) {
        ccCardType = cardType;
        break;
      }
    }

    let activeCC = document.querySelector('.cc-types__img--active'),
      newActiveCC = document.querySelector(`.cc-types__img--${ccCardType}`);

    if (activeCC) activeCC.classList.remove('cc-types__img--active');
    if (newActiveCC) newActiveCC.classList.add('cc-types__img--active');
  }

  updateCreditCardNumberInput(value: string) {
    let ccNumberValue = '';
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      ccNumberValue = parts.join(' ');
    } else {
      ccNumberValue = value;
    }

    this.creditCardForm.get('creditCardNumber')?.patchValue(ccNumberValue, { emitEvent: false, onlySelf: true });
  }

  updateExpiryInput(value: string) {
    const sanitizedInput = (value as string).replace(/^\D/g, '').replace(/\./g, '').replace(/\//g, '');
    const formattedValue = sanitizedInput.replace(/^(0[1-9]|1[0-2])/, '$1/').replace(/^(0[1-9]|1[0-2])(\d{2})/, '$1/$2');
    this.creditCardForm.get('creditCardExpiration')?.patchValue(formattedValue, { emitEvent: false, onlySelf: true });
  }
}
