import { RequestHandler } from 'express';
import expressSession from 'express-session';

export const session = () =>
  expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }) as unknown as RequestHandler;
