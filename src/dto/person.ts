import { UUID } from 'crypto';
import { Guardian } from '../entity/guardian';
import { Genders } from '../enum/gender';
import { Race } from '../enum/race';
import { Status } from '../enum/status';
import { ISODate } from '../types/date';
import { IGuardianDTO } from './guardian';

interface IPersonDTO {
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
  is_teacher?: boolean;
  belt_id: UUID | null;
  year_start_capoeira?: number | null;
  effective_capoeira_training_time?: number | null;
  year_of_last_belt_promotion?: number | null;
  trained_in_a_different_group?: string | null;
  first_capoeira_teacher?: string | null;
  center_id?: UUID | null;
  current_teacher_id?: UUID | null;
}

export class PersonDTO implements IPersonDTO {
  public id?;
  public name;
  public birthday;
  public gender;
  public phone?;
  public guardian?;
  public nickname?;
  public is_pwd?;
  public race?;
  public status?;
  public email?;
  public address?;
  public facebook?;
  public instagram?;
  public tiktok?;
  public job?;
  public education_level?;
  public course?;
  public is_teacher? = false;
  public belt_id: UUID | null = null;
  public center_id;
  public year_start_capoeira?;
  public effective_capoeira_training_time?;
  public year_of_last_belt_promotion?;
  public trained_in_a_different_group?;
  public first_capoeira_teacher?;
  public current_teacher_id?;

  constructor(personDTO: IPersonDTO) {
    this.id = personDTO.id;
    this.name = personDTO.name;
    this.birthday =
      typeof personDTO.birthday === 'string'
        ? personDTO.birthday
        : personDTO.birthday.toISOString();
    this.phone = personDTO.phone ?? null;
    this.gender = personDTO.gender;
    this.nickname = personDTO.nickname ?? null;
    this.is_pwd = personDTO.is_pwd;
    this.race = personDTO.race;
    this.status = personDTO.status;
    this.email = personDTO.email ?? null;
    this.address = personDTO.address ?? null;
    this.facebook = personDTO.facebook ?? null;
    this.instagram = personDTO.instagram ?? null;
    this.tiktok = personDTO.tiktok ?? null;
    this.job = personDTO.job ?? null;
    this.education_level = personDTO.education_level ?? null;
    this.course = personDTO.course ?? null;
    this.is_teacher = personDTO.is_teacher ?? false;
    this.year_start_capoeira = personDTO.year_start_capoeira ?? null;
    this.effective_capoeira_training_time = personDTO.effective_capoeira_training_time ?? null;
    this.year_of_last_belt_promotion = personDTO.year_of_last_belt_promotion ?? null;
    this.trained_in_a_different_group = personDTO.trained_in_a_different_group ?? null;
    this.first_capoeira_teacher = personDTO.first_capoeira_teacher ?? null;
    this.current_teacher_id = personDTO.current_teacher_id ?? null;
    this.belt_id = personDTO.belt_id ?? null;
    this.center_id = personDTO.center_id ?? null;

    if (!personDTO.guardian || new Guardian(personDTO.guardian).validation.hasError) return;

    this.guardian = personDTO.guardian;
  }
}
