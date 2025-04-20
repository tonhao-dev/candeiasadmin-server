import { PersonDTO } from '../dto/person';
import { Genders } from '../enum/gender';
import { ISODate } from '../types/date';
import { differenceInYears, isAfter, isBefore, isValid } from 'date-fns';
import { ValidationError } from './error';
import { Guardian } from './guardian';
import { Race } from '../enum/race';
import { Status } from '../enum/status';
import { UUID } from 'crypto';

class Person {
  public id?: UUID;
  public name: string = '';
  public birthday: ISODate = '';
  public gender: Genders = Genders.Other;
  public validation: ValidationError = new ValidationError();
  public phone?: string | null;
  public guardian?: Guardian;
  public nickname?: string | null;
  public is_pwd?: boolean = false;
  public race?: Race = Race.Black;
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
  public center_id?: UUID | null;
  public current_teacher_id?: UUID | null;

  constructor(studentDTO: PersonDTO) {
    const validations = Person.validate(studentDTO);
    if (validations.length > 0) {
      this.validation.message = 'Os dados do aluno são inválidos';
      this.validation.validations = validations;
      return;
    }

    this.id = studentDTO.id;
    this.name = studentDTO.name;
    this.birthday = studentDTO.birthday;
    this.phone = studentDTO.phone;
    this.gender = studentDTO.gender;
    this.nickname = studentDTO.nickname;
    this.is_pwd = studentDTO.is_pwd;
    this.race = studentDTO.race;
    this.status = studentDTO.status;
    this.email = studentDTO.email;
    this.address = studentDTO.address;
    this.facebook = studentDTO.facebook;
    this.instagram = studentDTO.instagram;
    this.tiktok = studentDTO.tiktok;
    this.job = studentDTO.job;
    this.education_level = studentDTO.education_level;
    this.course = studentDTO.course;
    this.year_start_capoeira = studentDTO.year_start_capoeira;
    this.effective_capoeira_training_time = studentDTO.effective_capoeira_training_time;
    this.year_of_last_belt_promotion = studentDTO.year_of_last_belt_promotion;
    this.trained_in_a_different_group = studentDTO.trained_in_a_different_group;
    this.first_capoeira_teacher = studentDTO.first_capoeira_teacher;
    this.current_teacher_id = studentDTO.current_teacher_id;

    if (new Guardian(studentDTO.guardian).validation.hasError) return;

    this.guardian = new Guardian(studentDTO.guardian);
  }

  private static validate(studentDTO: PersonDTO): string[] {
    const allValidations = [
      this.validateBirthday,
      this.validateName,
      this.validateHasContact,
      this.validateChildren,
    ];

    const validationsMessages = allValidations.reduce((validations, validation) => {
      const { hasError, message } = validation(studentDTO);

      if (hasError) return [...validations, message];

      return validations;
    }, [] as string[]);

    return validationsMessages;
  }

  private static validateChildren(StudentDTO: PersonDTO): { hasError: boolean; message: string } {
    const ageInYears = differenceInYears(new Date(), new Date(StudentDTO.birthday));

    if (ageInYears >= 18)
      return {
        message: '',
        hasError: false,
      };

    const guardian = new Guardian(StudentDTO.guardian);

    return { hasError: guardian.validation.hasError, message: guardian.validation.message };
  }

  private static validateName(studentDTO: PersonDTO): { hasError: boolean; message: string } {
    if (studentDTO.name === undefined || studentDTO.name === null || studentDTO.name.length === 0)
      return { hasError: true, message: 'Nome é obrigatório' };

    return { hasError: false, message: '' };
  }

  private static validateBirthday(studentDTO: PersonDTO): { hasError: boolean; message: string } {
    if (studentDTO.birthday.length === 0)
      return { hasError: true, message: 'A data de nascimento não pode ser vazia' };

    const birthday = new Date(studentDTO.birthday);

    if (!isValid(birthday)) return { hasError: true, message: 'Data de nascimento é inválida' };
    if (isAfter(birthday, new Date()))
      return { hasError: true, message: 'Data de nascimento não pode ser maior que a data atual' };
    if (isBefore(new Date(studentDTO.birthday), new Date('1900-01-01')))
      return { hasError: true, message: 'Data de nascimento não pode ser menor que 01/01/1900' };

    return { hasError: false, message: '' };
  }

  private static validateHasContact(studentDTO: PersonDTO): {
    hasError: boolean;
    message: string;
  } {
    const ageInYears = differenceInYears(new Date(), new Date(studentDTO.birthday));

    if (ageInYears < 18) return { hasError: false, message: '' };

    if (!studentDTO.phone && !studentDTO.email)
      return { hasError: true, message: 'O aluno precisa ter ao menos um contato' };

    return { hasError: false, message: '' };
  }
}

export { Person };
