import { subYears } from 'date-fns';
import { Student } from '../../entity/student';
import { Genders } from '../../enum/gender';

describe('Estudante', () => {
  it('deve criar um aluno de maior válido quando todas suas informações forem passadas', () => {
    const student = new Student({
      name: 'Aluno',
      birthday: subYears(new Date(), 18).toISOString(),
      gender: Genders.Male,
    });

    expect(student.validation.hasError).toBe(false);
  });

  it('deve criar um aluno de menor válido quando todas suas informações forem passadas', () => {
    const student = new Student({
      name: 'Aluno',
      birthday: subYears(new Date(), 9).toISOString(),
      gender: Genders.Male,
      guardian: {
        name: 'Pai da criança',
        phone: '68912345678',
      },
    });

    expect(student.validation.hasError).toBe(false);
  });

  it('deve criar um aluno inválido quando ele for criado sem nome', () => {
    const student = new Student({
      name: '',
      birthday: new Date().toISOString(),
      gender: Genders.Male,
    });

    expect(student.validation.hasError).toBe(true);
  });

  it('deve criar um aluno inválido quando ele for criado sem data de nascimento', () => {
    const student = new Student({
      name: 'Aluno',
      birthday: '',
      gender: Genders.Male,
    });

    expect(student.validation.hasError).toBe(true);
  });

  it('deve criar um aluno inválido quando ele for criado com data de nascimento inválida', () => {
    const student = new Student({
      name: 'Aluno',
      birthday: 'Data inválida',
      gender: Genders.Male,
    });

    expect(student.validation.hasError).toBe(true);
  });

  it('deve criar um aluno inválido quando a data de nascimento for futura', () => {
    const student = new Student({
      name: 'Aluno',
      birthday: new Date('3000-01-01').toISOString(),
      gender: Genders.Male,
    });

    expect(student.validation.hasError).toBe(true);
  });

  it('deve criar um aluno inválido quando a data de nascimento for anterior a 1900', () => {
    const student = new Student({
      name: 'Aluno',
      birthday: new Date('1899-12-31').toISOString(),
      gender: Genders.Male,
    });

    expect(student.validation.hasError).toBe(true);
  });

  it('deve criar um aluno inválido quando ele for de menor sem guardião', () => {
    const student = new Student({
      name: 'Aluno',
      birthday: subYears(new Date(), 9).toISOString(),
      gender: Genders.Male,
    });

    expect(student.validation.hasError).toBe(true);
  });
});
