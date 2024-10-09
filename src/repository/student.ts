import { UUID } from 'crypto';
import db from '../database/connection';
import { Student } from '../entity/student';
import { StudentTableWithGuardian } from '../types/table';

export interface IStudentRepository {
  saveOne: (student: Student) => Promise<UUID>;
  getAll: () => Promise<StudentTableWithGuardian[]>;
}

export class StudentRepository implements IStudentRepository {
  async getAll(): Promise<StudentTableWithGuardian[]> {
    const students = await db('student')
      .select('student.*', 'guardian.name as guardian_name', 'guardian.phone as guardian_phone')
      .leftJoin('guardian', 'student.guardian_id', 'guardian.id');

    return students;
  }

  async saveOne(student: Student) {
    const studentData = {
      name: student.name,
      birthday: new Date(student.birthday),
      phone: student.phone,
      gender: student.gender,
      nickname: student.nickname,
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
