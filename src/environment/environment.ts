import { EnvironmentInterface } from './environment.interface';

export const environment: EnvironmentInterface = {
  production: Boolean(window[<any>'env'][<any>'production']),
  backendBaseUrl: String(window[<any>'env'][<any>'backendBaseUrl']),
};
