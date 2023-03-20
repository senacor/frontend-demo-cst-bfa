import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CcVerificationService } from './services/cc-verification.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [],
  providers: [
    CcVerificationService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core:CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module!');
    }
  }
}
