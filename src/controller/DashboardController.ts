import type { ChartData, ChartOptions } from 'chart.js';
import { Request, Response } from 'express';
import { CenterService } from '../service/CenterService';
import { IResponseModel } from '../types/response';

class CenterController {
  private centerService: CenterService;

  constructor({ centerService } = { centerService: new CenterService() }) {
    this.centerService = centerService;
  }

  async getAll(
    _: Request,
    response: Response<IResponseModel<Array<{ options: ChartOptions; data: ChartData }>>>
  ) {
    return response.json({
      message: 'Dashboard',
      validations: [],
      result: [],
    });
  }
}

export { CenterController };
