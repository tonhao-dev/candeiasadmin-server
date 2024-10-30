import { StudentDTO } from './../dto/student';
import { Student } from '../entity/student';
import { Record } from '../entity/record';
import { IResponseModel } from '../types/response';
import { StudentRepository } from '../repository/studentRepository';
import { UUID } from 'crypto';

class StudentService {
  private repository: StudentRepository;

  constructor({ repository } = { repository: new StudentRepository() }) {
    this.repository = repository;
  }

  async getOne(id: string): Promise<IResponseModel<Record>> {
    const student = await this.repository.getOne(id);

    if (!student) {
      return {
        message: 'O estudante não foi encontrado.',
        result: null,
        validations: ['O estudante não foi encontrado.'],
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
        message: 'O estudante não foi encontrado.',
        result: null,
        validations: ['O estudante não foi encontrado.'],
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
}

export { StudentService };
