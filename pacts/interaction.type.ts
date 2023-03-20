export type Interaction = {
  description: string;
  providerState: string;
  request: {
    method: string;
    path: string;
    query?: string;
    headers?: {
      [key: string]: string;
    };
    body?: any;
  };
  response: {
    status: number;
    headers?: {
      [key: string]: string;
    };
    body?: any;
    matchingRules?: {
      [key: string]: any;
    }
  };
};
