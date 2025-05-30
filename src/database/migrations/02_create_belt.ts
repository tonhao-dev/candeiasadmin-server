import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('belt', table => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('name').notNullable();
    table.string('title').notNullable();
    table.string('color_hex_code').notNullable(); // #000000 or #000000,#ffffff using comma to separate
    table
      .string('belt_type_code')
      .nullable()
      .references('code')
      .inTable('belt_type')
      .onDelete('CASCADE');
    table.decimal('order', 5, 2).notNullable().defaultTo(0.0);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('deleted_at').defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('belt');
}
