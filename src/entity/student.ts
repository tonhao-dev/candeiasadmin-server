import { StudentDTO } from '../dto/student';
import { Genders } from "../enum/gender"
import { ISODate } from "../types/date"
import { differenceInYears } from 'date-fns';
import { ValidationError } from './error';
import { Guardian } from './guardian';

class Student {
  public name: string = ''
  public birthday: ISODate = ''
  public validation: ValidationError = new ValidationError()
  public phone?: string
  public gender?: Genders

  constructor(studentDTO: StudentDTO) {
    const validations = Student.validate(studentDTO)
    if (validations.length > 0) {
      this.validation.hasError = true
      this.validation.message = 'Invalid student data',
        this.validation.validations = validations
      return
    }

    this.name = studentDTO.name
    this.birthday = studentDTO.birthday
    this.phone = studentDTO.phone
    this.gender = studentDTO.gender
  }

  private static validate(studentDTO: StudentDTO): string[] {
    const allValidations = [
      this.validateChildren,
    ]

    return allValidations.reduce((validations, validation) => {
      const { hasError, message } = validation(studentDTO)

      if (hasError) return [...validations, message]

      return validations
    }, [] as string[])
  }

  private static validateChildren(StudentDTO: StudentDTO): { hasError: boolean, message: string } {
    const ageInYears = differenceInYears(new Date(), new Date(StudentDTO.birthday))

    if (ageInYears >= 18) return {
      message: '',
      hasError: true
    }

    const guardian = new Guardian(StudentDTO.guardian)

    return { hasError: !guardian.validation.hasError, message: guardian.validation.message }
  }
}

export { Student }
