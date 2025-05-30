import { UUID } from 'crypto';
import { DashboardRepository } from '../repository/dashboardRepository';
import { IDashboardResult } from '../types/table/dashboard';

class DashboardService {
  private dashboardRepository: DashboardRepository;

  constructor({ dashboardRepository } = { dashboardRepository: new DashboardRepository() }) {
    this.dashboardRepository = dashboardRepository;
  }

  async getAll(id: UUID): Promise<Array<IDashboardResult>> {
    return Promise.all([
      this.buildCountOfStudents(id),
      this.buildCountOfNewStudents(id),
      this.buildHighestBeltInNetwork(id),
      this.buildAgeDistribution(id),
    ]);
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

  private async buildHighestBeltInNetwork(id: UUID): Promise<IDashboardResult> {
    const belt = await this.dashboardRepository.getHighestBeltInNetwork(id);

    return {
      title: 'Maior graduação na rede',
      type: 'text',
      data: belt.name,
    };
  }

  private async buildAgeDistribution(id: UUID): Promise<IDashboardResult<'pie'>> {
    const ageDistribution = await this.dashboardRepository.getAgeDistribution(id);

    return {
      title: 'Distribuição de idades',
      type: 'pie',
      data: {
        labels: ageDistribution.map(item => item.group),
        datasets: [
          {
            label: 'Distribuição dos alunos por idade',
            data: ageDistribution.map(item => item.count),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Idade dos alunos',
          },
        },
      },
    };
  }
}

export { DashboardService };
