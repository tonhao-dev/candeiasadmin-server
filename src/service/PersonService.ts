import { UUID } from 'crypto';
import { PersonDTO } from '../dto/person';
import { Person } from '../entity/person';
import { Record } from '../entity/record';
import { GuardianRepository } from '../repository/guardianRepository';
import { PersonRepository } from '../repository/personRepository';
import { IResponseModel } from '../types/response';

class PersonService {
  constructor(
    private personRepository: PersonRepository = new PersonRepository(),
    private guardianRepository: GuardianRepository = new GuardianRepository()
  ) {}

  async getOne(id: string): Promise<IResponseModel<Record>> {
    const person = await this.personRepository.getOne(id);

    if (!person) {
      return {
        message: 'O aluno não foi encontrado.',
        result: null,
        validations: ['O aluno não foi encontrado.'],
      };
    }

    return {
      message: '',
      result: new Record(person),
      validations: [],
    };
  }

  async getAllStudents(): Promise<IResponseModel<Record[]>> {
    const people = await this.personRepository.getAllStudents();
    const records = people.map(person => new Record(person));

    return {
      message: '',
      result: records,
      validations: [],
    };
  }

  async create(personDTO: PersonDTO): Promise<IResponseModel<string>> {
    const person = new Person(personDTO);

    if (person.validation.hasError) {
      return {
        message: person.validation.message,
        result: null,
        validations: person.validation.validations,
      };
    }

    const id = await this.personRepository.saveOne(person);

    return {
      message: '',
      result: String(id),
      validations: [],
    };
  }

  async update(id: UUID, personDTO: PersonDTO): Promise<IResponseModel<string>> {
    const personData = await this.personRepository.getOne(id);

    if (!personData) {
      return {
        message: 'O aluno não foi encontrado.',
        result: null,
        validations: ['O aluno não foi encontrado.'],
      };
    }

    const existingGuardian = await this.guardianRepository.getByPersonId(id);

    const person = new Person(
      new PersonDTO({
        ...personData,
        ...personDTO,
        guardian: {
          ...existingGuardian,
        },
      })
    );

    if (!!existingGuardian && !!person.guardian) {
      this.guardianRepository.update(existingGuardian.id, person.guardian);
    }

    if (!existingGuardian && person.guardian) {
      const guardian = await this.guardianRepository.create(person.guardian);
      person.guardian.id = guardian.id;
    }

    if (person.validation.hasError) {
      return {
        message: person.validation.message,
        result: null,
        validations: person.validation.validations,
      };
    }

    await this.personRepository.updateOne(id, person);

    return {
      message: 'As informações foram atualizadas com sucesso.',
      result: id,
      validations: [],
    };
  }

  async delete(id: UUID): Promise<IResponseModel<string>> {
    const personData = await this.personRepository.getOne(id);

    if (!personData) {
      return {
        message: 'O aluno não foi encontrado.',
        result: null,
        validations: ['O aluno não foi encontrado.'],
      };
    }

    await this.personRepository.deleteOne(id);

    return {
      message: '',
      result: String(id),
      validations: [],
    };
  }
}

export { PersonService };
