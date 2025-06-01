import { Knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('guardian', table => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('name').notNullable();
    table.string('phone').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('deleted_at').defaultTo(null);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('guardian');
}
