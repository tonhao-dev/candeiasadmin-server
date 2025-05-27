import { UUID } from 'crypto';
import { CenterDTO } from '../dto/center';
import { Center } from '../entity/center';
import { CenterRepository } from '../repository/centerRepository';
import { IResponseModel } from '../types/response';
import { CenterTable } from '../types/table/centerTable';

class CenterService {
  private centerRepository: CenterRepository;

  constructor({ centerRepository } = { centerRepository: new CenterRepository() }) {
    this.centerRepository = centerRepository;
  }

  async getAll(): Promise<IResponseModel<CenterTable[]>> {
    const centers = await this.centerRepository.getAll();

    return {
      validations: [],
      result: centers,
      message: '',
    };
  }

  async getOne(id: UUID): Promise<IResponseModel<CenterTable | null>> {
    const center = await this.centerRepository.getOne(id);
    if (!center) {
      return {
        message: 'Centro não encontrado',
        result: null,
        validations: ['Centro não encontrado'],
      };
    }
    return {
      message: '',
      result: center,
      validations: [],
    };
  }

  async create(centerDTO: CenterDTO): Promise<IResponseModel<UUID>> {
    const center = new Center(centerDTO);

    if (center.validation.hasError) {
      return {
        message: center.validation.message,
        result: null,
        validations: center.validation.validations,
      };
    }

    const id = await this.centerRepository.saveOne(
      center.name,
      center.address,
      center.getLatitude()!,
      center.getLongitude()!
    );

    return {
      message: 'Centro criado com sucesso',
      result: id,
      validations: [],
    };
  }

  async update(id: UUID, centerDTO: Partial<CenterDTO>): Promise<IResponseModel<UUID>> {
    const existingCenter = await this.centerRepository.getOne(id);

    if (!existingCenter) {
      return {
        message: 'Centro de treinamento não encontrado',
        result: null,
        validations: ['Centro de treinamento não encontrado'],
      };
    }

    const mergedDTO = {
      ...existingCenter,
      ...centerDTO,
      id,
    };

    const center = new Center(mergedDTO);

    if (center.validation.hasError) {
      return {
        message: center.validation.message,
        result: null,
        validations: center.validation.validations,
      };
    }

    await this.centerRepository.update(id, {
      name: center.name,
      address: center.address,
      latitude: center.getLatitude(),
      longitude: center.getLongitude(),
    });

    return {
      message: 'Centro atualizado com sucesso',
      result: id,
      validations: [],
    };
  }

  async delete(id: UUID): Promise<IResponseModel<UUID>> {
    const center = await this.centerRepository.getOne(id);

    if (!center) {
      return {
        message: 'Centro não encontrado',
        result: null,
        validations: ['Centro não encontrado'],
      };
    }

    await this.centerRepository.deleteOne(id);

    return {
      message: 'Centro deletado com sucesso',
      result: id,
      validations: [],
    };
  }
}

export { CenterService };
