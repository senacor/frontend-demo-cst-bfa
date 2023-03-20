import { createAction, props } from '@ngrx/store';
import { CreditCard } from '../../models/credit-card';

export const addCreditCardInformation = createAction(
  '[CreditCard] add credit card information',
  props<{ creditCard: CreditCard }>(),
);

export const deleteCreditCardInformation = createAction(
  '[CreditCard] delete credit card information',
);
