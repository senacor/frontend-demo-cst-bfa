import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreditCardFromComponent } from './credit-card-from.component';
import { CreditCardFormRoutingModule } from './credit-card-form-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreditCardFormRoutingModule,
  ],
  exports: [CreditCardFromComponent],
  declarations: [CreditCardFromComponent],
})
export class CreditCardFormModule {}
