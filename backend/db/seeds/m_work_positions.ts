import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("m_work_positions").del();

    // Inserts seed entries
    await knex("m_work_positions").insert([
        { name: '組長' },
        { name: 'TL' },
        { name: 'SX' },
        { name: 'EX' },
        { name: 'SP' },
        { name: '一般' }
    ]);
};
