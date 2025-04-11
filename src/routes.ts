import express from 'express';
import passport from 'passport';

import { StudentController } from './controller/StudentController';
import { HealthCheckController } from './controller/HealthController';
import { AuthController } from './controller/AuthController';

const routes = express.Router();

const studentController = new StudentController();
const healthCheckController = new HealthCheckController();
const authController = new AuthController();

routes.get('/', healthCheckController.check.bind(healthCheckController));
routes.get(
  '/student',
  authController.isLoggedIn.bind(authController),
  studentController.getAll.bind(studentController)
);
routes.get(
  '/student/:id',
  authController.isLoggedIn.bind(authController),
  studentController.getOne.bind(studentController)
);
routes.post(
  '/student',
  authController.isLoggedIn.bind(authController),
  studentController.create.bind(studentController)
);
routes.patch(
  '/student/:id',
  authController.isLoggedIn.bind(authController),
  studentController.update.bind(studentController)
);
routes.delete(
  '/student/:id',
  authController.isLoggedIn.bind(authController),
  studentController.delete.bind(studentController)
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
