// Disable eslint check here as the dependency is for a devDependency and not somthing used in production
import { EnvironmentInterface } from './environment/environment.interface';

// mock the environment for the jest tests so access to the properties on the window does not break
// @ts-ignore
jest.mock('./environment/environment', () => {
  return {
    environment: <EnvironmentInterface>{
      production: false,
      backendBaseUrl: 'http://localhost:8080',
    },
  };
});
