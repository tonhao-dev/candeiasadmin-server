import { UUID } from 'crypto';
import { ValidationError } from './error';
import { ICenterDTO } from '../dto/center';

class Center {
  private _id?: UUID;
  public name: string = '';
  public address: string = '';
  public longitude?: number | null;
  public latitude?: number | null;
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
}

export { Center };
