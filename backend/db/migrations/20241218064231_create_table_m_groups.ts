import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('m_groups', function (table) {
    table.string('group_code',5).primary();
    table.string('group_name',100)
    table.integer('work_types_id').notNullable();

    table.foreign('work_types_id').references('m_work_types.id').onDelete('CASCADE');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('m_groups');
}

