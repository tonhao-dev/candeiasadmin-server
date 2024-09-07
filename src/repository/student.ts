import { Student } from "../entity/student";

export interface IStudentRepository {
  saveOne: (student: Student) => Promise<string>;
}

export class StudentRepository implements IStudentRepository {
  async saveOne(student: Student): Promise<string> {
    return '123'
  }
}
