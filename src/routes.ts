import express from 'express';
import passport from 'passport';

import { AuthController } from './controller/AuthController';
import { BeltController } from './controller/BeltController';
import { CenterController } from './controller/CenterController';
import { DashboardController } from './controller/DashboardController';
import { HealthCheckController } from './controller/HealthController';
import { PersonController } from './controller/PersonController';
import { TeacherController } from './controller/TeacherController';
import { env } from './env';

const routes = express.Router();

const dashboardController = new DashboardController();
const personController = new PersonController();
const healthCheckController = new HealthCheckController();
const authController = new AuthController();
const teacherController = new TeacherController();
const beltController = new BeltController();
const centerController = new CenterController();

routes.get('/', healthCheckController.check.bind(healthCheckController));
routes.get('/dashboard', dashboardController.getAll.bind(dashboardController));
routes.get(
  '/students',
  authController.isLoggedIn.bind(authController),
  personController.getAllStudents.bind(personController)
);
routes.get(
  '/people/:id',
  authController.isLoggedIn.bind(authController),
  personController.getOne.bind(personController)
);
routes.post(
  '/people',
  authController.isLoggedIn.bind(authController),
  personController.create.bind(personController)
);
routes.patch(
  '/people/:id',
  authController.isLoggedIn.bind(authController),
  personController.update.bind(personController)
);
routes.delete(
  '/people/:id',
  authController.isLoggedIn.bind(authController),
  personController.delete.bind(personController)
);
routes.patch(
  '/people/:id/graduateToTeacher',
  authController.isLoggedIn.bind(authController),
  teacherController.graduateToTeacher.bind(teacherController)
);
routes.get(
  '/teachers',
  authController.isLoggedIn.bind(authController),
  teacherController.getAll.bind(teacherController)
);
routes.patch(
  '/teachers/:id/revokeTeacherStatus',
  authController.isLoggedIn.bind(authController),
  teacherController.revokeTeacherStatus.bind(teacherController)
);
routes.patch(
  '/teachers/:id/updateCenter',
  authController.isLoggedIn.bind(authController),
  teacherController.updateCenter.bind(teacherController)
);
routes.get('/belts', beltController.getAll.bind(beltController));
routes.get('/centers', centerController.getAll.bind(centerController));
routes.get('/centers/:id', centerController.getOne.bind(centerController));
routes.post('/centers', centerController.create.bind(centerController));
routes.patch('/centers/:id', centerController.update.bind(centerController));
routes.delete('/centers/:id', centerController.delete.bind(centerController));

routes.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
routes.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: env.CLIENT_URL + '/professor/painel',
    failureRedirect: env.CLIENT_URL,
  })
);
routes.post('/auth/google', authController.isLoggedIn.bind(authController));
routes.get('/auth/google/success', authController.getUser.bind(authController));
routes.post('/logout', authController.logout.bind(authController));

export { routes };
