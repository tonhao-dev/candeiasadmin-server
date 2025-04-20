import express from 'express';
import passport from 'passport';

import { PersonController } from './controller/PersonController';
import { HealthCheckController } from './controller/HealthController';
import { AuthController } from './controller/AuthController';

const routes = express.Router();

const personController = new PersonController();
const healthCheckController = new HealthCheckController();
const authController = new AuthController();

routes.get('/', healthCheckController.check.bind(healthCheckController));
routes.get(
  '/student',
  authController.isLoggedIn.bind(authController),
  personController.getAll.bind(personController)
);
routes.get(
  '/student/:id',
  authController.isLoggedIn.bind(authController),
  personController.getOne.bind(personController)
);
routes.post(
  '/student',
  authController.isLoggedIn.bind(authController),
  personController.create.bind(personController)
);
routes.patch(
  '/student/:id',
  authController.isLoggedIn.bind(authController),
  personController.update.bind(personController)
);
routes.delete(
  '/student/:id',
  authController.isLoggedIn.bind(authController),
  personController.delete.bind(personController)
);

routes.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
routes.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (_, response) => {
    response.redirect('/');
  }
);
routes.post('/auth/google', authController.isLoggedIn.bind(authController));
routes.post('/logout', authController.logout.bind(authController));

export { routes };
