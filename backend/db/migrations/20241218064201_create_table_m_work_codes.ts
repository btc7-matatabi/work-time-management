import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('m_work_codes', function (table) {
    table.string('work_code',4).primary()
    table.time('start_time').notNullable()
    table.time('end_time').notNullable()
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('m_work_codes');
}

