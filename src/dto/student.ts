import { Guardian } from '../entity/guardian';
import { Genders } from '../enum/gender';
import { ISODate } from '../types/date';
import { IGuardianDTO } from './guardian';

interface IStudentDTO {
  name: string;
  birthday: ISODate | Date;
  gender: Genders;
  phone?: string | null | undefined;
  guardian?: IGuardianDTO;
}

export class StudentDTO {
  public name: string;
  public birthday: ISODate;
  public gender: Genders = Genders.Other;
  public phone?: string;
  public guardian?: IGuardianDTO;

  constructor({ name, birthday, guardian, phone, gender }: IStudentDTO) {
    this.name = name;
    this.birthday = typeof birthday === 'string' ? birthday : birthday.toISOString();
    this.phone = phone ?? undefined;
    this.gender = gender;

    if (!guardian || new Guardian(guardian).validation.hasError) return;

    this.guardian = guardian;
  }
}
