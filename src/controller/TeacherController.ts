import { UUID } from 'crypto';
import { Request, Response } from 'express';
import { Record } from '../entity/record';
import { TeacherService } from '../service/TeacherService';
import { IResponseModel } from '../types/response';

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

  async updateCenter(request: Request, response: Response<IResponseModel<boolean>>) {
    const id = request.params.id as UUID;
    const centerId = request.body.center_id as UUID;

    if (!centerId) {
      return response.status(400).json({
        message: 'O ID do centro de treinamento é obrigatório',
        result: false,
        validations: ['O ID do centro de treinamento é obrigatório'],
      });
    }

    const result = await this.teacherService.updateCenter(id, centerId);

    if (result.validations.length > 0) {
      return response.status(400).json(result);
    }

    return response.json(result);
  }
}

export { TeacherController };
