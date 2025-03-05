import passport from 'passport';
import { GOOGLE_STRATEGY } from '../auth/strategy';
import { Application, Handler } from 'express';
import { session } from './session';

passport.use(GOOGLE_STRATEGY);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

export const passportSetup = (app: Application) => {
  app.use(session());

  app.use(passport.initialize() as unknown as Handler);
  app.use(passport.session());
};
