import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  WEB_URL: process.env.WEB_URL!,
  API_URL: process.env.API_URL!,

  BASIC_AUTH_USER: process.env.BASIC_AUTH_USER!,
  BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD!,

  TEST_GOOGLE_EMAIL: process.env.TEST_GOOGLE_EMAIL!,
  TEST_GOOGLE_PROVIDER_ID: process.env.TEST_GOOGLE_PROVIDER_ID!,

  TEST_APPLE_EMAIL: process.env.TEST_APPLE_EMAIL!,
  TEST_APPLE_PROVIDER_ID: process.env.TEST_APPLE_PROVIDER_ID!,
};