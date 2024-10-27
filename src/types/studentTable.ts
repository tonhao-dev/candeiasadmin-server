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
  birthday: string;
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

export interface StudentRecord extends StudentTable {
  guardian_name: string;
  guardian_phone: string;
  belt_name: string | null;
  belt_title: string | null;
  belt_color_hex_code: string | null;
  belt_type_name: string | null;
  belt_type_code: string | null;
  belt_type_range_start_in_years: number | null;
  belt_type_range_end_in_years: number | null;
  center_name: string | null;
}
