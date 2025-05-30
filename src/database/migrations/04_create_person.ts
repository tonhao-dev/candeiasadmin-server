import { Knex } from 'knex';
import { Genders } from '../../enum/gender';
import { Race } from '../../enum/race';
import { Status } from '../../enum/status';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('person', table => {
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
    table.boolean('is_teacher').notNullable().defaultTo(false);
    table.uuid('belt_id').nullable().references('id').inTable('belt').onDelete('CASCADE');
    table.integer('year_start_capoeira').nullable();
    table.integer('effective_capoeira_training_time').nullable();
    table.integer('year_of_last_belt_promotion').nullable();
    table.string('trained_in_a_different_group').nullable();
    table.string('first_capoeira_teacher').nullable();
    table.uuid('center_id').nullable().references('id').inTable('center').onDelete('CASCADE');
    table
      .uuid('current_teacher_id')
      .references('id')
      .inTable('person')
      .nullable()
      .onDelete('CASCADE');
    table.uuid('guardian_id').nullable().references('id').inTable('guardian').onDelete('CASCADE');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('deleted_at').defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('person', table => {
    table.dropForeign(['current_teacher_id']);
    table.dropForeign(['belt_id']);
    table.dropForeign(['center_id']);
    table.dropForeign(['guardian_id']);
  });

  return knex.schema.dropTableIfExists('person');
}
