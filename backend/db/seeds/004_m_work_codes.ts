import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("m_work_codes").del();

    // Inserts seed entries
    await knex("m_work_codes").insert([
        { work_code: '0001', start_time: '6:30', end_time: '15:20'},
        { work_code: '0002', start_time: '16:35', end_time: '1:25'},
        { work_code: 'B1VA', start_time: '8:00', end_time: '16:50'},
        { work_code: 'B1UA', start_time: '8:30', end_time: '17:20'},
        { work_code: 'B1TA', start_time: '9:00', end_time: '17:50'},
        { work_code: '0003', start_time: '6:30', end_time: '15:20'},
        { work_code: '0004', start_time: '13:45', end_time: '22:35'},
        { work_code: '0005', start_time: '22:00', end_time: '6:50'}
    ]);
}
