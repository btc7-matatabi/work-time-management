import {useContext} from "react";
import {dateContext} from "./App.tsx";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {employees, workDate, attendanceTime, usualSchedule, scheduleType, workCode} from "@/Data.ts";

let calendarData : Date[];
let bgColor = "";
let startBgColor = "";
let endBgColor = "";

function setCalender(startDate : Date, endDate : Date) {
  calendarData = [];
  while (startDate <= endDate) {
    calendarData.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1)
  }
}

function setStartTime(employeeCode : string, date : Date) {
  startBgColor = "";
  const pickupData = attendanceTime.filter(val => {
    return val.employee_code === employeeCode && new Date(val.start_date).toDateString() === date.toDateString();
  })
  if (pickupData.length === 1) {
    const startTime = new Date(pickupData[0].start_ts);
    const setWorkCode = workDate.filter(val => new Date(val.ymd).toDateString() === date.toDateString())[0].work_code;
    const workStartTime = workCode.filter(val => val.work_code === setWorkCode)[0].start_time.split(":");
    const comparisonTime = new Date(date);
    comparisonTime.setHours(Number(workStartTime[0]))
    comparisonTime.setMinutes(Number(workStartTime[1]))
    comparisonTime.setSeconds(0)
    if (startTime.getTime() < comparisonTime.getTime()) {
      startBgColor = "bg-yellow-100"
    }
    return `${startTime.getHours()}:${startTime.getMinutes()}`
  }
}

function setEndTime(employeeCode : string, date : Date) {
  endBgColor=""
  const pickupData = attendanceTime.filter(val => {
    return val.employee_code === employeeCode && new Date(val.start_date).toDateString() === date.toDateString();
  })
  if (pickupData.length === 1) {
    const endTime = new Date(pickupData[0].end_ts);
    const setWorkCode = workDate.filter(val => new Date(val.ymd).toDateString() === date.toDateString())[0].work_code;
    const workEndTime = workCode.filter(val => val.work_code === setWorkCode)[0].end_time.split(":");
    const comparisonTime = new Date(date);
    comparisonTime.setHours(Number(workEndTime[0]))
    comparisonTime.setMinutes(Number(workEndTime[1]))
    comparisonTime.setSeconds(0)

    if (endTime.getTime() > comparisonTime.getTime()) {
      endBgColor = "bg-yellow-100"
    }

    return `${endTime.getHours()}:${endTime.getMinutes()}`
  }
}

function setSchedule(employeeCode : string, date : Date) {
  bgColor=""
  const pickupSchedule = usualSchedule.filter(val => {
    return val.employee_code === employeeCode && new Date(val.ymd).toDateString() === date.toDateString()
  })
  if (pickupSchedule.length === 1) {
    if (pickupSchedule[0].schedule_types_id === 2) {
      bgColor = "bg-red-200"
    } else {
      bgColor = "bg-gray-300"
    }
    return scheduleType.filter(val => {
      return val.id === pickupSchedule[0].schedule_types_id
    })[0].name
  }
}

export function ClockinTimeTable() {

  const {date} = useContext(dateContext)

  const year : number = date.getFullYear();
  const month : number = date.getMonth()+1;
  const startDate : Date = new Date(year, month - 1, 1);
  const endDate : Date = new Date(year, month, 0);
  setCalender(new Date(startDate),new Date(endDate));

  return (
    <div className="flex-shrink-0">
      <Table className="bg-gray-50 text-2xl">
        <TableHeader>
          <TableRow className="h-14">
            {calendarData.map(date => {
              const pickupWorkDate = workDate.filter(val => new Date(val.ymd).toDateString() === date.toDateString())
              if (pickupWorkDate.length === 1) {
                if (pickupWorkDate[0].work_code === "0001") {
                  return <TableHead key={date.getDate()} className="text-center border w-48 bg-yellow-300">{date.getDate()}</TableHead>
                } else {
                  return <TableHead key={date.getDate()} className="text-center border w-48 bg-green-300">{date.getDate()}</TableHead>
                }
              } else {
                return <TableHead key={date.getDate()} className="text-center border w-48 text-red-600">{date.getDate()}</TableHead>
              }
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map(employee => {
            return (
              <>
                <TableRow className="bg-white h-12 text-xl text-center border-b-2 border-dashed">
                {calendarData.map(date => {
                  setSchedule(employee.employee_code,date)
                  const startTime = setStartTime(employee.employee_code,date)
                  const endTime = setEndTime(employee.employee_code,date)
                  return (
                    <TableCell className={`${bgColor} p-0 border-r-2`}>
                      <TableCell className={`${startBgColor} w-24 h-11 border-r-2 border-dashed`}>{startTime}</TableCell>
                      <TableCell className={`${endBgColor} w-24 h-11`}>{endTime}</TableCell>
                    </TableCell>
                  )
                })}
                </TableRow>
                <TableRow className="h-12 text-xl text-center">
                  {calendarData.map(date => {
                    const schedule = setSchedule(employee.employee_code,date)
                    return <TableCell className={`${bgColor} h-6 border-r-2 border-b-2`}>{schedule}</TableCell>
                  })}
                </TableRow>
              </>
            )
          })}

        </TableBody>
        <TableFooter>

        </TableFooter>
      </Table>
    </div>
  )

}

