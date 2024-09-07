import { UUID } from 'crypto';
import db from '../database/connection';
import { Student } from '../entity/student';

export interface IStudentRepository {
  saveOne: (student: Student) => Promise<UUID>;
}

export class StudentRepository implements IStudentRepository {
  async saveOne(student: Student) {
    const [{ id }] = await db('student')
      .insert({
        name: student.name,
        birthday: new Date(student.birthday),
        phone: student.phone,
      })
      .returning('id');

    if (!student.guardian) return id;

    return id;
  }
}
