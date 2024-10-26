import { Knex } from 'knex';

export async function seed(knex: Knex) {
  await knex('belt_type').del();
  await knex('belt_type').insert([
    {
      name: 'baby',
      code: 'BABY',
      rangeStartInYears: 2,
      rangeEndInYears: 6,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'infantil',
      code: 'INFANTIL',
      rangeStartInYears: 7,
      rangeEndInYears: 12,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'infantojuvenil',
      code: 'INFANTOJUVENIL',
      rangeStartInYears: 13,
      rangeEndInYears: 15,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'adulto',
      code: 'ADULTO',
      rangeStartInYears: 16,
      rangeEndInYears: 100,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
