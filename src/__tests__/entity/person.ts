import { subYears } from 'date-fns';
import { Person } from '../../entity/person';
import { Genders } from '../../enum/gender';
import { faker } from '@faker-js/faker';

describe('Estudante', () => {
  it('deve criar um aluno de maior inválido quando nenhuma informação de contato for passada', () => {
    const person = new Person({
      name: 'Aluno',
      birthday: subYears(new Date(), 18).toISOString(),
      gender: Genders.Male,
    });

    expect(person.validation.hasError).toBe(true);
  });

  it('deve criar um aluno de maior válido quando todas suas informações forem passadas', () => {
    const person = new Person({
      name: 'Aluno',
      birthday: subYears(new Date(), 18).toISOString(),
      gender: Genders.Male,
      email: faker.internet.email(),
    });

    expect(person.validation.hasError).toBe(false);
  });

  it('deve criar um aluno de menor válido quando todas suas informações forem passadas', () => {
    const person = new Person({
      name: 'Aluno',
      birthday: subYears(new Date(), 9).toISOString(),
      gender: Genders.Male,
      guardian: {
        name: 'Pai da criança',
        phone: '68912345678',
      },
    });

    expect(person.validation.hasError).toBe(false);
  });

  it('deve criar um aluno inválido quando ele for criado com nome vazio', () => {
    const person = new Person({
      name: '',
      birthday: new Date().toISOString(),
      gender: Genders.Male,
    });

    expect(person.validation.hasError).toBe(true);
  });

  it('deve criar um aluno inválido quando ele for criado sem data de nascimento', () => {
    const person = new Person({
      name: 'Aluno',
      birthday: '',
      gender: Genders.Male,
    });

    expect(person.validation.hasError).toBe(true);
  });

  it('deve criar um aluno inválido quando ele for criado com data de nascimento inválida', () => {
    const person = new Person({
      name: 'Aluno',
      birthday: 'Data inválida',
      gender: Genders.Male,
    });

    expect(person.validation.hasError).toBe(true);
  });

  it('deve criar um aluno inválido quando a data de nascimento for futura', () => {
    const person = new Person({
      name: 'Aluno',
      birthday: new Date('3000-01-01').toISOString(),
      gender: Genders.Male,
    });

    expect(person.validation.hasError).toBe(true);
  });

  it('deve criar um aluno inválido quando a data de nascimento for anterior a 1900', () => {
    const person = new Person({
      name: 'Aluno',
      birthday: new Date('1899-12-31').toISOString(),
      gender: Genders.Male,
    });

    expect(person.validation.hasError).toBe(true);
  });

  it('deve criar um aluno inválido quando ele for de menor sem guardião', () => {
    const person = new Person({
      name: 'Aluno',
      birthday: subYears(new Date(), 9).toISOString(),
      gender: Genders.Male,
    });

    expect(person.validation.hasError).toBe(true);
  });

  it('deve criar um aluno inválido quando ele for de menor e o guardião não possuir nome', () => {
    const person = new Person({
      name: 'Aluno',
      birthday: subYears(new Date(), 9).toISOString(),
      gender: Genders.Male,
      guardian: {
        name: '',
        phone: '68912345678',
      },
    });

    expect(person.validation.hasError).toBe(true);
  });
});
