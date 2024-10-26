import { Knex } from 'knex';

export async function seed(knex: Knex) {
  await knex('belt_type').del();
  await knex('belt_type').insert([
    {
      name: 'baby',
      code: 'BABY',
      range_start_in_years: 2,
      range_end_in_years: 6,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'infantil',
      code: 'INFANTIL',
      range_start_in_years: 7,
      range_end_in_years: 12,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'infantojuvenil',
      code: 'INFANTOJUVENIL',
      range_start_in_years: 13,
      range_end_in_years: 15,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'adulto',
      code: 'ADULTO',
      range_start_in_years: 16,
      range_end_in_years: 100,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
