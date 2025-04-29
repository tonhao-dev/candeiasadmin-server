import { UUID } from 'crypto';

export interface CenterTable {
  id: UUID;
  name: string;
  address: string;
  longitude?: number | null;
  latitude?: number | null;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}
