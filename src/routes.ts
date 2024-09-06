import express from 'express'
import { StudentController } from './controller/StudentController'

const routes = express.Router()

const studentController = new StudentController()

routes.post('/student', studentController.create)

export { routes }
