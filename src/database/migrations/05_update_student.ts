import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('student', table => {
    table.uuid('belt_id').nullable().references('id').inTable('belt').onDelete('CASCADE');
    table.integer('year_start_capoeira').nullable();
    table.integer('effective_capoeira_training_time').nullable();
    table.integer('year_of_last_belt_promotion').nullable();
    table.string('trained_in_a_different_group').nullable();
    table.string('first_capoeira_teacher').nullable();
    table.uuid('center_id').nullable().references('id').inTable('center').onDelete('CASCADE');
    table.uuid('current_teacher').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('student', table => {
    table.dropColumn('belt_id');
    table.dropColumn('year_start_capoeira');
    table.dropColumn('effective_capoeira_training_time');
    table.dropColumn('year_of_last_belt_promotion');
    table.dropColumn('trained_in_a_different_group');
    table.dropColumn('first_capoeira_teacher');
    table.dropColumn('center_id');
    table.dropColumn('current_teacher');
  });
}
