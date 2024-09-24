import { UUID } from 'crypto';
import db from '../database/connection';
import { Student } from '../entity/student';

export interface IStudentRepository {
  saveOne: (student: Student) => Promise<UUID>;
}

export class StudentRepository implements IStudentRepository {
  async saveOne(student: Student) {
    const studentData = {
      name: student.name,
      birthday: new Date(student.birthday),
      phone: student.phone,
      gender: student.gender,
    };

    if (!student.guardian) {
      const [{ id }] = await db('student').insert(studentData).returning('id');

      return id;
    }

    const [{ id: guardianId }] = await db('guardian')
      .insert({
        name: student.guardian.name,
        phone: student.guardian.phone,
      })
      .returning('id');

    const [{ id }] = await db('student')
      .insert({ ...studentData, guardian_id: guardianId })
      .returning('id');

    return id;
  }
}
