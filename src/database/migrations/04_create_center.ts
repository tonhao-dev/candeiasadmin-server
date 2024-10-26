import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('center', table => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('name').notNullable();
    table.string('address').notNullable();
    table.decimal('longitude', 10, 7).nullable();
    table.decimal('latitude', 10, 7).nullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('deleted_at').defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('center');
}
