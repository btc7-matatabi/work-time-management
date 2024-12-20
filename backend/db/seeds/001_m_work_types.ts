import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("m_work_types").del();

    // Inserts seed entries
    await knex("m_work_types").insert([
        { id: 11, work_type: '2交替白直' },
        { id: 12, work_type: '2交替黄直' },
        { id: 21, work_type: '3交替白直' },
        { id: 22, work_type: '3交替黄直' },
        { id: 23, work_type: '3交替黒直' }
    ]);
};
