import { IGuardianDTO } from '../dto/guardian';
import { ValidationError } from './error';

class Guardian {
  public name?: string = '';
  public phone?: string = '';
  public validation: ValidationError = new ValidationError();

  constructor(guardianDTO?: IGuardianDTO) {
    if (!Guardian.validate(guardianDTO) || !guardianDTO) {
      this.validation.message = 'O guardião deve possuir nome e telefone';
      return;
    }

    this.name = guardianDTO.name;
    this.phone = guardianDTO.phone;
  }

  private static validate(guardianDTO?: IGuardianDTO) {
    if (!guardianDTO) return false;

    return guardianDTO?.name.length > 0 && guardianDTO?.phone.length > 0;
  }
}

export { Guardian };
