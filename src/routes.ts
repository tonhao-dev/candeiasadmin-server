import express from 'express';
import { StudentController } from './controller/StudentController';
import { validateStudentCreation } from './middleware/student';

const routes = express.Router();

const studentController = new StudentController();

routes.post('/student', validateStudentCreation, studentController.create.bind(studentController));

export { routes };
