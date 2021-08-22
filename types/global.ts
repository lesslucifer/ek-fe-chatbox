export {};

declare global {
  interface Window {
    __RUNTIME_CONFIG__: {
      API_URL: string;
      API_TIMEOUT?: string;
      NODE_ENV: string;
    };
  }
}