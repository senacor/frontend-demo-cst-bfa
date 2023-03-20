import { Pact } from '@pact-foundation/pact';
import * as path from 'path';
import ccVerificationService from './cc-verification.service.sub-pact';

describe('Generate pact contract', () => {

  const provider: Pact = new Pact({
    host: 'localhost',
    port: 8080,
    log: path.resolve(__dirname, '..', '..', '..', '..', 'pacts', 'mock-server.log'),
    dir: path.resolve(__dirname, '..', '..', '..', '..', 'pacts'),
    spec: 3,
    logLevel: 'info',
    consumer: 'credit-card-form',
    provider: 'credit-card-backend',
    pactfileWriteMode: 'overwrite',
  });

  beforeAll(async () => {
    // setup pact mock server for the backend
    await provider.setup();
  });

  afterAll(async () => {
    // stop server, create contract
    await provider.finalize();
  });

  describe('Credit card verification service', ccVerificationService(provider));

});
