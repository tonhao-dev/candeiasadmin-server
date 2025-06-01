import { UUID } from 'crypto';
import db from '../database/connection';
import { Person } from '../entity/person';
import { PersonRecord, PersonTable } from '../types/table/personTable';

export interface IPersonRepository {
  saveOne: (person: Person) => Promise<UUID>;
  getAllStudents: () => Promise<PersonRecord[]>;
  getOne: (id: string) => Promise<PersonRecord>;
}

export class PersonRepository implements IPersonRepository {
  async getOne(id: string): Promise<PersonRecord> {
    const person = await this._buildPersonQuery()
      .where('person.deleted_at', null)
      .where('person.id', id)
      .first();

    return person;
  }

  async getAllStudents(): Promise<PersonRecord[]> {
    const people = await this._buildPersonQuery()
      .where('person.deleted_at', null)
      .where('person.is_teacher', false);

    return people;
  }

  async saveOne(person: Person) {
    const personData = {
      name: person.name,
      birthday: person.birthday,
      gender: person.gender,
      phone: person.phone,
      email: person.email,
    };

    if (!person.guardian) {
      const [{ id }] = await db('person').insert(personData).returning('id');

      return id;
    }

    const [{ id: guardianId }] = await db('guardian')
      .insert({
        name: person.guardian.name,
        phone: person.guardian.phone,
      })
      .returning('id');

    const [{ id }] = await db('person')
      .insert({ ...personData, guardian_id: guardianId })
      .returning('id');

    return id;
  }

  async updateOne(id: UUID, person: Person) {
    const personData: Partial<PersonTable> = {
      name: person.name,
      phone: person.phone,
      email: person.email,
      gender: person.gender,
      birthday: person.birthday,
      nickname: person.nickname,
      is_pwd: person.is_pwd,
      race: person.race,
      status: person.status,
      address: person.address,
      facebook: person.facebook,
      instagram: person.instagram,
      tiktok: person.tiktok,
      job: person.job,
      education_level: person.education_level,
      course: person.course,
      year_start_capoeira: person.year_start_capoeira,
      effective_capoeira_training_time: person.effective_capoeira_training_time,
      year_of_last_belt_promotion: person.year_of_last_belt_promotion,
      trained_in_a_different_group: person.trained_in_a_different_group,
      first_capoeira_teacher: person.first_capoeira_teacher,
      current_teacher_id: person.current_teacher_id,
      center_id: person.center_id,
      belt_id: person.belt_id,
      guardian_id: person.guardian?.id,
    };

    await db('person').where('id', id).update(personData);
  }

  async deleteOne(id: UUID) {
    await db('person').where('id', id).update({ deleted_at: new Date() });
  }

  private _buildPersonQuery() {
    return db('person')
      .select(
        'person.*',
        'guardian.name as guardian_name',
        'guardian.phone as guardian_phone',
        'belt.id as belt_id',
        'belt.name as belt_name',
        'belt.title as belt_title',
        'belt.color_hex_code as belt_color_hex_code',
        'belt_type.name as belt_type_name',
        'belt_type.code as belt_type_code',
        'belt_type.range_start_in_years as belt_type_range_start_in_years',
        'belt_type.range_end_in_years as belt_type_range_end_in_years',
        'person.current_teacher_id',
        'teacher.id as teacher_id',
        'teacher.name as teacher_name',
        'teacher.phone as teacher_phone',
        'teacher.nickname as teacher_nickname',
        'center.name as center_name'
      )
      .leftJoin('guardian', 'person.guardian_id', 'guardian.id')
      .leftJoin('belt', 'person.belt_id', 'belt.id')
      .leftJoin('belt_type', 'belt.belt_type_code', 'belt_type.code')
      .leftJoin('center', 'person.center_id', 'center.id')
      .leftJoin('person as teacher', 'person.current_teacher_id', 'teacher.id');
  }
}
