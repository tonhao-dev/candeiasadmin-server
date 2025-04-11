import { UUID } from 'crypto';

export interface BeltTypeTable {
  id: UUID;
  code: string;
  name: string;
  range_start_in_years: number;
  range_end_in_years: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
