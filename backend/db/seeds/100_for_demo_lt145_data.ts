import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    //003_m_schedule_types.ts
    await knex("m_work_types").insert([{ id: 13, work_type: "2交替白直 v2" }]);

    //004_m_work_codes.ts
    await knex("m_work_codes").insert([
        { work_code: "0011", start_time: "6:30", end_time: "15:05" },
        { work_code: "0012", start_time: "16:35", end_time: "1:10" },
    ]);
    //005_m_working_dates.ts
    await knex("m_working_dates").insert([
        { ymd: "2024/12/2", work_types_id: "13", work_code: "0012" },
        { ymd: "2024/12/3", work_types_id: "13", work_code: "0012" },
        { ymd: "2024/12/4", work_types_id: "13", work_code: "0012" },
        { ymd: "2024/12/5", work_types_id: "13", work_code: "0012" },
        { ymd: "2024/12/6", work_types_id: "13", work_code: "0012" },

        { ymd: "2024/12/9", work_types_id: "13", work_code: "0011" },
        { ymd: "2024/12/10", work_types_id: "13", work_code: "0011" },
        { ymd: "2024/12/11", work_types_id: "13", work_code: "0011" },
        { ymd: "2024/12/12", work_types_id: "13", work_code: "0011" },
        { ymd: "2024/12/13", work_types_id: "13", work_code: "0011" },

        { ymd: "2024/12/16", work_types_id: "13", work_code: "0012" },
        { ymd: "2024/12/17", work_types_id: "13", work_code: "0012" },
        { ymd: "2024/12/18", work_types_id: "13", work_code: "0012" },
        { ymd: "2024/12/19", work_types_id: "13", work_code: "0012" },
        { ymd: "2024/12/20", work_types_id: "13", work_code: "0012" },

        { ymd: "2024/12/23", work_types_id: "13", work_code: "0011" },
        { ymd: "2024/12/24", work_types_id: "13", work_code: "0011" },
        { ymd: "2024/12/25", work_types_id: "13", work_code: "0011" },
        { ymd: "2024/12/26", work_types_id: "13", work_code: "0011" },

        { ymd: "2025/1/6", work_types_id: "13", work_code: "0012" },
        { ymd: "2025/1/7", work_types_id: "13", work_code: "0012" },
        { ymd: "2025/1/8", work_types_id: "13", work_code: "0012" },
        { ymd: "2025/1/9", work_types_id: "13", work_code: "0012" },
        { ymd: "2025/1/10", work_types_id: "13", work_code: "0012" },

        { ymd: "2025/1/13", work_types_id: "13", work_code: "0011" },
        { ymd: "2025/1/14", work_types_id: "13", work_code: "0011" },
        { ymd: "2025/1/15", work_types_id: "13", work_code: "0011" },
        { ymd: "2025/1/16", work_types_id: "13", work_code: "0011" },
        { ymd: "2025/1/17", work_types_id: "13", work_code: "0011" },

        { ymd: "2025/1/20", work_types_id: "13", work_code: "0012" },
        { ymd: "2025/1/21", work_types_id: "13", work_code: "0012" },
        { ymd: "2025/1/22", work_types_id: "13", work_code: "0012" },
        { ymd: "2025/1/23", work_types_id: "13", work_code: "0012" },
        { ymd: "2025/1/24", work_types_id: "13", work_code: "0012" },

        { ymd: "2025/1/27", work_types_id: "13", work_code: "0011" },
        { ymd: "2025/1/28", work_types_id: "13", work_code: "0011" },
        { ymd: "2025/1/29", work_types_id: "13", work_code: "0011" },
        { ymd: "2025/1/30", work_types_id: "13", work_code: "0011" },
        { ymd: "2025/1/31", work_types_id: "13", work_code: "0011" },
    ]);

    //006_m_groups.ts
    await knex("m_groups").insert([
        { group_code: "LT145", group_name: "LT145組", work_types_id: 13 },
    ]);

    //007_m_employees.ts
    await knex("m_employees").insert([
        {
            employee_code: "1234567",
            name: "栗本　一郎",
            group_code: "LT145",
            work_positions_id: 1,
            paid_holiday: 19,
        },
        {
            employee_code: "1234568",
            name: "上田　二郎",
            group_code: "LT145",
            work_positions_id: 2,
            paid_holiday: 16,
        },
        {
            employee_code: "1234569",
            name: "佐藤  陽翔",
            group_code: "LT145",
            work_positions_id: 3,
            paid_holiday: 22,
        },
        {
            employee_code: "1234570",
            name: "鈴木　湊",
            group_code: "LT145",
            work_positions_id: 3,
            paid_holiday: 12,
        },
        {
            employee_code: "1234571",
            name: "高橋　樹",
            group_code: "LT145",
            work_positions_id: 4,
            paid_holiday: 16,
        },
        {
            employee_code: "1234572",
            name: "田中　英明",
            group_code: "LT145",
            work_positions_id: 4,
            paid_holiday: 8,
        },
    ]);

    // 008_unusual_schedules
    await knex("unusual_schedules").insert([
        { employee_code: '1234572', ymd: '2025/1/6', schedule_types_id: 2 },
        { employee_code: '1234572', ymd: '2025/1/7', schedule_types_id: 2 },
        { employee_code: '1234570', ymd: '2025/1/8', schedule_types_id: 5, work_code: 'B1VA', schedule_description: 'DIG入門' },
    ]);

    //009_group_events.ts
    await knex("group_events").insert([
        { group_code: 'LT145', ymd: '2025/1/6', event_name: '年頭挨拶' },
        { group_code: 'LT145', ymd: '2025/1/7', event_name: '安全MTG' },
        { group_code: 'LT145', ymd: '2025/1/9', event_name: '原価会議' },
    ]);

    //011_work_contents.ts
    await knex("work_contents").insert([
        { group_code: 'LT145', work_content: 'からくり改善提案', order_number: '0000-0000-0000-0000', total_work_minute: 360 },
        { group_code: 'LT145', work_content: 'TPS ムダ低減', order_number: '0000-0000-0000-0001', total_work_minute: 100 },
        { group_code: 'LT145', work_content: '作業安全対策', order_number: '0000-0000-0000-0002', total_work_minute: 200 }
    ]);

    //012_work_hour_results.ts
    await knex("work_hour_results").insert([
        { work_contents_id: 2, ymd: '2025/1/6', work_minute: 30 },
        { work_contents_id: 2, ymd: '2025/1/8', work_minute: 30 },
        { work_contents_id: 3, ymd: '2025/1/7', work_minute: 10 },
    ]);
    // 新規013_m_account.ts.ts
    await knex("m_accounts").insert([
        {
            employee_code: "1234567",
            password: "$2b$10$xFF8ma3uPCR8Gjga5SJLd.qyyv9X0gj3qT2n4f0GQBxi6UIYKz6P6",
        },
        {
            employee_code: "1234568",
            password: "$$2b$10$vtnE4ksiSW.dp0rK81OUJ.6fCR8hEEILQyHwAmP2WtiGSl4Y8RdVC",
        },
    ]);
    //010_attendance_times.ts
    await knex("attendance_times").insert([
        { employee_code: '1234567', start_date: '2025/1/6', start_ts: '2025/1/6 16:05:00', end_ts: '2025/1/6 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '1234568', start_date: '2025/1/6', start_ts: '2025/1/6 16:05:00', end_ts: '2025/1/6 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '1234569', start_date: '2025/1/6', start_ts: '2025/1/6 16:05:00', end_ts: '2025/1/6 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '1234570', start_date: '2025/1/6', start_ts: '2025/1/6 16:05:00', end_ts: '2025/1/6 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '1234571', start_date: '2025/1/6', start_ts: '2025/1/6 16:05:00', end_ts: '2025/1/6 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},

        { employee_code: '1234567', start_date: '2025/1/7', start_ts: '2025/1/7 16:05:00', end_ts: '2025/1/7 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '1234568', start_date: '2025/1/7', start_ts: '2025/1/7 16:05:00', end_ts: '2025/1/7 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '1234569', start_date: '2025/1/7', start_ts: '2025/1/7 16:05:00', end_ts: '2025/1/7 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '1234570', start_date: '2025/1/7', start_ts: '2025/1/7 16:05:00', end_ts: '2025/1/7 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '1234571', start_date: '2025/1/7', start_ts: '2025/1/7 16:05:00', end_ts: '2025/1/7 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},

        { employee_code: '1234567', start_date: '2025/1/8', start_ts: '2025/1/7 16:05:00', end_ts: '2025/1/8 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '1234568', start_date: '2025/1/8', start_ts: '2025/1/7 16:05:00', end_ts: '2025/1/8 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '1234569', start_date: '2025/1/8', start_ts: '2025/1/7 16:05:00', end_ts: '2025/1/8 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '1234571', start_date: '2025/1/8', start_ts: '2025/1/7 16:05:00', end_ts: '2025/1/8 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '1234572', start_date: '2025/1/8', start_ts: '2025/1/7 16:05:00', end_ts: '2025/1/8 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},

        { employee_code: '1234567', start_date: '2025/1/9', start_ts: '2025/1/9 16:05:00', end_ts: '2025/1/10 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '1234568', start_date: '2025/1/9', start_ts: '2025/1/9 15:05:00', end_ts: '2025/1/10 00:40:00', before_overtime_flag: true, after_overtime_flag: false, overtime_minute: 60},
        { employee_code: '1234569', start_date: '2025/1/9', start_ts: '2025/1/9 16:05:00', end_ts: '2025/1/10 01:40:00',  before_overtime_flag: false, after_overtime_flag: true, overtime_minute: 60},

        { employee_code: '1234567', start_date: '2025/1/10', start_ts: '2025/1/10 16:05:00', end_ts: '2025/1/11 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '1234568', start_date: '2025/1/10', start_ts: '2025/1/10 16:05:00', end_ts: '2025/1/11 00:40:00', before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '1234569', start_date: '2025/1/10', start_ts: '2025/1/10 16:05:00', end_ts: '2025/1/11 00:40:00',  before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 0},
        { employee_code: '1234570', start_date: '2025/1/10', start_ts: '2025/1/10 15:05:00', end_ts: '2025/1/11 00:40:00',  before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 60},
        { employee_code: '1234571', start_date: '2025/1/10', start_ts: '2025/1/10 16:05:00', end_ts: '2025/1/11 01:40:00',  before_overtime_flag: false, after_overtime_flag: false, overtime_minute: 60},
    ]);
}
