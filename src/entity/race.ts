import { Race } from '../enum/race';

class RaceEntity {
  public race: Race = Race.NotDeclared;
  public name: string = 'Não declarado';

  constructor(race: Race) {
    this.race = race;
    this.name = RaceEntity.getRaceName(race);
  }

  static getRaceName(race: Race | number | string): string {
    const races = [
      Race.White,
      Race.Black,
      Race.Brown,
      Race.Yellow,
      Race.Indigenous,
      Race.NotDeclared,
    ];

    if (typeof race === 'number' && races.includes(race) === false) return 'Não declarado';

    if (typeof race === 'string' && races.map(String).includes(race) === false)
      return 'Não declarado';

    const dictionary: Record<Race, string> = {
      [Race.White]: 'Brancos',
      [Race.Black]: 'Negros',
      [Race.Brown]: 'Pardos',
      [Race.Yellow]: 'Asiáticos',
      [Race.Indigenous]: 'Indígenas',
      [Race.NotDeclared]: 'Não declarado',
    };

    let key = race;

    if (typeof key === 'string') key = Number.parseInt(key);

    return dictionary[key as Race] || 'Não declarado';
  }
}

export { RaceEntity };
