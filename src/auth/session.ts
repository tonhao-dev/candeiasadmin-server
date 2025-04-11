import { RequestHandler } from 'express';
import expressSession from 'express-session';
import { env } from '../env';

const isProduction = process.env.NODE_ENV === 'production';

const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

export const session = () =>
  expressSession({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction,
      httpOnly: true,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: ONE_DAY_IN_MILLISECONDS,
    },
  }) as unknown as RequestHandler;
