import express from 'express';
import { StudentController } from './controller/StudentController';

const routes = express.Router();

const studentController = new StudentController();

routes.get('/student', studentController.getAll.bind(studentController));
routes.post('/student', studentController.create.bind(studentController));

export { routes };
