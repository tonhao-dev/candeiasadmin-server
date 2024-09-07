import { StudentDTO } from '../dto/student';
import { Genders } from '../enum/gender';
import { ISODate } from '../types/date';
import { differenceInYears } from 'date-fns';
import { ValidationError } from './error';
import { Guardian } from './guardian';

class Student {
  public name: string = '';
  public birthday: ISODate = '';
  public validation: ValidationError = new ValidationError();
  public phone?: string;
  public gender?: Genders;
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
    const allValidations = [this.validateChildren];

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
}

export { Student };
