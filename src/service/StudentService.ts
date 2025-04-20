import { StudentDTO } from './../dto/student';
import { Person } from '../entity/student';
import { Record } from '../entity/record';
import { IResponseModel } from '../types/response';
import { PersonRepository } from '../repository/personRepository';
import { UUID } from 'crypto';

class StudentService {
  private repository: PersonRepository;

  constructor({ repository } = { repository: new PersonRepository() }) {
    this.repository = repository;
  }

  async getOne(id: string): Promise<IResponseModel<Record>> {
    const student = await this.repository.getOne(id);

    if (!student) {
      return {
        message: 'O aluno não foi encontrado.',
        result: null,
        validations: ['O aluno não foi encontrado.'],
      };
    }

    return {
      message: '',
      result: new Record(student),
      validations: [],
    };
  }

  async getAll(): Promise<IResponseModel<Record[]>> {
    const students = await this.repository.getAll();
    const records = students.map(student => new Record(student));

    return {
      message: '',
      result: records,
      validations: [],
    };
  }

  async create(studentDTO: StudentDTO): Promise<IResponseModel<string>> {
    const student = new Student(studentDTO);

    if (student.validation.hasError) {
      return {
        message: student.validation.message,
        result: null,
        validations: student.validation.validations,
      };
    }

    const id = await this.repository.saveOne(student);

    return {
      message: '',
      result: String(id),
      validations: [],
    };
  }

  async update(id: UUID, studentDTO: StudentDTO): Promise<IResponseModel<string>> {
    const studentExists = await this.repository.getOne(id);

    if (!studentExists) {
      return {
        message: 'O aluno não foi encontrado.',
        result: null,
        validations: ['O aluno não foi encontrado.'],
      };
    }

    const student = new Student(
      new StudentDTO({
        ...studentExists,
        ...studentDTO,
      })
    );

    if (student.validation.hasError) {
      return {
        message: student.validation.message,
        result: null,
        validations: student.validation.validations,
      };
    }

    await this.repository.updateOne(id, student);

    return {
      message: '',
      result: id,
      validations: [],
    };
  }

  async delete(id: UUID): Promise<IResponseModel<string>> {
    const studentExists = await this.repository.getOne(id);

    if (!studentExists) {
      return {
        message: 'O aluno não foi encontrado.',
        result: null,
        validations: ['O aluno não foi encontrado.'],
      };
    }

    await this.repository.deleteOne(id);

    return {
      message: '',
      result: String(id),
      validations: [],
    };
  }
}

export { StudentService };
