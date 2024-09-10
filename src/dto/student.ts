import { Genders } from '../enum/gender';
import { ISODate } from '../types/date';
import { IGuardianDTO } from './guardian';

export class StudentDTO {
  public name: string;
  public birthday: ISODate;
  public gender: Genders = Genders.Other;
  public phone?: string;
  public guardian?: IGuardianDTO;

  constructor({ name, birthday, guardian, phone }: StudentDTO) {
    this.name = name;
    this.birthday = birthday;
    this.guardian = guardian;
    this.phone = phone;
  }
}
