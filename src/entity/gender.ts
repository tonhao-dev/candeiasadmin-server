import { Genders } from '../enum/gender';

class Gender {
  public gender: Genders = Genders.Other;
  public name: string = 'Prefiro não informar';

  constructor(gender: Genders) {
    this.gender = gender;
    this.name = Gender.getGenderName(gender);
  }

  static getGenderName(gender: Genders | number | string): string {
    if (typeof gender === 'number' && [1, 2, 3].includes(gender) === false)
      return 'Prefiro não informar';

    if (typeof gender === 'string' && ['1', '2', '3'].includes(gender) === false)
      return 'Prefiro não informar';

    const dictionary: Record<Genders, string> = {
      [Genders.Male]: 'Masculino',
      [Genders.Female]: 'Feminino',
      [Genders.Other]: 'Prefiro não informar',
    };
    return dictionary[gender as Genders] || 'Prefiro não informar';
  }
}

export { Gender };
