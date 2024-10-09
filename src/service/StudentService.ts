import { StudentDTO } from '../dto/student';
import { Student } from '../entity/student';
import { IResponseModel } from '../types/response';
import { StudentRepository } from '../repository/student';
import { StudentTableWithGuardian } from '../types/table';

class StudentService {
  private repository: StudentRepository;

  constructor({ repository } = { repository: new StudentRepository() }) {
    this.repository = repository;
  }

  async getAll(): Promise<IResponseModel<Student[]>> {
    const students = await this.repository.getAll();

    return {
      message: '',
      result: students.map(this.mapToStudent),
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

  private mapToStudent(student: StudentTableWithGuardian): Student {
    return new Student(
      new StudentDTO({
        name: student.name,
        birthday: student.birthday,
        gender: student.gender,
        phone: student.phone,
        guardian: {
          name: student.guardian_name,
          phone: student.guardian_phone,
        },
      })
    );
  }
}

export { StudentService };
