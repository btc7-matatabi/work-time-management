import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("attendance_times").del();

    // Inserts seed entries
    await knex("attendance_times").insert([
        { employee_code: '0000013', start_date: '2024/12/2', start_ts: '2024/12/2 06:30:00', end_ts: '2024/12/2 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000014', start_date: '2024/12/2', start_ts: '2024/12/2 06:30:00', end_ts: '2024/12/2 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000015', start_date: '2024/12/2', start_ts: '2024/12/2 06:30:00', end_ts: '2024/12/2 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000016', start_date: '2024/12/2', start_ts: '2024/12/2 06:30:00', end_ts: '2024/12/2 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000017', start_date: '2024/12/2', start_ts: '2024/12/2 06:30:00', end_ts: '2024/12/2 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000018', start_date: '2024/12/2', start_ts: '2024/12/2 06:30:00', end_ts: '2024/12/2 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000019', start_date: '2024/12/2', start_ts: '2024/12/2 06:30:00', end_ts: '2024/12/2 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000020', start_date: '2024/12/2', start_ts: '2024/12/2 06:30:00', end_ts: '2024/12/2 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000021', start_date: '2024/12/2', start_ts: '2024/12/2 06:30:00', end_ts: '2024/12/2 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},

        { employee_code: '0000013', start_date: '2024/12/3', start_ts: '2024/12/3 06:30:00', end_ts: '2024/12/3 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000014', start_date: '2024/12/3', start_ts: '2024/12/3 06:30:00', end_ts: '2024/12/3 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000015', start_date: '2024/12/3', start_ts: '2024/12/3 06:30:00', end_ts: '2024/12/3 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000016', start_date: '2024/12/3', start_ts: '2024/12/3 06:30:00', end_ts: '2024/12/3 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000017', start_date: '2024/12/3', start_ts: '2024/12/3 06:30:00', end_ts: '2024/12/3 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000018', start_date: '2024/12/3', start_ts: '2024/12/3 06:30:00', end_ts: '2024/12/3 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000019', start_date: '2024/12/3', start_ts: '2024/12/3 06:30:00', end_ts: '2024/12/3 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000020', start_date: '2024/12/3', start_ts: '2024/12/3 06:30:00', end_ts: '2024/12/3 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000021', start_date: '2024/12/3', start_ts: '2024/12/3 06:30:00', end_ts: '2024/12/3 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},

        { employee_code: '0000013', start_date: '2024/12/4', start_ts: '2024/12/4 06:30:00', end_ts: '2024/12/4 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000014', start_date: '2024/12/4', start_ts: '2024/12/4 06:30:00', end_ts: '2024/12/4 16:20:00', before_overtime_flag: false, after_overtime_flag: true, overtime_minute: 60},
        { employee_code: '0000015', start_date: '2024/12/4', start_ts: '2024/12/4 06:30:00', end_ts: '2024/12/4 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000016', start_date: '2024/12/4', start_ts: '2024/12/4 06:30:00', end_ts: '2024/12/4 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000017', start_date: '2024/12/4', start_ts: '2024/12/4 06:30:00', end_ts: '2024/12/4 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000018', start_date: '2024/12/4', start_ts: '2024/12/4 06:30:00', end_ts: '2024/12/4 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000019', start_date: '2024/12/4', start_ts: '2024/12/4 06:30:00', end_ts: '2024/12/4 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000020', start_date: '2024/12/4', start_ts: '2024/12/4 06:30:00', end_ts: '2024/12/4 16:20:00', before_overtime_flag: false, after_overtime_flag: true, overtime_minute: 60},
        { employee_code: '0000021', start_date: '2024/12/4', start_ts: '2024/12/4 06:30:00', end_ts: '2024/12/4 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},

        { employee_code: '0000013', start_date: '2024/12/5', start_ts: '2024/12/5 06:30:00', end_ts: '2024/12/5 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000014', start_date: '2024/12/5', start_ts: '2024/12/5 06:30:00', end_ts: '2024/12/5 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000016', start_date: '2024/12/5', start_ts: '2024/12/5 06:30:00', end_ts: '2024/12/5 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000017', start_date: '2024/12/5', start_ts: '2024/12/5 06:30:00', end_ts: '2024/12/5 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000018', start_date: '2024/12/5', start_ts: '2024/12/5 06:30:00', end_ts: '2024/12/5 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000020', start_date: '2024/12/5', start_ts: '2024/12/5 06:30:00', end_ts: '2024/12/5 16:20:00', before_overtime_flag: false, after_overtime_flag: true, overtime_minute: 60},
        { employee_code: '0000021', start_date: '2024/12/5', start_ts: '2024/12/5 06:30:00', end_ts: '2024/12/5 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},

        { employee_code: '0000013', start_date: '2024/12/6', start_ts: '2024/12/6 06:30:00', end_ts: '2024/12/6 16:20:00', before_overtime_flag: false, after_overtime_flag: true, overtime_minute: 60},
        { employee_code: '0000014', start_date: '2024/12/6', start_ts: '2024/12/6 06:30:00', end_ts: '2024/12/6 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000015', start_date: '2024/12/6', start_ts: '2024/12/6 06:30:00', end_ts: '2024/12/6 15:50:00', before_overtime_flag: false, after_overtime_flag: true, overtime_minute: 30},
        { employee_code: '0000016', start_date: '2024/12/6', start_ts: '2024/12/6 06:30:00', end_ts: '2024/12/6 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000017', start_date: '2024/12/6', start_ts: '2024/12/6 06:30:00', end_ts: '2024/12/6 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '0000018', start_date: '2024/12/6', start_ts: '2024/12/6 06:30:00', end_ts: '2024/12/6 15:35:00', before_overtime_flag: false, after_overtime_flag: true, overtime_minute: 15},
        { employee_code: '0000019', start_date: '2024/12/6', start_ts: '2024/12/6 06:30:00', end_ts: '2024/12/6 15:50:00', before_overtime_flag: false, after_overtime_flag: true, overtime_minute: 30},
        { employee_code: '0000020', start_date: '2024/12/6', start_ts: '2024/12/6 06:30:00', end_ts: '2024/12/6 16:20:00', before_overtime_flag: false, after_overtime_flag: true, overtime_minute: 60},
        { employee_code: '0000021', start_date: '2024/12/6', start_ts: '2024/12/6 06:30:00', end_ts: '2024/12/6 15:20:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
    ]);
};
