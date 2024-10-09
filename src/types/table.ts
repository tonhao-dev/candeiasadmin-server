import { UUID } from 'crypto';
import { Genders } from '../enum/gender';
import { Race } from '../enum/race';
import { Status } from '../enum/status';

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
  nickname: string | null;
  is_pwd: boolean;
  race: Race;
  status: Status;
  address: string | null;
  facebook: string | null;
  instagram: string | null;
  tiktok: string | null;
  job: string | null;
  education_level: string | null;
  course: string | null;
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
