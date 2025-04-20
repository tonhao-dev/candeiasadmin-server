import { UUID } from 'crypto';
import db from '../database/connection';

export interface ITeacherRepository {
  graduateToTeacher: (id: UUID) => Promise<boolean>;
}

export class TeacherRepository implements ITeacherRepository {
  async graduateToTeacher(id: UUID) {
    const isSuccessful = await db('person').where('id', id).update({ is_teacher: true });

    return isSuccessful > 0;
  }
}
