import { Request, Response } from 'express';
import { UUID } from 'crypto';
import { CenterService } from '../service/CenterService';
import { ICenterDTO } from '../dto/center';
import { IResponseModel } from '../types/response';
import { CenterTable } from '../types/table/centerTable';

class CenterController {
  private centerService: CenterService;

  constructor({ centerService } = { centerService: new CenterService() }) {
    this.centerService = centerService;
  }

  async getAll(_: Request, response: Response<IResponseModel<CenterTable[]>>) {
    const result = await this.centerService.getAll();
    return response.json(result);
  }

  async getOne(request: Request, response: Response<IResponseModel<CenterTable | null>>) {
    const id = request.params.id as UUID;
    const result = await this.centerService.getOne(id);

    if (result.validations.length > 0) {
      return response.status(400).json(result);
    }

    return response.json(result);
  }

  async create(request: Request, response: Response<IResponseModel<UUID>>) {
    const centerDTO = request.body as ICenterDTO;
    const result = await this.centerService.create(centerDTO);

    if (result.validations.length > 0) {
      return response.status(400).json(result);
    }

    return response.status(201).json(result);
  }

  async update(request: Request, response: Response<IResponseModel<UUID>>) {
    const id = request.params.id as UUID;
    const centerDTO = request.body as Partial<ICenterDTO>;
    const result = await this.centerService.update(id, centerDTO);

    if (result.validations.length > 0) {
      return response.status(400).json(result);
    }

    return response.json(result);
  }

  async delete(request: Request, response: Response<IResponseModel<UUID>>) {
    const id = request.params.id as UUID;
    const result = await this.centerService.delete(id);

    if (result.validations.length > 0) {
      return response.status(400).json(result);
    }

    return response.json(result);
  }
}

export { CenterController };
