import { UUID } from 'crypto';

export interface ICenterDTO {
  id?: UUID;
  name: string;
  address: string;
  longitude?: number | null;
  latitude?: number | null;
}

export class CenterDTO implements ICenterDTO {
  public id?;
  public name;
  public address;
  public longitude?;
  public latitude?;

  constructor(centerDTO: ICenterDTO) {
    this.id = centerDTO.id;
    this.name = centerDTO.name;
    this.address = centerDTO.address;
    this.longitude = centerDTO.longitude ?? null;
    this.latitude = centerDTO.latitude ?? null;
  }
}
