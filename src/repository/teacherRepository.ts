import { UUID } from 'crypto';
import db from '../database/connection';
import { PersonRecord } from '../types/table/personTable';

export interface ITeacherRepository {
  graduateToTeacher: (id: UUID) => Promise<boolean>;
}

export class TeacherRepository implements ITeacherRepository {
  async getAll(): Promise<PersonRecord[]> {
    const people = await this._buildPersonQuery()
      .where('person.deleted_at', null)
      .where('person.is_teacher', true);

    return people;
  }

  async graduateToTeacher(id: UUID) {
    const isSuccessful = await db('person').where('id', id).update({ is_teacher: true });

    return isSuccessful > 0;
  }

  async revokeTeacherStatus(id: UUID) {
    const isSuccessful = await db('person').where('id', id).update({ is_teacher: false });
    return isSuccessful > 0;
  }

  async updateCenter(id: UUID, centerId: UUID) {
    const centerExists = await db('center').where('id', centerId).first();
    if (!centerExists) {
      console.log(`Centro de treinamento com ID ${centerId} não encontrado.`);
      return false;
    }
    const isSuccessful = await db('person').where('id', id).update({ center_id: centerId });
    return isSuccessful > 0;
  }

  private _buildPersonQuery() {
    return db('person')
      .select(
        'person.*',
        'guardian.name as guardian_name',
        'guardian.phone as guardian_phone',
        'belt.name as belt_name',
        'belt.title as belt_title',
        'belt.color_hex_code as belt_color_hex_code',
        'belt_type.name as belt_type_name',
        'belt_type.code as belt_type_code',
        'belt_type.range_start_in_years as belt_type_range_start_in_years',
        'belt_type.range_end_in_years as belt_type_range_end_in_years',
        'teacher.id as teacher_id',
        'teacher.name as teacher_name',
        'teacher.phone as teacher_phone',
        'teacher.nickname as teacher_nickname',
        'center.name as center_name',
        'center.name as center_name'
      )
      .leftJoin('guardian', 'person.guardian_id', 'guardian.id')
      .leftJoin('belt', 'person.belt_id', 'belt.id')
      .leftJoin('belt_type', 'belt.belt_type_code', 'belt_type.code')
      .leftJoin('center', 'person.center_id', 'center.id')
      .leftJoin('person as teacher', 'person.current_teacher_id', 'teacher.id');
  }
}
