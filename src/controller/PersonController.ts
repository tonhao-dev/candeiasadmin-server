import { Request, Response } from 'express';
import { IResponseModel } from '../types/response';
import { PersonService } from '../service/PersonService';
import { Record } from '../entity/record';
import { UUID } from 'crypto';

class PersonController {
  private personService: PersonService;

  constructor({ personService } = { personService: new PersonService() }) {
    this.personService = personService;
  }

  async getAll(_: Request, response: Response<IResponseModel<Record[]>>) {
    const result = await this.personService.getAll();

    return response.json(result);
  }

  async getOne(request: Request, response: Response<IResponseModel<Record>>) {
    const result = await this.personService.getOne(request.params.id);

    if (result.validations.length > 0) {
      return response.status(400).json(result);
    }

    return response.json(result);
  }

  async create(request: Request, response: Response<IResponseModel>) {
    const result = await this.personService.create(request.body);

    if (result.validations.length > 0) {
      return response.status(400).json(result);
    }

    return response.json(result);
  }

  async update(request: Request, response: Response<IResponseModel>) {
    const result = await this.personService.update(request.params.id as UUID, request.body);

    if (result.validations.length > 0) {
      return response.status(400).json(result);
    }

    return response.json(result);
  }

  async delete(request: Request, response: Response<IResponseModel>) {
    const result = await this.personService.delete(request.params.id as UUID);

    if (result.validations.length > 0) {
      return response.status(400).json(result);
    }

    return response.json(result);
  }
}

export { PersonController };
