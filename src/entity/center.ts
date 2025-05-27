import { UUID } from 'crypto';
import { ICenterDTO } from '../dto/center';
import { ValidationError } from './error';

class Center {
  private _id?: UUID;
  public name: string = '';
  public address: string = '';
  private longitude?: number | null;
  private latitude?: number | null;
  public validation: ValidationError = new ValidationError();

  constructor(centerDTO?: ICenterDTO) {
    const validations = Center.validate(centerDTO);

    if (!centerDTO || validations.length > 0) {
      this.validation.message = 'As informações do centro são inválidas';
      this.validation.validations = validations;
      return;
    }

    this._id = centerDTO.id;
    this.name = centerDTO.name.trim();
    this.address = centerDTO.address.trim();
    this.longitude = centerDTO.longitude ?? null;
    this.latitude = centerDTO.latitude ?? null;
  }

  private static validate(centerDTO?: ICenterDTO): string[] {
    if (!centerDTO) return ['Centro não informado'];

    const validations: string[] = [];

    if (!centerDTO.name || centerDTO.name.trim().length === 0) {
      validations.push('Nome é obrigatório');
    }

    if (!centerDTO.address || centerDTO.address.trim().length === 0) {
      validations.push('Endereço é obrigatório');
    }

    const hasLatitude = centerDTO.latitude !== undefined && centerDTO.latitude !== null;
    const hasLongitude = centerDTO.longitude !== undefined && centerDTO.longitude !== null;

    if ((hasLatitude && !hasLongitude) || (!hasLatitude && hasLongitude)) {
      validations.push('Latitude e longitude devem ser fornecidas juntas');
    }

    return validations;
  }

  public get id(): UUID | undefined {
    return this._id;
  }

  public updateCoordinates(latitude?: number | null, longitude?: number | null) {
    if (!latitude || !longitude) {
      this.validation.message = 'Latitude e longitude devem ser alteradas juntas';
      this.validation.validations = ['Latitude e longitude devem ser fornecidas ou ambas nulas'];
      return false;
    }

    this.latitude = latitude;
    this.longitude = longitude;
    return true;
  }

  public getLatitude(): number | null | undefined {
    return this.latitude;
  }

  public getLongitude(): number | null | undefined {
    return this.longitude;
  }
}

export { Center };
