import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("work_hour_results").del();

    // Inserts seed entries
    await knex("work_hour_results").insert([
        { work_contents_id: 1, ymd: '2024/12/2', work_minute: 60 },
        { work_contents_id: 1, ymd: '2024/12/3', work_minute: 60 },
        { work_contents_id: 1, ymd: '2024/12/4', work_minute: 90 },
        { work_contents_id: 1, ymd: '2024/12/5', work_minute: 30 },
        { work_contents_id: 1, ymd: '2024/12/6', work_minute: 60 },
        { work_contents_id: 1, ymd: '2024/12/9', work_minute: 30 },
        { work_contents_id: 2, ymd: '2024/12/2', work_minute: 60 },
        { work_contents_id: 2, ymd: '2024/12/3', work_minute: 60 },
        { work_contents_id: 2, ymd: '2024/12/4', work_minute: 90 },
        { work_contents_id: 2, ymd: '2024/12/5', work_minute: 30 },
        { work_contents_id: 2, ymd: '2024/12/6', work_minute: 60 },
        { work_contents_id: 2, ymd: '2024/12/9', work_minute: 30 },
        { work_contents_id: 5, ymd: '2024/12/2', work_minute: 60 },
        { work_contents_id: 5, ymd: '2024/12/3', work_minute: 60 },
        { work_contents_id: 5, ymd: '2024/12/4', work_minute: 90 },
        { work_contents_id: 5, ymd: '2024/12/5', work_minute: 30 },
        { work_contents_id: 5, ymd: '2024/12/6', work_minute: 60 },
        { work_contents_id: 5, ymd: '2024/12/9', work_minute: 30 },
        { work_contents_id: 6, ymd: '2024/12/9', work_minute: 60 },
        { work_contents_id: 6, ymd: '2024/12/10', work_minute: 120 },
        { work_contents_id: 6, ymd: '2024/12/11', work_minute: 90 },
        { work_contents_id: 6, ymd: '2024/12/12', work_minute: 100 },

    ]);
}
