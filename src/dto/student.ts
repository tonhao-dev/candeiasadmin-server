import { UUID } from 'crypto';
import { Guardian } from '../entity/guardian';
import { Genders } from '../enum/gender';
import { Race } from '../enum/race';
import { Status } from '../enum/status';
import { ISODate } from '../types/date';
import { IGuardianDTO } from './guardian';

interface IStudentDTO {
  id?: UUID;
  name: string;
  birthday: ISODate | Date;
  gender: Genders;
  phone?: string | null | undefined;
  guardian?: IGuardianDTO;
  nickname?: string | null;
  is_pwd?: boolean;
  race?: Race;
  status?: Status;
  email?: string | null;
  address?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  job?: string | null;
  education_level?: string | null;
  course?: string | null;
  belt_id?: string | null;
  year_start_capoeira?: number | null;
  effective_capoeira_training_time?: number | null;
  year_of_last_belt_promotion?: number | null;
  trained_in_a_different_group?: string | null;
  first_capoeira_teacher?: string | null;
  center_id?: UUID | null;
  current_teacher_id?: UUID | null;
}

export class StudentDTO implements IStudentDTO {
  public id?: UUID;
  public name: string;
  public birthday: ISODate;
  public gender: Genders = Genders.Other;
  public phone?: string | null;
  public guardian?: IGuardianDTO;
  public nickname?: string | null;
  public is_pwd?: boolean = false;
  public race?: Race = Race.NotDeclared;
  public status?: Status = Status.Active;
  public email?: string | null;
  public address?: string | null;
  public facebook?: string | null;
  public instagram?: string | null;
  public tiktok?: string | null;
  public job?: string | null;
  public education_level?: string | null;
  public course?: string | null;
  public year_start_capoeira?: number | null;
  public effective_capoeira_training_time?: number | null;
  public year_of_last_belt_promotion?: number | null;
  public trained_in_a_different_group?: string | null;
  public first_capoeira_teacher?: string | null;
  public current_teacher_id?: UUID | null;

  constructor(studentDTO: IStudentDTO) {
    this.id = studentDTO.id;
    this.name = studentDTO.name;
    this.birthday =
      typeof studentDTO.birthday === 'string'
        ? studentDTO.birthday
        : studentDTO.birthday.toISOString();
    this.phone = studentDTO.phone ?? null;
    this.gender = studentDTO.gender;
    this.nickname = studentDTO.nickname ?? null;
    this.is_pwd = studentDTO.is_pwd;
    this.race = studentDTO.race;
    this.status = studentDTO.status;
    this.email = studentDTO.email ?? null;
    this.address = studentDTO.address ?? null;
    this.facebook = studentDTO.facebook ?? null;
    this.instagram = studentDTO.instagram ?? null;
    this.tiktok = studentDTO.tiktok ?? null;
    this.job = studentDTO.job ?? null;
    this.education_level = studentDTO.education_level ?? null;
    this.course = studentDTO.course ?? null;
    this.year_start_capoeira = studentDTO.year_start_capoeira ?? null;
    this.effective_capoeira_training_time = studentDTO.effective_capoeira_training_time ?? null;
    this.year_of_last_belt_promotion = studentDTO.year_of_last_belt_promotion ?? null;
    this.trained_in_a_different_group = studentDTO.trained_in_a_different_group ?? null;
    this.first_capoeira_teacher = studentDTO.first_capoeira_teacher ?? null;
    this.current_teacher_id = studentDTO.current_teacher_id ?? null;

    if (!studentDTO.guardian || new Guardian(studentDTO.guardian).validation.hasError) return;

    this.guardian = studentDTO.guardian;
  }
}
