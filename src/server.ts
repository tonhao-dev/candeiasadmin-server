import express from 'express';
import { routes } from './routes';
import cors from 'cors';
import passport from 'passport';

import { session } from './auth/session';
import { passportSetup } from './auth/passport';

const app = express();

app.use(cors());
app.use(express.json());
app.use(session());
app.use(routes);

passportSetup(app);

app.get('/login', (req, res) => {
  res.send(`<a href="/auth/google">Login with Google</a>`);
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/student');
  }
);

app.get('/logout', (req: express.Request, res, next) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT || 5000} 🚀`);
});

export { app };
