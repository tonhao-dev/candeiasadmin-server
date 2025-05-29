import { UUID } from 'crypto';
import { Request, Response } from 'express';
import { DashboardService } from '../service/DashboardService';
import { IResponseModel } from '../types/response';
import { IDashboardResult } from '../types/table/dashboard';

class DashboardController {
  private dashboardService: DashboardService;

  constructor({ dashboardService } = { dashboardService: new DashboardService() }) {
    this.dashboardService = dashboardService;
  }

  async getAll(request: Request, response: Response<IResponseModel<Array<IDashboardResult>>>) {
    const id = request.query?.id ?? null;

    if (!id)
      return response.status(400).json({
        message: 'ID é obrigatório',
        validations: [],
        result: null,
      });

    const result = await this.dashboardService.getAll(id as UUID);

    return response.json({
      message: 'Dashboard',
      validations: [],
      result,
    });
  }
}

export { DashboardController };
