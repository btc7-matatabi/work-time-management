import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('m_schedule_types', function (table) {
    table.increments('id').primary();
    table.string('name', 8).unique().notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('m_schedule_types');
}

