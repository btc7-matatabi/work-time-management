import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("work_contents").del();

    // Inserts seed entries
    await knex("work_contents").insert([
        { group_code: 'LT441', work_content: 'TODO_1 hogehoge', order_number: '0000-0000-0000-0000', total_work_minute: 360 },
        { group_code: 'LT442', work_content: 'TODO_1 hoge 442', order_number: '0000-0000-0000-0001', total_work_minute: 360 },
        { group_code: 'LT442', work_content: 'TODO_2 fuga 442', order_number: '0000-0000-0000-0002', total_work_minute: 250 },
        { group_code: 'LT442', work_content: 'TODO_3 aaaa 442', order_number: '0000-0000-0000-0003', total_work_minute: 300 },
        { group_code: 'LT442', work_content: 'TODO_4 bbbb 442', order_number: '0000-0000-0000-0004', total_work_minute: 350 },
        { group_code: 'LT442', work_content: 'TODO_5 おおお442', order_number: '0000-0000-0000-0005', total_work_minute: 400 },
    ]);
}
