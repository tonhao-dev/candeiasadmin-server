import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATA_API_DB_NAME: z.string(),
  DATA_API_DB_SERVICE_HOST: z.string(),
  DATA_API_DB_SERVICE_PORT: z.coerce.number().int().min(1).max(65535),
  DATA_API_DB_USER: z.string().default('postgres'),
  DATA_API_DB_PASSWORD: z.string().default('postgres'),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string(),
  API_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
