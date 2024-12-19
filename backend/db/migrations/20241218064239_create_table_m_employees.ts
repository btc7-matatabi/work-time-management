import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('m_employees', function (table) {
    table.string('employee_code',7).primary()
    table.string('name',50).notNullable();
    table.string('group_code',5).notNullable();
    table.integer('work_positions_id').notNullable();

    table.foreign('group_code').references('m_groups.group_code').onDelete('CASCADE');
    table.foreign('work_positions_id').references('m_work_positions.id').onDelete('CASCADE')

  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('m_employees');
}

