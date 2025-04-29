import { BeltTable } from './beltTable';
import { BeltTypeTable } from './beltTypeTable';

export interface IBeltType extends Omit<BeltTypeTable, 'updated_at' | 'created_at' | 'deleted_at'> {
  belts: Belt[];
}

export type Belt = Omit<BeltTable, 'updated_at' | 'created_at' | 'deleted_at'>;
