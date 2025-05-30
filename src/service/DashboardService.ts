import { UUID } from 'crypto';
import { DashboardRepository } from '../repository/dashboardRepository';
import { IDashboardResult } from '../types/table/dashboard';

class DashboardService {
  private dashboardRepository: DashboardRepository;

  constructor({ dashboardRepository } = { dashboardRepository: new DashboardRepository() }) {
    this.dashboardRepository = dashboardRepository;
  }

  async getAll(id: UUID): Promise<Array<IDashboardResult>> {
    return Promise.all([this.buildCountOfStudents(id), this.buildCountOfNewStudents(id)]);
  }

  private async buildCountOfStudents(id: UUID): Promise<IDashboardResult> {
    const count = await this.dashboardRepository.countStudents(id);

    return {
      title: 'Total de alunos',
      type: 'text',
      data: count.toString(),
    };
  }

  private async buildCountOfNewStudents(id: UUID): Promise<IDashboardResult> {
    const count = await this.dashboardRepository.countOfNewStudents(id);

    return {
      title: 'Novos alunos (últimos 90 dias)',
      type: 'text',
      data: count.toString(),
    };
  }
}

export { DashboardService };
