import express from 'express';
import { Request, Response, NextFunction } from 'express';
import db from './knex';
import { differenceInMinutes, isAfter, isEqual, addDays} from 'date-fns'


const app = express();
app.use(express.json());

type SaveAT = {
    employee_code: string,
    start_date: string,
    start_ts?: string,
    end_ts?: string,
    before_overtime_flag?: boolean,
    after_overtime_flag?: boolean
    overtime_minute: number
}
type ClockInCheck = {
    id: number,
    start_date: string,
    start_ts: string,
    end_ts: string,
}

type StartEndDate = {
    startDate?: Date | null,
    endDate?: Date | null
}

function wrapErrorHandler(func: Function){
    return function (req: Request, res: Response, next: NextFunction){
        func(req, res, next).catch((e:Error) => next(e));
    }
}

async function getRegularTimes(start_date: string, employee_code: string) {
    const [data] = await db('m_employees as t1') // メインテーブル m_employees
        .join('m_groups as t2', 't1.group_code', 't2.group_code') // m_groupsと結合
        .join('m_working_dates as t3', 't2.work_types_id', 't3.work_types_id') // m_working_datesと結合
        .join('m_work_codes as t4', 't3.work_code', 't4.work_code') // m_work_codesと結合
        .where('t1.employee_code', employee_code) // 社員コードでフィルタリング
        .andWhere('t3.ymd', start_date) // 日付でフィルタリング
        .select(
            't4.start_time', // 必要な列: 開始時間
            't4.end_time'    // 必要な列: 終了時間
        );

    if (!data) return { startDate: null, endDate: null};

    const startTime:string = data.start_time;
    const endTime:string = data.end_time;

    console.log("定時 start_time: ", startTime);
    console.log("定時 end_time: ", endTime);

    const regularStartTime = new Date(`${start_date} ${startTime}`);
    let regularEndTime = new Date(`${start_date} ${endTime}`);

    // console.log("regularStartTime: ", regularStartTime);
    // console.log("regularEndTime: ", regularEndTime);

    if (isAfter(regularStartTime, regularEndTime)){
        regularEndTime = addDays(new Date(`${start_date} ${endTime}`), 1);
        // console.log("regularEndTime re: ", regularEndTime);
    }

    return {
        startDate: regularStartTime,
        endDate: regularEndTime
    };

}

function setTmpClockInDate(oldAT: ClockInCheck, start_ts: string, end_ts:string, tmpClockInDate: StartEndDate) {
    // 打刻済のデータ
    if (oldAT) {
        if(oldAT.start_ts) {
            tmpClockInDate['startDate'] =  new Date(oldAT.start_ts);
        }
        if(oldAT.end_ts){
            tmpClockInDate['endDate'] =  new Date(oldAT.end_ts);
        }
    }
    // 新しく入力されたデータ
    if(start_ts) {
        tmpClockInDate['startDate'] = new Date(start_ts);
    }
    if (end_ts) {
        tmpClockInDate['endDate'] = new Date(end_ts);// dateにすると日本時間じゃなくなっている
    }
}

function setATFields(tmpClockInDate: StartEndDate, regularTimes: StartEndDate, updateAT:SaveAT){
    if (tmpClockInDate.startDate && regularTimes.startDate) {
        if (isEqual(regularTimes.startDate, tmpClockInDate.startDate)){
            console.log("はやざんなし");
            updateAT['before_overtime_flag'] = false;
        } else if (isAfter(regularTimes.startDate, tmpClockInDate.startDate)) {
            console.log("はやざん:", differenceInMinutes(regularTimes.startDate, tmpClockInDate.startDate));
            updateAT['overtime_minute'] += differenceInMinutes(regularTimes.startDate, tmpClockInDate.startDate);
            updateAT['before_overtime_flag'] = true;
        }
        updateAT['start_ts'] = tmpClockInDate.startDate.toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'});
    }
    if (tmpClockInDate.endDate && regularTimes.endDate) {
        if (isEqual(tmpClockInDate.endDate, regularTimes.endDate)){
            console.log("おそざんなし");
            updateAT['after_overtime_flag'] = false;
        } else if(isAfter(tmpClockInDate.endDate, regularTimes.endDate)) {
            console.log("おそざん: ", differenceInMinutes(tmpClockInDate.endDate, regularTimes.endDate));
            updateAT['overtime_minute'] += differenceInMinutes(tmpClockInDate.endDate, regularTimes.endDate)
            updateAT['after_overtime_flag'] = true;
        }
        updateAT['end_ts'] = tmpClockInDate.endDate.toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'});
    }
}

async function upsertData(oldAT: ClockInCheck, updateAT: SaveAT) {
    if (oldAT) {
        await db('attendance_times as t1')
            .where('t1.id', oldAT.id)
            .update(updateAT, ['id']);
    } else {
        await db('attendance_times as t1')
            .insert(updateAT, ['id']);
    }
}

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
        const regularTimes : StartEndDate = await getRegularTimes(ymd, id);
        const outputData = {
            ...data,
            start_time: regularTimes.startDate?.toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'}),
            end_time: regularTimes.endDate?.toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'})
        }
        res.status(200).send(outputData);
    }
    else {
        res.status(404).send({message : 'No data found'});
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
    }
    else {
        res.status(404).send({message : 'No data found'});
    }
}));

app.post("/attendance-time", wrapErrorHandler(async (req: Request, res: Response) => {
    const { employee_code, start_date, start_ts, end_ts } = req.body;
    const updateAT: SaveAT = {
        employee_code: employee_code,
        start_date: start_date,
        overtime_minute: 0
    }

    const [oldAT] : ClockInCheck[] | undefined = await db('attendance_times as t1')
        .select(
            't1.id',
            db.raw("to_char(start_date, 'YYYY-MM-DD') as start_date"),
            db.raw("to_char(start_ts AT TIME ZONE 'Asia/Tokyo', 'YYYY-MM-DD HH24:MI:SS') as start_ts"),
            db.raw("to_char(end_ts AT TIME ZONE 'Asia/Tokyo', 'YYYY-MM-DD HH24:MI:SS') as end_ts"),
        )
        .where('t1.employee_code', employee_code) // 社員コード (employee_code) でフィルタ
        .andWhere('t1.start_date', start_date) // 開始日 (start_date) でフィルタ

    console.log("oldAT: ", oldAT);

    const tmpClockInDate: StartEndDate = {}
    setTmpClockInDate(oldAT, start_ts, end_ts, tmpClockInDate);

    const regularTimes: StartEndDate = await getRegularTimes(start_date, employee_code);
    console.log('====================');

    if (!regularTimes) {
        res.status(400).send({message: 'NG'});
    } else {
        setATFields(tmpClockInDate, regularTimes, updateAT);
        console.log("newAT: ", updateAT);
        await upsertData(oldAT, updateAT);
        res.status(200).send({message: 'ok'});
    }

}));

app.get("/members-overtime/:id/:ymd", wrapErrorHandler(async (req: Request, res: Response) => {
    const {id, ymd} = req.params;
    console.log(`GET /members-overtime/${id}/${ymd}`);
    function forceFirstDayOfMonth(dateString: string) {
        return dateString.replace(/-\d{2}$/, '-01');
    }
    const ym01 = forceFirstDayOfMonth(ymd);
    // const employeesInGroup = await db('m_employees')
    //     .whereIn('group_code', db('m_employees')
    //         .where('employee_code', id)
    //         .select('group_code'))
    //     .select('*');
    // console.log("employeesInGroup: ", employeesInGroup);

    const baseEmployees = await db('m_employees as t1')
        .join('m_groups as t3', 't1.group_code', 't3.group_code')
        .whereIn('t1.group_code', db('m_employees')
            .where('employee_code', id)
            .select('group_code'))
        .select(
            't1.name',          // 必要な列: 名前
            't1.employee_code',
            // 't1.group_code',    // 必要な列: グループコード
            // 't3.group_name',    // 必要な列: グループ名
            't1.paid_holiday'
        );
    // console.log("baseEmployees: ", baseEmployees);

    const rtn  = baseEmployees.map(async (employee) => {
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
            .count({ count: '*'});

        // console.log("schedules: ", schedules);
        const rest_paid_holidays = employee.paid_holiday - paidHolidaysCount.count + (ym01.startsWith('2025') ? 20 : 0);

        const overtimes = await db('attendance_times as t1')
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
            rest_paid_holidays,
            overtimes,
            schedules
        }
    });

    const result = await Promise.all(rtn);
    res.status(200).send(result);
}));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}/`);
});