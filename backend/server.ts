import express from "express";
import { Request, Response, NextFunction } from "express";
import db from "./knex";
import { differenceInMinutes, isAfter, isEqual, addDays } from "date-fns";
import {
    forceFirstDayOfMonth,
    getRegularTimes,
    setATFields,
    setTmpClockInDate,
    updateUnusualSchedules,
    upsertATData,
    upsertUnusualSchedules,
    wrapErrorHandler,
} from "./utils/funcs";

const app = express();
app.use(express.json());

app.get("/users/:id/:ymd", wrapErrorHandler(async (req: Request, res: Response) => {
    const { id, ymd } = req.params;
    console.log(`GET /users/${id}/${ymd}`);
    const [data] = await db('m_employees as t1')
        .join('m_groups as t3', 't1.group_code', 't3.group_code')
        .where('t1.employee_code', id) // 社員コードでフィルタリング
        .select(
            't1.name',          // 必要な列: 名前
            't1.group_code',    // 必要な列: グループコード
            't3.group_name',    // 必要な列: グループ名
        );
    if (data) {
        const regularTimes: StartEndDate = await getRegularTimes(ymd, id);
        const outputData = {
            ...data,
            start_time: regularTimes.startDate?.toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'}),
            end_time: regularTimes.endDate?.toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'})
        }
        res.status(200).send(outputData);
    } else {
        res.status(404).send({ message: 'No data found' });
    }
}));

app.get("/attendance-time-start/:id/:ymd", wrapErrorHandler(async (req: Request, res: Response) => {
    const {id, ymd} = req.params;
    console.log(`GET /attendance-time-start/${id}/${ymd}`);

    const data = await db('m_employees as t1')
        .join('attendance_times as t2', 't1.employee_code', 't2.employee_code')
        .where('t1.employee_code', id) // 社員コード (id) でフィルタ
        .andWhere('t2.start_date', ymd) // 開始日 (ymd) でフィルタ
        .select(
            't1.employee_code',     // 必要列: 社員コード
            db.raw("to_char(t2.start_date, 'YYYY-MM-DD') as start_date"), // 必要列: 開始日 start_dateをフォーマット
            db.raw("to_char(t2.start_ts AT TIME ZONE 'Asia/Tokyo', 'YYYY-MM-DD HH24:MI:SS') as start_ts"), // 必要列: 開始タイムスタンプ
            't2.overtime_minute'    // 必要列: 残業時間
        )
    if (data.length > 0) {
        res.status(200).send(data);
    } else {
        res.status(404).send({ message: 'No data found' });
    }
}));

app.post("/attendance-time", wrapErrorHandler(async (req: Request, res: Response) => {
    const { employee_code, start_date, start_ts, end_ts } = req.body;
    console.log(`POST /attendance-time`);
    const updateAT: SaveAT = {
        employee_code: employee_code,
        start_date: start_date,
        overtime_minute: 0
    };

    const [oldAT]: ClockInCheck[] | undefined = await db('attendance_times as t1')
        .select(
            't1.id',
            db.raw("to_char(start_date, 'YYYY-MM-DD') as start_date"),
            db.raw("to_char(start_ts AT TIME ZONE 'Asia/Tokyo', 'YYYY-MM-DD HH24:MI:SS') as start_ts"),
            db.raw("to_char(end_ts AT TIME ZONE 'Asia/Tokyo', 'YYYY-MM-DD HH24:MI:SS') as end_ts"),
        )
        .where('t1.employee_code', employee_code) // 社員コード (employee_code) でフィルタ
        .andWhere('t1.start_date', start_date); // 開始日 (start_date) でフィルタ

    console.log("oldAT: ", oldAT);

    const tmpClockInDate: StartEndDate = {};
    setTmpClockInDate(oldAT, start_ts, end_ts, tmpClockInDate);

    const regularTimes: StartEndDate = await getRegularTimes(start_date, employee_code);
    console.log('====================');

    if (!regularTimes) {
        res.status(400).send({ message: 'NG' });
    } else {
        setATFields(tmpClockInDate, regularTimes, updateAT);
        console.log("newAT: ", updateAT);
        const result = await upsertATData(oldAT, updateAT);
        res.status(200).send(result);
    }
}));

app.get("/members-overtime/:id/:ymd", wrapErrorHandler(async (req: Request, res: Response) => {
    const {id, ymd} = req.params;
    console.log(`GET /members-overtime/${id}/${ymd}`);

    const ym01 = forceFirstDayOfMonth(ymd);

    const baseEmployees: { name: string, employee_code: string, paid_holiday: number }[] = await db('m_employees as t1')
        .join('m_groups as t3', 't1.group_code', 't3.group_code')
        .whereIn('t1.group_code', db('m_employees')
            .where('employee_code', id)
            .select('group_code'))
        .select(
            't1.name',          // 必要な列: 名前
            't1.employee_code',
            't1.paid_holiday'
        )
        .orderBy('t1.work_positions_id');

    const rtn: Promise<MembersOvertime>[]  = baseEmployees.map(async (employee) => {
        const schedules: {ymd: string, name: string}[] =  await db('unusual_schedules as t1')
            .join('m_schedule_types as t2', 't1.schedule_types_id', 't2.id')
            .where('employee_code', employee.employee_code)
            .andWhere('t1.ymd', '>=', ym01)
            .andWhere('t1.ymd', '<', db.raw(`?::date + INTERVAL '1 month'`, [ym01]))
            .select(
                db.raw("to_char(t1.ymd AT TIME ZONE 'Asia/Tokyo', 'YYYY-MM-DD') as ymd"),
                't2.name'
            );

        const [paidHolidaysCount]: { count: number }[] =  await db('unusual_schedules as t1')
            .join('m_schedule_types as t2', 't1.schedule_types_id', 't2.id')
            .where('employee_code', employee.employee_code)
            .andWhere('t1.ymd', '>=', '2024-12-01')
            .andWhere('t1.ymd', '<', db.raw(`?::date + INTERVAL '1 month'`, [ym01]))
            .andWhere('t2.name', '年休')
            .count({ count: '*' });

        const rest_paid_holiday: number =
            employee.paid_holiday - paidHolidaysCount.count + (ym01.startsWith('2025') ? 20 : 0);

        const overtimes: Overtime[] = await db('attendance_times as t1')
            .where('t1.employee_code', employee.employee_code)
            .where('t1.start_date', '>=', ym01)
            .andWhere('t1.start_date', '<', db.raw(`?::date + INTERVAL '1 month'`, [ym01]))
            .select(
                db.raw("to_char(start_date, 'YYYY-MM-DD') as start_date"),
                db.raw("to_char(start_ts AT TIME ZONE 'Asia/Tokyo', 'YYYY-MM-DD HH24:MI:SS') as start_ts"),
                db.raw("to_char(end_ts AT TIME ZONE 'Asia/Tokyo', 'YYYY-MM-DD HH24:MI:SS') as end_ts"),
                't1.before_overtime_flag',
                't1.after_overtime_flag',
                't1.overtime_minute'
            );
        return {
            name: employee.name,
            employee_code: employee.employee_code,
            rest_paid_holiday,
            overtimes,
            schedules
        };
    });

    const result = await Promise.all(rtn);
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(404).send({ message: 'No data found' });
    }
}));

app.get("/groups/:groupCode", wrapErrorHandler(async (req: Request, res: Response) => {
    const { groupCode } = req.params;
    console.log(`GET /groups/${groupCode}`);

    const groupName: { group_name: string }[] = await db('m_groups as t1')
        .where('t1.group_code', groupCode)
        .select('t1.group_name');

    const work_codes: { work_code: string, start_time: string, end_time: string }[] = await db('m_groups as t1')
        .distinct('t2.work_code', 't3.start_time', 't3.end_time')
        .join('m_working_dates as t2', 't1.work_types_id', 't2.work_types_id')
        .join('m_work_codes as t3', 't2.work_code', 't3.work_code')
        .where('t1.group_code', groupCode);

    const result = {
        group_name: groupName[0]?.group_name,
        work_codes
    };

    if (result.group_name) {
        res.status(200).send(result);
    } else {
        res.status(404).send({ message: 'No data found' });
    }
}));

app.get("/working-dates/:ymd/:groupCode", wrapErrorHandler(async (req: Request, res: Response) => {
    const { ymd, groupCode } = req.params;
    console.log(`GET /working-dates/${ymd}/${groupCode}`);
    const ym01 = forceFirstDayOfMonth(ymd);

    const result: { ymd: string, work_code: string }[] = await db('m_working_dates as t1')
        .whereIn('t1.work_types_id', db('m_groups')
            .where('group_code', groupCode)
            .select('work_types_id'))
        .andWhere('t1.ymd', '>=', ym01)
        .andWhere('t1.ymd', '<', db.raw(`?::date + INTERVAL '1 month'`, [ym01]))
        .select(
            db.raw("to_char(t1.ymd, 'YYYY-MM-DD') as ymd"),
            't1.work_code'
        )
        .orderBy(1);

    if (result.length) {
        res.status(200).send(result);
    } else {
        res.status(404).send({ message: 'No data found' });
    }
}));

app.get("/group-events/:ymd/:groupCode",wrapErrorHandler(async (req: Request, res: Response) => {
    const { ymd, groupCode } = req.params;
    console.log(`GET /group-events/${ymd}/${groupCode}`);
    const ym01 = forceFirstDayOfMonth(ymd);

    const results: { ymd: string, event_name: string }[]  = await db('group_events as t1')
        .where('t1.group_code', groupCode)
        .andWhere('t1.ymd', '>=', ym01)
        .andWhere('t1.ymd', '<', db.raw(`?::date + INTERVAL '1 month'`, [ym01]))
        .select(
            db.raw("to_char(t1.ymd, 'YYYY-MM-DD') as ymd"),
            't1.event_name'
        )
        .orderBy(1);

    if (results.length) {
        res.status(200).send(results);
    } else {
        res.status(404).send({ message: 'No data found' });
    }
}));

app.get("/work-contents/:id/sum-work-hour-results",wrapErrorHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    console.log(`GET /work-contents/${id}/sum-work-hour-results`);

    const [result] = await db('work_hour_results')
        .sum('work_minute as sum_work_minute')
        .where('work_contents_id', id);
    if (result?.sum_work_minute !== null) {
        result["work_contents_id"] = id;
        res.status(200).send(result);
    } else {
        res.status(404).send({message : 'No data found'});
    }
}));

app.get("/work-contents/:ymd/:groupCode",wrapErrorHandler(async (req: Request, res: Response) => {
    const { ymd, groupCode } = req.params;
    console.log(`GET /work-contents/${ymd}/${groupCode}`);
    const ym01 = forceFirstDayOfMonth(ymd);

    const baseWorkContents: WorkContent[] = await db('work_contents as t1').where('t1.group_code', groupCode);

    const rtn: Promise<WorkContentReturn>[] = baseWorkContents.map(async (wc: WorkContent) => {
        const work_hour_results: { ymd: string, work_minute: number}[] = await db('work_hour_results as t1')
            .where('t1.work_contents_id', wc.id)
            .andWhere('ymd', '>=', ym01)
            .andWhere('ymd', '<', db.raw(`?::date + INTERVAL '1 month'`, [ym01]))
            .select(
                db.raw("to_char(t1.ymd, 'YYYY-MM-DD') as ymd"),
                't1.work_minute'
            )
            .orderBy(1);
        return {
            id: wc.id,
            work_content: wc.work_content,
            order_number: wc.order_number,
            total_work_minute: wc.total_work_minute,
            work_hour_results: work_hour_results
        };
    });

    const results: WorkContentReturn[] = await Promise.all(rtn);

    if (results.length) {
        res.status(200).send(results);
    } else {
        res.status(404).send({ message: 'No data found' });
    }
}));

app.get("/schedule-types",wrapErrorHandler(async (req: Request, res: Response) => {
    console.log(`GET /schedule-types`);
    const results = await db('m_schedule_types').orderBy('id');
    if (results.length) {
        res.status(200).send(results);
    } else {
        res.status(404).send({ message: 'No data found' });
    }
}));

app.get("/work-codes",wrapErrorHandler(async (req: Request, res: Response) => {
    console.log(`GET /work-codes`);
    const results: { work_code: string, start_time: string, end_time: string }[] = await db('m_work_codes')
        .whereNot('work_code', 'like', '0%')
        .orderBy('work_code');
    if (results.length) {
        res.status(200).send(results);
    } else {
        res.status(404).send({ message: 'No data found' });
    }
}));

app.post('/unusual-schedules', wrapErrorHandler(async (req: Request, res: Response) => {
    const { employee_code, ymd, schedule_types_id, work_code, schedule_description } = req.body;
    console.log(`POST /unusual-schedules`);
    const usObj: UnusualSchedule = { employee_code, ymd, schedule_types_id, work_code, schedule_description };
    const result: {id: number} = await upsertUnusualSchedules(usObj);
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(400).send({ message: 'NG' });
    }
}));

app.put("/unusual-schedules/:id",wrapErrorHandler(async (req: Request, res: Response) => {
    const { employee_code, ymd, schedule_types_id, work_code, schedule_description } = req.body;
    const id = Number(req.params.id);
    console.log(`PUT /unusual-schedules/${id}`);
    const usObj: UnusualSchedule = { employee_code, ymd, schedule_types_id, work_code, schedule_description };
    const result: {id: number} = await updateUnusualSchedules(id, usObj);
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(400).send({ message: 'NG' });
    }
}));

app.delete("/unusual-schedules/:id",wrapErrorHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    console.log(`DELETE /unusual-schedules/${id}`);

    const [result]: { id: number }[] = await db('unusual_schedules as t1').where('t1.id', id).returning('id').del();
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(400).send({ message: 'NG' });
    }
}));



// app.post('',wrapErrorHandler(async (req: Request, res: Response) => {
//     const { employee_code, ymd, schedule_types_id, work_code, schedule_description } = req.body;
//     console.log(`POST / `);
//
//     const results = await db('');
//     if (results) {
//         res.status(200).send(results);
//     } else {
//         res.status(404).send({message : 'No data found'});
//     }
// }));

// app.get('',wrapErrorHandler(async (req: Request, res: Response) => {
//     const { id, ymd } = req.params;
//     console.log(`GET /??/${id}/${ymd}`);
//
//     const results = await db('');
//     if (results) {
//         res.status(200).send(results);
//     } else {
//         res.status(404).send({message : 'No data found'});
//     }
// }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}/`);
});
