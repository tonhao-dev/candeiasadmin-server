import { UUID } from 'crypto';
import db from '../database/connection';
import { Guardian } from '../entity/guardian';
import { GuardianTable } from '../types/table/guardianTable';

export interface IGuardianRepository {
  getOne: (id: UUID) => Promise<GuardianTable>;
}

export class GuardianRepository implements IGuardianRepository {
  async getOne(id: UUID): Promise<GuardianTable> {
    const guardian = await db('guardian')
      .select('*')
      .where('deleted_at', null)
      .where('id', id)
      .first();

    return guardian;
  }

  async getByPersonId(personId: UUID): Promise<GuardianTable> {
    const guardian = await db('guardian')
      .select('guardian.*')
      .rightJoin('person', 'guardian.id', 'person.guardian_id')
      .where('person.id', personId)
      .first();

    return guardian;
  }

  async create(guardian: Guardian): Promise<GuardianTable> {
    const [createdGuardian] = await db('guardian')
      .insert({
        name: guardian.name,
        phone: guardian.phone,
      })
      .returning('id');

    return createdGuardian;
  }

  async update(id: UUID, guardian: Guardian): Promise<void> {
    await db('guardian').where('id', id).update({
      name: guardian.name,
      phone: guardian.phone,
    });
  }
}
