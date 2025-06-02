import { UUID } from 'crypto';
import { RaceEntity } from '../entity/race';
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
      this.buildBeltDistribution(id),
      this.buildGenderDistribution(id),
      this.buildRaceDistribution(id),
      this.buildStudentsCountByTeacher(id),
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
      data: belt?.name ?? 'N/A',
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
            position: 'top',
          },
          title: {
            display: true,
            text: 'Idade dos alunos',
          },
        },
      },
    };
  }

  private async buildBeltDistribution(id: UUID): Promise<IDashboardResult<'bar'>> {
    const beltDistribution = await this.dashboardRepository.getBeltDistribution(id);

    return {
      title: 'Distribuição de graduações',
      type: 'bar',
      data: {
        labels: beltDistribution.map(item => item.belt),
        datasets: [
          {
            label: 'Quantidade de alunos por graduação',
            data: beltDistribution.map(item => item.count),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Graduação dos alunos',
          },
        },
        scales: {
          y: {
            ticks: {
              stepSize: 1,
            },
            beginAtZero: true,
          },
        },
      },
    };
  }

  private async buildGenderDistribution(id: UUID): Promise<IDashboardResult<'pie'>> {
    const genderDistribution = await this.dashboardRepository.getGenderDistribution(id);

    return {
      title: 'Distribuição de gêneros',
      type: 'pie',
      data: {
        labels: genderDistribution.map(item => item.gender),
        datasets: [
          {
            label: 'Distribuição de gêneros',
            data: genderDistribution.map(item => item.count),
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Gênero dos alunos',
          },
        },
      },
    };
  }

  private async buildRaceDistribution(id: UUID): Promise<IDashboardResult<'pie'>> {
    const raceDistribution = await this.dashboardRepository.getRaceDistribution(id);

    return {
      title: 'Distribuição racial',
      type: 'pie',
      data: {
        labels: raceDistribution.map(item => RaceEntity.getRaceName(item.race)),
        datasets: [
          {
            label: 'Distribuição racial',
            data: raceDistribution.map(item => item.count),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Distribuição racial',
          },
        },
      },
    };
  }

  private async buildStudentsCountByTeacher(id: UUID): Promise<IDashboardResult<'bar'>> {
    const studentsCountByTeacher = await this.dashboardRepository.getStudentsCountByTeacher(id);

    return {
      title: 'Quantidade de alunos por professor',
      type: 'pie',
      data: {
        labels: studentsCountByTeacher.map(item => item.teacher),
        datasets: [
          {
            label: 'Quantidade de alunos',
            data: studentsCountByTeacher.map(item => item.count),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Alunos por professor',
          },
        },
      },
    };
  }
}

export { DashboardService };
