import { Genders } from '../../enum/gender';
import { Knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('student', table => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('name').notNullable();
    table.string('phone').nullable();
    table.string('email').nullable();
    table.date('birthday');
    table
      .enum('gender', [Genders.Male, Genders.Female, Genders.Other])
      .notNullable()
      .defaultTo(Genders.Other);
    table.uuid('guardian_id').nullable().references('id').inTable('guardian').onDelete('CASCADE');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('deleted_at').defaultTo(null);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('student');
}
