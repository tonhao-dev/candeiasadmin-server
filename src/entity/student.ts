import { StudentDTO } from '../dto/student';
import { Genders } from '../enum/gender';
import { ISODate } from '../types/date';
import { differenceInYears, isAfter, isBefore, isValid, parse } from 'date-fns';
import { ValidationError } from './error';
import { Guardian } from './guardian';

class Student {
  public name: string = '';
  public birthday: ISODate = '';
  public gender: Genders = Genders.Other;
  public validation: ValidationError = new ValidationError();
  public phone?: string;
  public guardian?: Guardian;

  constructor(studentDTO: StudentDTO) {
    const validations = Student.validate(studentDTO);
    if (validations.length > 0) {
      this.validation.message = 'Os dados do aluno são inválidos';
      this.validation.validations = validations;
      return;
    }

    this.name = studentDTO.name;
    this.birthday = studentDTO.birthday;
    this.phone = studentDTO.phone;
    this.gender = studentDTO.gender;
    this.guardian = new Guardian(studentDTO.guardian);
  }

  private static validate(studentDTO: StudentDTO): string[] {
    const allValidations = [this.validateBirthday, this.validateName, this.validateChildren];

    const validationsMessages = allValidations.reduce((validations, validation) => {
      const { hasError, message } = validation(studentDTO);

      if (hasError) return [...validations, message];

      return validations;
    }, [] as string[]);

    return validationsMessages;
  }

  private static validateChildren(StudentDTO: StudentDTO): { hasError: boolean; message: string } {
    const ageInYears = differenceInYears(new Date(), new Date(StudentDTO.birthday));

    if (ageInYears >= 18)
      return {
        message: '',
        hasError: false,
      };

    const guardian = new Guardian(StudentDTO.guardian);

    return { hasError: guardian.validation.hasError, message: guardian.validation.message };
  }

  private static validateName(studentDTO: StudentDTO): { hasError: boolean; message: string } {
    if (studentDTO.name === undefined || studentDTO.name === null || studentDTO.name.length === 0)
      return { hasError: true, message: 'Nome é obrigatório' };

    return { hasError: false, message: '' };
  }

  private static validateBirthday(studentDTO: StudentDTO): { hasError: boolean; message: string } {
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
}

export { Student };
