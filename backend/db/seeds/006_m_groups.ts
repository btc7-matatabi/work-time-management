import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("m_groups").del();

    // Inserts seed entries
    await knex("m_groups").insert([
        { group_code: 'LT441', group_name: 'LT441組', work_types_id: 11 },
        { group_code: 'LT442', group_name: 'LT442組', work_types_id: 12 },
        { group_code: 'PW441', group_name: 'PW441組', work_types_id: 21 },
        { group_code: 'PW442', group_name: 'PW442組', work_types_id: 22 },
        { group_code: 'PW443', group_name: 'PW443組', work_types_id: 23 }
    ]);
}
