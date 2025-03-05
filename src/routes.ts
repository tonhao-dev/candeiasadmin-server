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
routes.get('/student', studentController.getAll.bind(studentController));
routes.get('/student/:id', studentController.getOne.bind(studentController));
routes.post('/student', studentController.create.bind(studentController));
routes.patch('/student/:id', studentController.update.bind(studentController));
routes.delete('/student/:id', studentController.delete.bind(studentController));

routes.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
routes.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (_, res) => res.redirect('/student')
);
routes.post('/logout', authController.logout.bind(authController));

export { routes };
