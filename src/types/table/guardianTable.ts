import { UUID } from 'crypto';

export interface GuardianTable {
  id: UUID;
  name: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
