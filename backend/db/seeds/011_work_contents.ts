import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("work_contents").del();

    // Inserts seed entries
    await knex("work_contents").insert([
        { group_code: 'LT441', work_content: 'TODO_1 hogehoge', order_number: '0000-0000-0000-0000', total_work_minute: 360 }
    ]);
};
