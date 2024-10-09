import { Guardian } from '../entity/guardian';
import { Genders } from '../enum/gender';
import { Race } from '../enum/race';
import { Status } from '../enum/status';
import { ISODate } from '../types/date';
import { IGuardianDTO } from './guardian';

interface IStudentDTO {
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
}

export class StudentDTO implements IStudentDTO {
  public name: string;
  public birthday: ISODate;
  public gender: Genders = Genders.Other;
  public phone?: string;
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

  constructor(studentDTO: IStudentDTO) {
    this.name = studentDTO.name;
    this.birthday =
      typeof studentDTO.birthday === 'string'
        ? studentDTO.birthday
        : studentDTO.birthday.toISOString();
    this.phone = studentDTO.phone ?? undefined;
    this.gender = studentDTO.gender;
    this.nickname = studentDTO.nickname ?? undefined;
    this.is_pwd = studentDTO.is_pwd;
    this.race = studentDTO.race;
    this.status = studentDTO.status;
    this.email = studentDTO.email ?? undefined;
    this.address = studentDTO.address ?? undefined;
    this.facebook = studentDTO.facebook ?? undefined;
    this.instagram = studentDTO.instagram ?? undefined;
    this.tiktok = studentDTO.tiktok ?? undefined;
    this.job = studentDTO.job ?? undefined;
    this.education_level = studentDTO.education_level ?? undefined;
    this.course = studentDTO.course ?? undefined;

    if (!studentDTO.guardian || new Guardian(studentDTO.guardian).validation.hasError) return;

    this.guardian = studentDTO.guardian;
  }
}
