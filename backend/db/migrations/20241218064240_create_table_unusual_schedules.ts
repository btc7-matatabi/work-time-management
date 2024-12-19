import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('unusual_schedules', function (table) {
    table.increments('id').primary();
    table.string('employee_code', 7).notNullable();
    table.date('ymd').notNullable();
    table.integer('schedule_types_id').notNullable();
    table.string('work_code', 4);

    table.foreign('employee_code').references('m_employees.employee_code').onDelete('CASCADE');
    table.foreign('schedule_types_id').references('m_schedule_types.id').onDelete('CASCADE');
    table.foreign('work_code').references('m_work_codes.work_code').onDelete('CASCADE');


  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('unusual_schedules');
}

