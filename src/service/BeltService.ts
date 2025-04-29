import { BeltRepository } from '../repository/beltRepository';
import { IResponseModel } from '../types/response';
import { IBeltType } from '../types/table/belt';

class BeltService {
  private beltRepository: BeltRepository;

  constructor({ beltRepository } = { beltRepository: new BeltRepository() }) {
    this.beltRepository = beltRepository;
  }

  async getAll(): Promise<IResponseModel<IBeltType[]>> {
    const belts = await this.beltRepository.getAll();

    if (!belts || belts.length === 0) {
      return {
        validations: ['Não foi possível encontrar graduções'],
        result: [],
        message: 'Não foi possível encontrar graduções',
      };
    }

    return {
      validations: [],
      result: belts,
      message: '',
    };
  }
}

export { BeltService };
