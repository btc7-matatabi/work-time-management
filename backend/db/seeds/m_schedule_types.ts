import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("m_schedule_types").del();

    // Inserts seed entries
    await knex("m_schedule_types").insert([
        { name: '特休' },
        { name: '年休' },
        { name: '午前年休' },
        { name: '午後年休' },
        { name: '教育' },
        { name: '健診' },
        { name: '研修' },
        { name: '出張' }
    ]);
};
