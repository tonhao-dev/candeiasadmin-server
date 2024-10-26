import { Genders } from '../../enum/gender';
import { Knex } from 'knex';
import { Race } from '../../enum/race';
import { Status } from '../../enum/status';

export async function up(knex: Knex) {
  return knex.schema.createTable('student', table => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('name').notNullable();
    table.string('nickname').nullable();
    table.date('birthday').notNullable();
    table
      .enum('gender', [Genders.Male, Genders.Female, Genders.Other])
      .notNullable()
      .defaultTo(Genders.Other);
    table.boolean('is_pwd').notNullable().defaultTo(false);
    table
      .enum('race', [
        Race.White,
        Race.Black,
        Race.Brown,
        Race.Indigenous,
        Race.Yellow,
        Race.NotDeclared,
      ])
      .notNullable()
      .defaultTo(Race.NotDeclared);
    table.enum('status', [Status.Active, Status.Inactive]).notNullable().defaultTo(Status.Active);
    table.string('email').nullable();
    table.string('address').nullable();
    table.string('phone').nullable();
    table.string('facebook').nullable();
    table.string('instagram').nullable();
    table.string('tiktok').nullable();
    table.string('job').nullable();
    table.string('education_level').nullable();
    table.string('course').nullable();

    table.uuid('guardian_id').nullable().references('id').inTable('guardian').onDelete('CASCADE');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('deleted_at').defaultTo(null);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('student');
}
