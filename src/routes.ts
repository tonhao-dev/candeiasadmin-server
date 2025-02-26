import express from 'express';
import { StudentController } from './controller/StudentController';
import { HealthCheckController } from './controller/HealthController';

const routes = express.Router();

const studentController = new StudentController();
const healthCheckController = new HealthCheckController();

routes.get('/', healthCheckController.check.bind(healthCheckController));
routes.get('/student', studentController.getAll.bind(studentController));
routes.get('/student/:id', studentController.getOne.bind(studentController));
routes.post('/student', studentController.create.bind(studentController));
routes.patch('/student/:id', studentController.update.bind(studentController));
routes.delete('/student/:id', studentController.delete.bind(studentController));

export { routes };
