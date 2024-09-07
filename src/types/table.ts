import { UUID } from 'crypto';

export interface StudentTable {
  id: UUID;
  name: string;
  phone: string | null;
  email: string | null;
  birthday: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface GuardianTable {
  id: UUID;
  name: string;
  phone: string | null;
  email: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
