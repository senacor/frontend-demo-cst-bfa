import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  selectCreditCard,
  selectCreditCardExpiration,
  selectCreditCardHolder,
  selectCreditCardNumber, selectCreditCardVerification,
} from '../../core/state/selectors/credit-card.selectors';
import { deleteCreditCardInformation } from '../../core/state/actions/credit-card.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  readonly creditCard = this.store.select(selectCreditCard);

  readonly ccHolder = this.store.select(selectCreditCardHolder);

  readonly ccNumber = this.store.select(selectCreditCardNumber);

  readonly ccExpiration = this.store.select(selectCreditCardExpiration);

  readonly ccVerification = this.store.select(selectCreditCardVerification);

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  navigateToCcForm() {
    this.router.navigate(['main/cc-information']);
  }

  deleteCCInformation() {
    this.store.dispatch(deleteCreditCardInformation());
  }
}
