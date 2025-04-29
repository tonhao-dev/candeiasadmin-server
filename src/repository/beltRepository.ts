import db from '../database/connection';
import { IBeltType } from '../types/table/belt';

export class BeltRepository {
  async getAll(): Promise<IBeltType[]> {
    const beltTypes = await db('belt_type').select('*');
    const belts = await db('belt').select('*');

    const beltTypeMap: Record<string, IBeltType> = {};

    for (const beltType of beltTypes) {
      beltTypeMap[beltType.code] = {
        ...beltType,
        belts: [],
      };
    }

    for (const belt of belts) {
      const beltType = beltTypeMap[belt.belt_type_code];
      if (beltType) {
        beltType.belts.push(belt);
      }
    }

    return Object.values(beltTypeMap);
  }
}
