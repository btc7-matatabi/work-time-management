import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("unusual_schedules").del();

    // Inserts seed entries
    await knex("unusual_schedules").insert([
        { employee_code: '0000003', ymd: '2024/12/5', schedule_types_id: 2 },
        { employee_code: '0000007', ymd: '2024/12/5', schedule_types_id: 2 },
        { employee_code: '0000010', ymd: '2024/12/6', schedule_types_id: 2 },
        { employee_code: '0000004', ymd: '2024/12/11', schedule_types_id: 2 },
        { employee_code: '0000007', ymd: '2024/12/11', schedule_types_id: 2 },
        { employee_code: '0000011', ymd: '2024/12/18', schedule_types_id: 2 },
        { employee_code: '0000010', ymd: '2024/12/20', schedule_types_id: 2 },
        { employee_code: '0000012', ymd: '2024/12/18', schedule_types_id: 5, work_code: 'B1VA', schedule_description: 'DIG入門' },
        { employee_code: '0000012', ymd: '2024/12/19', schedule_types_id: 5, work_code: 'B1VA', schedule_description: 'DIG入門' },
        { employee_code: '0000012', ymd: '2024/12/20', schedule_types_id: 5, work_code: 'B1VA', schedule_description: 'DIG入門' },
        { employee_code: '0000001', ymd: '2024/12/25', schedule_types_id: 2 },
        { employee_code: '0000008', ymd: '2024/12/27', schedule_types_id: 2 }
    ]);
};
