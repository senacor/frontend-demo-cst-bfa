import { NgModule } from '@angular/core';
import { CreditCardMaskPipe } from './pipes/credit-card-mask.pipe';

@NgModule({
  declarations: [CreditCardMaskPipe],
  exports: [
    CreditCardMaskPipe,
  ],
})
export class SharedModule {}
