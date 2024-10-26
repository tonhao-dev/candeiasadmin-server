import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('belt_type', table => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('code').index().unique().notNullable();
    table.string('name').notNullable();
    table.integer('rangeStartInYears').notNullable();
    table.integer('rangeEndInYears').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('deleted_at').defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('belt_type');
}
