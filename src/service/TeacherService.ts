import { UUID } from 'crypto';
import { Record } from '../entity/record';
import { TeacherRepository } from '../repository/teacherRepository';
import { IResponseModel } from '../types/response';

class TeacherService {
  private teacherRepository: TeacherRepository;

  constructor({ teacherRepository } = { teacherRepository: new TeacherRepository() }) {
    this.teacherRepository = teacherRepository;
  }

  async getAll(): Promise<IResponseModel<Record[]>> {
    const rawTeachers = await this.teacherRepository.getAll();
    const teachers = rawTeachers.map(rawTeacher => new Record(rawTeacher));

    if (!teachers) {
      return {
        validations: ['Não foi possível encontrar professores'],
        result: [],
        message: 'Não foi possível encontrar professores',
      };
    }

    return {
      validations: [],
      result: teachers,
      message: '',
    };
  }

  async graduateToTeacher(id: UUID): Promise<IResponseModel<boolean>> {
    const isSuccessful = await this.teacherRepository.graduateToTeacher(id);

    if (!isSuccessful) {
      return {
        validations: ['Não foi possível tornar o aluno professor'],
        result: false,
        message: 'Não foi possível tornar o aluno professor',
      };
    }

    return {
      validations: [],
      result: isSuccessful,
      message: 'O aluno foi transformado em professor',
    };
  }

  async revokeTeacherStatus(id: UUID): Promise<IResponseModel<boolean>> {
    const isSuccessful = await this.teacherRepository.revokeTeacherStatus(id);

    if (!isSuccessful) {
      return {
        validations: ['Não foi possível reverter o status de professor'],
        result: false,
        message: 'Não foi possível reverter o status de professor',
      };
    }

    return {
      validations: [],
      result: isSuccessful,
      message: 'O status de professor foi revertido com sucesso',
    };
  }

  async updateCenter(id: UUID, centerId: UUID): Promise<IResponseModel<boolean>> {
    const isSuccessful = await this.teacherRepository.updateCenter(id, centerId);

    if (!isSuccessful) {
      return {
        validations: ['Não foi possível atualizar o centro do professor'],
        result: false,
        message: 'Não foi possível atualizar o centro do professor',
      };
    }

    return {
      validations: [],
      result: isSuccessful,
      message: 'Centro de treinamento do professor atualizado com sucesso',
    };
  }
}

export { TeacherService };
