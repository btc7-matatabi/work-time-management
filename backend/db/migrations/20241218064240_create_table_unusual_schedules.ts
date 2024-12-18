import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('unusual_schedules', function (table) {

  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('unusual_schedules');
}

