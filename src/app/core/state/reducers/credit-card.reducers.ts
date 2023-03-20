import { CreditCardState } from '../state/credit-card.state';
import { createReducer, on } from '@ngrx/store';
import { addCreditCardInformation, deleteCreditCardInformation } from '../actions/credit-card.actions';

export const initialState: CreditCardState = {
  creditCard: undefined,
};

export const creditCardReducer = createReducer(
  initialState,
  on(addCreditCardInformation, (state, { creditCard }) => ({ ...state, creditCard: creditCard })),
  on(deleteCreditCardInformation, (state) => ({ ...state, creditCard: undefined })),
);
