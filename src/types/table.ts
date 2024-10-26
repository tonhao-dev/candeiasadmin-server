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
  belt_id: UUID | null;
  year_start_capoeira: number | null;
  effective_capoeira_training_time: number | null;
  year_of_last_belt_promotion: number | null;
  trained_in_a_different_group: string | null;
  first_capoeira_teacher: string | null;
  center_id: UUID | null;
  current_teacher: string | null;
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
