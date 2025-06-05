import express from 'express';
import { routes } from './routes';
import cors from 'cors';

import { passportSetup } from './auth/passport';
import { env } from './env';

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

passportSetup(app);

app.use(routes);

export { app };
