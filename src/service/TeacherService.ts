import { UUID } from 'crypto';
import { TeacherRepository } from '../repository/teacherRepository';
import { IResponseModel } from '../types/response';

export class TeacherService {
  private teacherRepository: TeacherRepository;

  constructor({ teacherRepository } = { teacherRepository: new TeacherRepository() }) {
    this.teacherRepository = teacherRepository;
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
