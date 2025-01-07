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

    if (!data) return { startDate: null, endDate: null };

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

export function setTmpClockInDate(
    oldAT: ClockInCheck,
    start_ts: string,
    end_ts: string,
    tmpClockInDate: StartEndDate
) {
    // 打刻済のデータ
    if (oldAT) {
        if (oldAT.start_ts) {
            tmpClockInDate["startDate"] = new Date(oldAT.start_ts);
        }
        if (oldAT.end_ts) {
            tmpClockInDate["endDate"] = new Date(oldAT.end_ts);
        }
    }
    // 新しく入力されたデータ
    if (start_ts) {
        tmpClockInDate["startDate"] = new Date(start_ts);
    }
    if (end_ts) {
        tmpClockInDate["endDate"] = new Date(end_ts); // dateにすると日本時間じゃなくなっている
    }
}

export function setATFields(
    tmpClockInDate: StartEndDate,
    regularTimes: StartEndDate,
    updateAT: SaveAT
) {
    if (tmpClockInDate.startDate && regularTimes.startDate) {
        if (isEqual(regularTimes.startDate, tmpClockInDate.startDate)) {
            console.log("はやざんなし");
            updateAT["before_overtime_flag"] = false;
        } else if (isAfter(regularTimes.startDate, tmpClockInDate.startDate)) {
            console.log(
                "はやざん:",
                differenceInMinutes(regularTimes.startDate, tmpClockInDate.startDate)
            );
            updateAT["overtime_minute"] += differenceInMinutes(
                regularTimes.startDate,
                tmpClockInDate.startDate
            );
            updateAT["before_overtime_flag"] = true;
        }
        updateAT["start_ts"] = tmpClockInDate.startDate.toLocaleString("ja-JP", {
            timeZone: "Asia/Tokyo",
        });
    }
    if (tmpClockInDate.endDate && regularTimes.endDate) {
        if (isEqual(tmpClockInDate.endDate, regularTimes.endDate)) {
            console.log("おそざんなし");
            updateAT["after_overtime_flag"] = false;
        } else if (isAfter(tmpClockInDate.endDate, regularTimes.endDate)) {
            console.log(
                "おそざん: ",
                differenceInMinutes(tmpClockInDate.endDate, regularTimes.endDate)
            );
            updateAT["overtime_minute"] += differenceInMinutes(
                tmpClockInDate.endDate,
                regularTimes.endDate
            );
            updateAT["after_overtime_flag"] = true;
        }
        updateAT["end_ts"] = tmpClockInDate.endDate.toLocaleString("ja-JP", {
            timeZone: "Asia/Tokyo",
        });
    }
}

export function forceFirstDayOfMonth(dateString: string) {
    return dateString.replace(/-\d{2}$/, "-01");
}

export async function upsertATData(oldAT: ClockInCheck, updateAT: SaveAT) {
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