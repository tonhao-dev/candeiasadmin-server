import { IGuardianDTO } from '../dto/guardian';
import { ValidationError } from './error';

class Guardian {
  public name?: string = '';
  public phone?: string = '';
  public validation: ValidationError = new ValidationError();

  constructor(guardianDTO?: IGuardianDTO) {
    const validations = Guardian.validate(guardianDTO);
    if (!guardianDTO || validations.length > 0) {
      this.validation.message = 'As informações do guardião são inválidas';
      this.validation.validations = validations;
      return;
    }

    this.name = guardianDTO.name;
    this.phone = guardianDTO.phone;
  }

  private static validate(guardianDTO?: IGuardianDTO) {
    if (!guardianDTO) return ['O guardião deve possuir nome e telefone'];

    const allValidations = [this.validateName, this.validatePhone];

    const validationsMessages = allValidations.reduce((validations, validation) => {
      const { hasError, message } = validation(guardianDTO);

      if (hasError) return [...validations, message];

      return validations;
    }, [] as string[]);

    return validationsMessages;
  }

  private static validateName(guardianDTO?: IGuardianDTO) {
    if (!guardianDTO || !guardianDTO.name || guardianDTO.name.length === 0)
      return { hasError: true, message: 'Nome é obrigatório' };

    return { hasError: false, message: '' };
  }

  private static validatePhone(guardianDTO?: IGuardianDTO) {
    if (!guardianDTO || !guardianDTO.phone || guardianDTO.phone.length === 0)
      return { hasError: true, message: 'Telefone é obrigatório' };

    return { hasError: false, message: '' };
  }
}

export { Guardian };
