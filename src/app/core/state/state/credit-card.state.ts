import { CreditCard } from '../../models/credit-card';

export type CreditCardState = {
  creditCard: Readonly<CreditCard | undefined>
};
