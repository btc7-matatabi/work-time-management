import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('work_contents', function (table) {
    table.increments('id').primary();
    table.string('group_code', 5).notNullable();
    table.string('work_content', 50).notNullable();
    table.date('deadline_ymd');
    table.string('order_group_code', 5);
    table.string('order_number', 30);
    table.integer('total_work_minute');

    table.foreign('group_code').references('m_groups.group_code').onDelete('CASCADE');
    table.foreign('order_group_code').references('m_groups.group_code').onDelete('CASCADE');

  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('work_contents');
}

