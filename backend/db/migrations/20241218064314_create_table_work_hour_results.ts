import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('work_hour_results', function (table) {
    table.increments('id').primary();
    table.integer('work_contents_id').notNullable();
    table.date('ymd').notNullable();
    table.integer('work_minute').notNullable();

    table.foreign('work_contents_id').references('work_contents.id').onDelete('CASCADE');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('work_hour_results');
}

