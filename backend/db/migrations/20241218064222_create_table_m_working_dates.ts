import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('m_working_dates', function (table) {
    table.increments('id').primary();
    table.date('ymd').notNullable();
    table.integer('work_types_id').notNullable();
    table.string('work_code',4).notNullable();

    table.foreign('work_types_id').references('m_work_types.id').onDelete('CASCADE');
    table.foreign('work_code').references('m_work_codes.work_code').onDelete('CASCADE');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('m_working_dates');
}

