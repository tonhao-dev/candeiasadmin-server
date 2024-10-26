import { StudentDTO } from '../dto/student';
import { Student } from '../entity/student';
import { Record } from '../entity/record';
import { IResponseModel } from '../types/response';
import { StudentRepository } from '../repository/student';
import { StudentList } from '../types/studentTable';

class StudentService {
  private repository: StudentRepository;

  constructor({ repository } = { repository: new StudentRepository() }) {
    this.repository = repository;
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
}

export { StudentService };
