import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('group_events', function (table) {

  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('group_events');
}

