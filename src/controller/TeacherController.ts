import { Request, Response } from 'express';
import { UUID } from 'crypto';
import { IResponseModel } from '../types/response';
import { Record } from '../entity/record';
import { TeacherService } from '../service/TeacherService';

class TeacherController {
  private teacherService: TeacherService;

  constructor({ teacherService } = { teacherService: new TeacherService() }) {
    this.teacherService = teacherService;
  }

  async getAll(_: Request, response: Response<IResponseModel<Record[]>>) {
    const result = await this.teacherService.getAll();

    return response.json(result);
  }

  async graduateToTeacher(request: Request, response: Response<IResponseModel<boolean>>) {
    const id = request.params.id as UUID;
    const result = await this.teacherService.graduateToTeacher(id);

    if (result.validations.length > 0) {
      return response.status(400).json(result);
    }

    return response.json(result);
  }

  async revokeTeacherStatus(request: Request, response: Response<IResponseModel<boolean>>) {
    const id = request.params.id as UUID;
    const result = await this.teacherService.revokeTeacherStatus(id);

    if (result.validations.length > 0) {
      return response.status(400).json(result);
    }

    return response.json(result);
  }
}

export { TeacherController };
