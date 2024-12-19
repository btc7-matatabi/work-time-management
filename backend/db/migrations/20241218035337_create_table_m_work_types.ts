import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('m_work_types', function (table) {
    table.integer('id').primary();
    table.string('work_type', 10).unique().notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('m_work_types');
}

