import { UUID } from 'crypto';
import { Request, Response } from 'express';
import { Record } from '../entity/record';
import { PersonService } from '../service/PersonService';
import { IResponseModel } from '../types/response';

class PersonController {
  private personService: PersonService;

  constructor({ personService } = { personService: new PersonService() }) {
    this.personService = personService;
  }

  async getAllStudents(_: Request, response: Response<IResponseModel<Record[]>>) {
    const result = await this.personService.getAllStudents();

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

    return response.status(201).json(result);
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
