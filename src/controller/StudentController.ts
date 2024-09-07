import { Request, Response } from 'express';
import { IResponseModel } from '../types/response';
import { StudentService } from '../service/StudentService';

class StudentController {
  private studentService: StudentService;

  constructor({ studentService } = { studentService: new StudentService() }) {
    this.studentService = studentService;
  }

  async create(request: Request, response: Response<IResponseModel>) {
    const result = await this.studentService.create(request.body);

    return response.json(result);
  }
}

export { StudentController };
