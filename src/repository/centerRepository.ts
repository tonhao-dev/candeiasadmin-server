import { UUID } from 'crypto';
import db from '../database/connection';
import { CenterTable } from '../types/table/centerTable';

export interface ICenterRepository {
  getAll: () => Promise<CenterTable[]>;
  saveOne: (name: string, address: string, latitude?: number, longitude?: number) => Promise<UUID>;
  update: (id: UUID, center: Partial<CenterTable>) => Promise<void>;
  deleteOne: (id: UUID) => Promise<void>;
}

export class CenterRepository implements ICenterRepository {
  async getAll(): Promise<CenterTable[]> {
    const centers = await db('center').select('*').where('deleted_at', null);

    return centers;
  }

  async getOne(id: UUID): Promise<CenterTable> {
    const person = await db('center').select('*').where('deleted_at', null).where('id', id).first();

    return person;
  }

  async saveOne(
    name: string,
    address: string,
    latitude?: number,
    longitude?: number
  ): Promise<UUID> {
    const [{ id }] = await db('center')
      .insert({
        name,
        address,
        latitude,
        longitude,
      })
      .returning('id');

    return id;
  }

  async update(id: UUID, center: Partial<CenterTable>): Promise<void> {
    const centerData: Partial<CenterTable> = {
      name: center.name,
      address: center.address,
      latitude: center.latitude,
      longitude: center.longitude,
    };

    await db('center')
      .where('id', id)
      .update({
        ...centerData,
        updated_at: db.fn.now(),
      });
  }

  async deleteOne(id: UUID): Promise<void> {
    await db('center').where('id', id).update({
      deleted_at: db.fn.now(),
    });
  }
}
