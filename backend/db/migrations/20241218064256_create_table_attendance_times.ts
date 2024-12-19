import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('attendance_times', function (table) {
    table.increments('id').primary();
    table.string('employee_code', 7).notNullable();
    table.date('start_date').notNullable();
    table.timestamp('start_ts');
    table.timestamp('end_ts');
    table.boolean('before_overtime_flag').defaultTo(false);
    table.boolean('after_overtime_flag').defaultTo(false);
    table.integer('overtime_minute');

    table.foreign('employee_code').references('m_employees.employee_code').onDelete('CASCADE');


  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('attendance_times');
}

