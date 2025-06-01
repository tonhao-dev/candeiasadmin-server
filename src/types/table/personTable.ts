import { UUID } from 'crypto';
import { Genders } from '../../enum/gender';
import { Race } from '../../enum/race';
import { Status } from '../../enum/status';
import { BeltTable } from './beltTable';
import { CenterTable } from './centerTable';
import { GuardianTable } from './guardianTable';

export interface PersonTable {
  id: UUID;
  name: string;
  phone: string | null;
  email: string | null;
  gender: Genders;
  birthday: string;
  guardian_id: GuardianTable['id'];
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
  is_teacher: boolean;
  belt_id: BeltTable['id'] | null;
  year_start_capoeira: number | null;
  effective_capoeira_training_time: number | null;
  year_of_last_belt_promotion: number | null;
  trained_in_a_different_group: string | null;
  first_capoeira_teacher: string | null;
  center_id: CenterTable['id'] | null;
  current_teacher_id: PersonTable['id'] | null;
}

export interface PersonRecord extends PersonTable {
  guardian_name: string;
  guardian_phone: string;
  belt_name: string | null;
  belt_title: string | null;
  belt_color_hex_code: string | null;
  belt_type_name: string | null;
  belt_type_code: string | null;
  belt_type_range_start_in_years: number | null;
  belt_type_range_end_in_years: number | null;
  current_teacher_id: UUID | null;
  teacher_name: string | null;
  teacher_phone: string | null;
  teacher_nickname: string | null;
  center_id: UUID | null;
  center_name: string | null;
  center_address: string | null;
  center_longitude: number | null;
  center_latitude: number | null;
}
