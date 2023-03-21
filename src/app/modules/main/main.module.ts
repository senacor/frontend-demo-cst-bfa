import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule,
  ],
  exports: [MainComponent],
  declarations: [MainComponent],
})
export class MainModule {}
