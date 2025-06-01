import { UUID } from 'crypto';

export interface IGuardianDTO {
  id?: UUID;
  name: string;
  phone: string;
}
