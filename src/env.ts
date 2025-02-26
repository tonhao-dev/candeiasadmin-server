import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATA_API_DB_NAME: z.string(),
  DATA_API_DB_SERVICE_HOST: z.string().ip(),
  DATA_API_DB_SERVICE_PORT: z.coerce.number().int().min(1).max(65535),
  DATA_API_DB_USER: z.string().default('postgres'),
  DATA_API_DB_PASSWORD: z.string().default('postgres'),
});

export const env = envSchema.parse(process.env);
