import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('group_events', function (table) {
    table.increments('id').primary();
    table.string('group_code', 5).notNullable();
    table.date('ymd').notNullable();
    table.string('event_name', 100).notNullable();

    table.foreign('group_code').references('m_groups.group_code').onDelete('CASCADE');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('group_events');
}

