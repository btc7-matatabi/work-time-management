import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('m_working_dates', function (table) {

  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('m_working_dates');
}

