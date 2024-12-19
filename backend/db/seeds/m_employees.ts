import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("m_employees").del();

    // Inserts seed entries
    await knex("m_employees").insert([
        { employee_code: '0000001', name: '佐藤', group_code: 'LT441', work_positions_id: 1 },
        { employee_code: '0000002', name: '鈴木', group_code: 'LT441', work_positions_id: 2 },
        { employee_code: '0000003', name: '高橋', group_code: 'LT441', work_positions_id: 2 },
        { employee_code: '0000004', name: '田中', group_code: 'LT441', work_positions_id: 4 },
        { employee_code: '0000005', name: '伊藤', group_code: 'LT441', work_positions_id: 4 },
        { employee_code: '0000006', name: '渡辺', group_code: 'LT441', work_positions_id: 4 },
        { employee_code: '0000007', name: '山本', group_code: 'LT441', work_positions_id: 6 },
        { employee_code: '0000008', name: '中村', group_code: 'LT441', work_positions_id: 6 },
        { employee_code: '0000009', name: '小林', group_code: 'LT441', work_positions_id: 6 },
        { employee_code: '0000010', name: '加藤', group_code: 'LT441', work_positions_id: 6 },
        { employee_code: '0000011', name: '吉田', group_code: 'LT441', work_positions_id: 6 },
        { employee_code: '0000012', name: '山田', group_code: 'LT441', work_positions_id: 6 },
        { employee_code: '0000013', name: '佐々木', group_code: 'LT442', work_positions_id: 1 },
        { employee_code: '0000014', name: '山口', group_code: 'LT442', work_positions_id: 2 },
        { employee_code: '0000015', name: '松本', group_code: 'LT442', work_positions_id: 2 },
        { employee_code: '0000016', name: '井上', group_code: 'LT442', work_positions_id: 3 },
        { employee_code: '0000017', name: '木村', group_code: 'LT442', work_positions_id: 4 },
        { employee_code: '0000018', name: '林', group_code: 'LT442', work_positions_id: 4 },
        { employee_code: '0000019', name: '斎藤', group_code: 'LT442', work_positions_id: 4 },
        { employee_code: '0000020', name: '清水', group_code: 'LT442', work_positions_id: 5 },
        { employee_code: '0000021', name: '山崎', group_code: 'LT442', work_positions_id: 5 },
        { employee_code: '0000022', name: '森', group_code: 'PW441', work_positions_id: 1 },
        { employee_code: '0000023', name: '池田', group_code: 'PW441', work_positions_id: 2 },
        { employee_code: '0000024', name: '橋本', group_code: 'PW441', work_positions_id: 3 },
        { employee_code: '0000025', name: '阿部', group_code: 'PW441', work_positions_id: 4 },
        { employee_code: '0000026', name: '石川', group_code: 'PW441', work_positions_id: 4 },
        { employee_code: '0000027', name: '山下', group_code: 'PW441', work_positions_id: 6 },
        { employee_code: '0000028', name: '中島', group_code: 'PW441', work_positions_id: 6 },
        { employee_code: '0000029', name: '石井', group_code: 'PW441', work_positions_id: 6 },
        { employee_code: '0000030', name: '小川', group_code: 'PW441', work_positions_id: 6 },
        { employee_code: '0000031', name: '前田', group_code: 'PW442', work_positions_id: 1 },
        { employee_code: '0000032', name: '岡田', group_code: 'PW442', work_positions_id: 2 },
        { employee_code: '0000033', name: '長谷川', group_code: 'PW442', work_positions_id: 4 },
        { employee_code: '0000034', name: '藤田', group_code: 'PW442', work_positions_id: 4 },
        { employee_code: '0000035', name: '後藤', group_code: 'PW442', work_positions_id: 4 },
        { employee_code: '0000036', name: '近藤', group_code: 'PW442', work_positions_id: 6 },
        { employee_code: '0000037', name: '村上', group_code: 'PW442', work_positions_id: 6 },
        { employee_code: '0000038', name: '遠藤', group_code: 'PW442', work_positions_id: 6 },
        { employee_code: '0000039', name: '青木', group_code: 'PW442', work_positions_id: 6 },
        { employee_code: '0000040', name: '坂本', group_code: 'PW442', work_positions_id: 6 },
        { employee_code: '0000041', name: '斉藤', group_code: 'PW443', work_positions_id: 1 },
        { employee_code: '0000042', name: '福田', group_code: 'PW443', work_positions_id: 2 },
        { employee_code: '0000043', name: '太田', group_code: 'PW443', work_positions_id: 3 },
        { employee_code: '0000044', name: '西村', group_code: 'PW443', work_positions_id: 4 },
        { employee_code: '0000045', name: '藤井', group_code: 'PW443', work_positions_id: 4 },
        { employee_code: '0000046', name: '金子', group_code: 'PW443', work_positions_id: 6 },
        { employee_code: '0000047', name: '岡本', group_code: 'PW443', work_positions_id: 6 },
        { employee_code: '0000048', name: '藤原', group_code: 'PW443', work_positions_id: 6 }
    ]);
};
