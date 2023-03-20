import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditCardFromComponent } from './credit-card-from.component';

const routes: Routes = [
  {
    path: '',
    component: CreditCardFromComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditCardFormRoutingModule {}
