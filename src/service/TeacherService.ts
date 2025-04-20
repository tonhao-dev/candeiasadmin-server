import { UUID } from 'crypto';
import { TeacherRepository } from '../repository/teacherRepository';
import { IResponseModel } from '../types/response';
import { Record } from '../entity/record';

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
}

export { TeacherService };
