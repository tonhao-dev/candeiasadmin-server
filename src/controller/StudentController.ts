import { Request, Response } from 'express'
import { IResponseModel } from '../types/response'
import { StudentService } from '../service/StudentService'

class StudentController {
  private studentService: StudentService

  constructor({ studentService } = { studentService: new StudentService() }) {
    this.studentService = studentService
  }

  async create(request: Request, response: Response<IResponseModel>) {
    this.studentService.create(request.body)

    return response.json({
      message: "",
      result: "Hello World",
      validations: []
    })
  }
}

export { StudentController }
