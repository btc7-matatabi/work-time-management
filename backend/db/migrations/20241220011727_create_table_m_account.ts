import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('m_accounts', function (table) {
    table.increments('id').primary();
    table.string('employee_code', 7).unique().notNullable();
    table.string('password', 100).notNullable();

    table.foreign('employee_code').references('m_employees.employee_code').onDelete('CASCADE');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('m_accounts');
}

