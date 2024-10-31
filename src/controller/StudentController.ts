import { Request, Response } from 'express';
import { IResponseModel } from '../types/response';
import { StudentService } from '../service/StudentService';
import { Record } from '../entity/record';
import { UUID } from 'crypto';

class StudentController {
  private studentService: StudentService;

  constructor({ studentService } = { studentService: new StudentService() }) {
    this.studentService = studentService;
  }

  async getAll(_: Request, response: Response<IResponseModel<Record[]>>) {
    const result = await this.studentService.getAll();

    return response.json(result);
  }

  async getOne(request: Request, response: Response<IResponseModel<Record>>) {
    const result = await this.studentService.getOne(request.params.id);

    if (result.validations.length > 0) {
      return response.status(400).json(result);
    }

    return response.json(result);
  }

  async create(request: Request, response: Response<IResponseModel>) {
    const result = await this.studentService.create(request.body);

    if (result.validations.length > 0) {
      return response.status(400).json(result);
    }

    return response.json(result);
  }

  async update(request: Request, response: Response<IResponseModel>) {
    const result = await this.studentService.update(request.params.id as UUID, request.body);

    if (result.validations.length > 0) {
      return response.status(400).json(result);
    }

    return response.json(result);
  }

  async delete(request: Request, response: Response<IResponseModel>) {
    const result = await this.studentService.delete(request.params.id as UUID);

    if (result.validations.length > 0) {
      return response.status(400).json(result);
    }

    return response.json(result);
  }
}

export { StudentController };
