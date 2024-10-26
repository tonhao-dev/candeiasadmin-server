import { StudentDTO } from '../dto/student';
import { Student } from '../entity/student';
import { IResponseModel } from '../types/response';
import { StudentRepository } from '../repository/student';
import { StudentList } from '../types/studentTable';

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

  private mapToStudent(student: StudentList): Student {
    return new Student(
      new StudentDTO({
        id: student.id,
        name: student.name,
        birthday: student.birthday,
        gender: student.gender,
        phone: student.phone,
        guardian: {
          name: student.guardian_name,
          phone: student.guardian_phone,
        },
        is_pwd: student.is_pwd,
        race: student.race,
        status: student.status,
        email: student.email,
        address: student.address,
        facebook: student.facebook,
        instagram: student.instagram,
        tiktok: student.tiktok,
        job: student.job,
        education_level: student.education_level,
        course: student.course,
      })
    );
  }
}

export { StudentService };
