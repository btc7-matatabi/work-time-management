import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("group_events").del();

    // Inserts seed entries
    await knex("group_events").insert([
        { group_code: 'LT441', ymd: '2024/12/11', event_name: '安全会議' },
        { group_code: 'LT441', ymd: '2024/12/12', event_name: '安全MTG' },
        { group_code: 'LT441', ymd: '2024/12/20', event_name: '原価会議' },
        { group_code: 'LT441', ymd: '2024/12/25', event_name: '安全会議' },
        { group_code: 'LT442', ymd: '2024/12/11', event_name: '安全会議' },
        { group_code: 'LT442', ymd: '2024/12/12', event_name: '安全MTG' },
        { group_code: 'LT442', ymd: '2024/12/20', event_name: '原価会議' },
        { group_code: 'LT442', ymd: '2024/12/25', event_name: '安全会議' }
    ]);
}
