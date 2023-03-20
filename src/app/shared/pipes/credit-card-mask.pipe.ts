import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardMask',
})
export class CreditCardMaskPipe implements PipeTransform {

  transform(cardNumber: string | null): string {
    if (!cardNumber) {
      return '';
    }
    const digitsOnly = cardNumber.replace(/\D/g, '').substring(0, 16);
    return `${digitsOnly.substr(0, 4)} **** **** *${digitsOnly.substr(13)}`;
  }

}
