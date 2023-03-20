/* eslint-disable import/no-extraneous-dependencies */
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../../environment/environment';

export const StoreDevModules = [
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
];
