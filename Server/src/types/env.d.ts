declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    DATABASE_URL: string;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRATION: string;
    CLIENT_URL: string;
    GOOGLE_API_KEY: string;
    DISABLE_SECURITY?: string;
    DONT_USE_GOOGLE_API?: string;
  }
}
