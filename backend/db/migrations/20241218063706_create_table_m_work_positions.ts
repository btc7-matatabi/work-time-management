import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('m_work_positions', function (table) {
    table.increments('id').primary();
    table.string('name',10).unique().notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('m_work_positions');
}

