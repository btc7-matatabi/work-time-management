import {NextFunction, Request, Response} from "express";
import db from "../knex";
import {addDays, differenceInMinutes, isAfter, isEqual} from "date-fns";

export function wrapErrorHandler(func: Function) {
    return function (req: Request, res: Response, next: NextFunction) {
        func(req, res, next).catch((e: Error) => next(e));
    };
}

export async function getRegularTimes(start_date: string, employee_code: string) {
    const [data] = await db("m_employees as t1") // メインテーブル m_employees
        .join("m_groups as t2", "t1.group_code", "t2.group_code") // m_groupsと結合
        .join("m_working_dates as t3", "t2.work_types_id", "t3.work_types_id") // m_working_datesと結合
        .join("m_work_codes as t4", "t3.work_code", "t4.work_code") // m_work_codesと結合
        .where("t1.employee_code", employee_code) // 社員コードでフィルタリング
        .andWhere("t3.ymd", start_date) // 日付でフィルタリング
        .select(
            "t4.start_time", // 必要な列: 開始時間
            "t4.end_time" // 必要な列: 終了時間
        );

    if (!data) return null;

    const startTime: string = data.start_time;
    const endTime: string = data.end_time;

    console.log("定時 start_time: ", startTime);
    console.log("定時 end_time: ", endTime);

    const regularStartTime = new Date(`${start_date} ${startTime}`);
    let regularEndTime = new Date(`${start_date} ${endTime}`);

    // console.log("regularStartTime: ", regularStartTime);
    // console.log("regularEndTime: ", regularEndTime);

    if (isAfter(regularStartTime, regularEndTime)) {
        regularEndTime = addDays(new Date(`${start_date} ${endTime}`), 1);
        // console.log("regularEndTime re: ", regularEndTime);
    }

    return {
        startDate: regularStartTime,
        endDate: regularEndTime,
    };
}

export function setATFields(clockInTime: Date, regularTime: Date, updateAT: SaveAT, func: Function, flagKey: 'before_overtime_flag'|'after_overtime_flag') {
    if (isEqual(clockInTime, regularTime)) {
        console.log(flagKey + " 定時");
        updateAT[flagKey] = false;
    } else if(func(clockInTime, regularTime)) {
        console.log(flagKey + " 残業時間: ", calcDifferenceTime(clockInTime, regularTime));
        updateAT["overtime_minute"] += calcDifferenceTime(clockInTime, regularTime);
        updateAT[flagKey] = true;
    }
}

export function calcDifferenceTime(clockInTime: Date, regularTime: Date){
    return Math.abs(differenceInMinutes(clockInTime, regularTime));
}

export function forceFirstDayOfMonth(dateString: string) {
    return dateString.replace(/-\d{2}$/, "-01");
}

export async function upsertATData(oldAT: ClockInCheck | undefined, updateAT: SaveAT) {
    let result: { id: number };
    if (oldAT) {
        [result] = await db("attendance_times as t1")
            .where("t1.id", oldAT.id)
            .update(updateAT, ["id"]);
    } else {
        [result] = await db("attendance_times as t1").insert(updateAT, ["id"]);
    }
    return result;
}

export async function updateUnusualSchedules(id: number, obj: UnusualSchedule) {
    const [result]: { id: number }[] = await db("unusual_schedules as t1")
        .update(obj, ["id"])
        .where("t1.id", id);
    return result;
}

export async function upsertUnusualSchedules(obj: UnusualSchedule) {
    const check: { id: number }[] = await db("unusual_schedules as t1")
        .where("t1.employee_code", obj.employee_code)
        .andWhere("t1.ymd", obj.ymd)
        .select("t1.id");

    let result: { id: number };
    if (check.length) {
        console.log("update unusual_schedules");
        result = await updateUnusualSchedules(check[0].id, obj);
    } else {
        console.log("insert unusual_schedules");
        [result] = await db("unusual_schedules as t1").insert(obj, ["id"]);
    }
    return result;
}

export async function upsertWorkHourResults(workContentsId: number, workHourResults: {ymd: string, work_minute: number, work_contents_id?: number}[]){
    // console.log("upsertWorkHourResults");
    const rtn = workHourResults.map(async (workHourResult) => {
        // console.log("ymd: ", workHourResult.ymd);
        const checkId: { id: number }[] = await db('work_hour_results')
            .where('work_contents_id', workContentsId)
            .andWhere('ymd', workHourResult.ymd)
            .select('id');

        let result: { id: number };
        if (checkId.length) {
            [result] = await db('work_hour_results').update(workHourResult, ['id']).where('id', checkId[0].id);
        } else {
            workHourResult["work_contents_id"] = workContentsId;
            [result] = await db('work_hour_results').insert(workHourResult, ['id']);
        }
        return result;
    });
    return await Promise.all(rtn);
}