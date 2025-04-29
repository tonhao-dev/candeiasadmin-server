import express from 'express';
import { routes } from './routes';
import cors from 'cors';

import { passportSetup } from './auth/passport';

const app = express();

app.use(cors());
app.use(express.json());

passportSetup(app);

app.use(routes);

export { app };
