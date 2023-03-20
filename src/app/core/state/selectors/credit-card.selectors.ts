import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CreditCardState } from '../state/credit-card.state';

export const selectCreditCardFeatureState = createFeatureSelector<CreditCardState>('creditCard');
export const selectCreditCard = createSelector(selectCreditCardFeatureState, (state) => state.creditCard);
export const selectCreditCardHolder = createSelector(selectCreditCard, (state) => {
  if (state) {
    return state.holder;
  } else {
    return '';
  }
});
export const selectCreditCardNumber = createSelector(selectCreditCard, (state) => {
  if (state) {
    return state.ccNumber;
  } else {
    return '';
  }
});
export const selectCreditCardExpiration = createSelector(selectCreditCard, (state) => {
  if (state) {
    return state.expiration;
  } else {
    return '';
  }
});
export const selectCreditCardVerification = createSelector(selectCreditCard, (state) => {
  if (state) {
    return state.ccv;
  } else {
    return '';
  }
});
