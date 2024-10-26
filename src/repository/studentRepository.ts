import { UUID } from 'crypto';
import db from '../database/connection';
import { Student } from '../entity/student';
import { StudentList } from '../types/studentTable';

export interface IStudentRepository {
  saveOne: (student: Student) => Promise<UUID>;
  getAll: () => Promise<StudentList[]>;
  getOne: (id: string) => Promise<StudentList>;
}

export class StudentRepository implements IStudentRepository {
  async getOne(id: string): Promise<StudentList> {
    const student = await this._buildStudentQuery().where('student.id', id).first();

    return student;
  }

  async getAll(): Promise<StudentList[]> {
    const students = await this._buildStudentQuery();

    return students;
  }

  async saveOne(student: Student) {
    const studentData = {
      name: student.name,
      birthday: new Date(student.birthday),
      gender: student.gender,
      phone: student.phone,
      email: student.email,
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

  async updateOne(id: string, student: Student) {
    const studentData = {
      name: student.name,
      phone: student.phone,
      email: student.email,
      gender: student.gender,
      birthday: new Date(student.birthday),
      updated_at: new Date(),
      nickname: student.nickname,
      is_pwd: student.is_pwd,
      race: student.race,
      status: student.status,
      address: student.address,
      facebook: student.facebook,
      instagram: student.instagram,
      tiktok: student.tiktok,
      job: student.job,
      education_level: student.education_level,
      course: student.course,
      year_start_capoeira: student.year_start_capoeira,
      effective_capoeira_training_time: student.effective_capoeira_training_time,
      year_of_last_belt_promotion: student.year_of_last_belt_promotion,
      trained_in_a_different_group: student.trained_in_a_different_group,
      first_capoeira_teacher: student.first_capoeira_teacher,
      current_teacher: student.current_teacher,
    };

    await db('student').where('id', id).update(studentData);
  }

  private _buildStudentQuery() {
    return db('student')
      .select(
        'student.*',
        'guardian.name as guardian_name',
        'guardian.phone as guardian_phone',
        'belt.name as belt_name',
        'belt.title as belt_title',
        'belt.color_hex_code as belt_color_hex_code',
        'belt_type.name as belt_type_name',
        'belt_type.code as belt_type_code',
        'belt_type.range_start_in_years as belt_type_range_start_in_years',
        'belt_type.range_end_in_years as belt_type_range_end_in_years',
        'center.name as center_name'
      )
      .leftJoin('guardian', 'student.guardian_id', 'guardian.id')
      .leftJoin('belt', 'student.belt_id', 'belt.id')
      .leftJoin('belt_type', 'belt.belt_type_code', 'belt_type.code')
      .leftJoin('center', 'student.center_id', 'center.id');
  }
}
