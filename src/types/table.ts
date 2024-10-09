import { UUID } from 'crypto';
import { Genders } from '../enum/gender';

export interface StudentTable {
  id: UUID;
  name: string;
  phone: string | null;
  email: string | null;
  gender: Genders;
  birthday: Date;
  guardian_id: UUID;
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

export interface StudentTableWithGuardian extends StudentTable {
  guardian_name: string;
  guardian_phone: string;
}
