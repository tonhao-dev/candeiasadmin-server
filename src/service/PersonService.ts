import { PersonDTO } from '../dto/person';
import { Person } from '../entity/person';
import { Record } from '../entity/record';
import { IResponseModel } from '../types/response';
import { PersonRepository } from '../repository/personRepository';
import { UUID } from 'crypto';

class PersonService {
  private repository: PersonRepository;

  constructor({ repository } = { repository: new PersonRepository() }) {
    this.repository = repository;
  }

  async getOne(id: string): Promise<IResponseModel<Record>> {
    const person = await this.repository.getOne(id);

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
    const people = await this.repository.getAllStudents();
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

    const id = await this.repository.saveOne(person);

    return {
      message: '',
      result: String(id),
      validations: [],
    };
  }

  async update(id: UUID, personDTO: PersonDTO): Promise<IResponseModel<string>> {
    const personData = await this.repository.getOne(id);

    if (!personData) {
      return {
        message: 'O aluno não foi encontrado.',
        result: null,
        validations: ['O aluno não foi encontrado.'],
      };
    }

    const person = new Person(
      new PersonDTO({
        ...personData,
        ...personDTO,
      })
    );

    if (person.validation.hasError) {
      return {
        message: person.validation.message,
        result: null,
        validations: person.validation.validations,
      };
    }

    await this.repository.updateOne(id, person);

    return {
      message: '',
      result: id,
      validations: [],
    };
  }

  async delete(id: UUID): Promise<IResponseModel<string>> {
    const personData = await this.repository.getOne(id);

    if (!personData) {
      return {
        message: 'O aluno não foi encontrado.',
        result: null,
        validations: ['O aluno não foi encontrado.'],
      };
    }

    await this.repository.deleteOne(id);

    return {
      message: '',
      result: String(id),
      validations: [],
    };
  }
}

export { PersonService };
