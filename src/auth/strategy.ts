import { Strategy } from 'passport-google-oauth20';
import { env } from '../env';

export const GOOGLE_STRATEGY = new Strategy(
  {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.API_URL + env.GOOGLE_CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    console.log({
      accessToken,
      refreshToken,
      profile,
    });
    return done(null, profile);
  }
);
