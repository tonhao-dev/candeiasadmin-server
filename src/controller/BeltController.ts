import { Request, Response } from 'express';
import { BeltService } from '../service/BeltService';

class BeltController {
  private beltService: BeltService;

  constructor({ beltService } = { beltService: new BeltService() }) {
    this.beltService = beltService;
  }

  async getAll(_: Request, response: Response) {
    const result = await this.beltService.getAll();

    if (result.validations.length > 0) {
      return response.status(400).json(result);
    }

    return response.json(result);
  }
}

export { BeltController };
