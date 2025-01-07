import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {useContext} from "react";
import {dateContext} from "./App.tsx";

//サンプルデータ
import {employees} from "./Data.ts";
import {event} from "./Data.ts";
import {attendanceTime} from "./Data.ts";
import {usualSchedule} from "./Data.ts";
import {scheduleType} from "./Data.ts";
import {workDate} from "./Data.ts";

let calendarData : Date[];
let eventData : string[];
let overTimeData : number[];
let scheduleData : string[];
let sumOverTimeData : number[];

function setCalender(startDate : Date, endDate : Date) {
  calendarData = [];
  while (startDate <= endDate) {
    calendarData.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1)
  }
}

function setEvent(startDate : Date, endDate : Date) {
  eventData = [];
  while (startDate <= endDate) {
    const pickupEvent = event.filter(val => {
      return new Date(val.ymd).toDateString() === startDate.toDateString()
    });
    if (pickupEvent.length === 0) {
      eventData.push("")
    } else {
      eventData.push(pickupEvent[0].event_name)
    }
    startDate.setDate(startDate.getDate() + 1)
  }
}

function setOverTime(startDate : Date, endDate : Date, employeeCode : string) {
  overTimeData = [];
  while (startDate <= endDate) {
      const pickupData = attendanceTime.filter(data => {
        return data.employee_code === employeeCode && new Date(data.start_date).toDateString() === startDate.toDateString()
      })
      if (pickupData.length === 0) {
        overTimeData.push(-1);
      } else {
        overTimeData.push(pickupData[0].overtime_minute)
      }
    startDate.setDate(startDate.getDate() + 1)
  }
}

function setSchedule(startDate : Date, endDate : Date, employeeCode : string) {
  scheduleData = [];
  while (startDate <= endDate) {
    const pickupData = usualSchedule.filter(data => {
      return data.employee_code === employeeCode && new Date(data.ymd).toDateString() === startDate.toDateString()
    })
    if (pickupData.length === 0) {
      scheduleData.push("");
    } else {
      scheduleData.push(scheduleType.filter(scheduleType => scheduleType.id === pickupData[0].schedule_types_id)[0].name)
    }
    startDate.setDate(startDate.getDate() + 1)
  }
}

function setSumOverTime(startDate : Date, endDate : Date) {
  sumOverTimeData = [];
  while (startDate <= endDate) {
    const pickupData = attendanceTime.filter(data => {
      return new Date(data.start_date).toDateString() === startDate.toDateString()
    })
    sumOverTimeData.push(pickupData.reduce((sum, overTime) => {
      if (overTime.overtime_minute > 0) {
        return sum + overTime.overtime_minute;
      } else {
        return sum
      }
    },0))
    startDate.setDate(startDate.getDate() + 1)
  }
}

export function OverTimeTable() {

  const {date} = useContext(dateContext)

  const year : number = date.getFullYear();
  const month : number = date.getMonth()+1;

  const startDate : Date = new Date(year, month - 1, 1);
  const endDate : Date = new Date(year, month, 0);
  setCalender(new Date(startDate),new Date(endDate));
  setEvent(new Date(startDate),new Date(endDate));
  setSumOverTime(new Date(startDate), new Date(endDate))

  return (
      <div className="flex-shrink-0">
        <Table className="bg-gray-50 text-xl">
          <TableHeader>
            <TableRow className="h-12">
              {calendarData.map(date => {
                const pickupWorkDate = workDate.filter(val => new Date(val.ymd).toDateString() === date.toDateString())
                if (pickupWorkDate.length === 1) {
                  if (pickupWorkDate[0].work_code === "0001") {
                    return <TableHead key={date.getDate()} className="text-center border w-16 bg-yellow-300">{date.getDate()}</TableHead>
                  } else {
                    return <TableHead key={date.getDate()} className="text-center border w-16 bg-green-300">{date.getDate()}</TableHead>
                  }
                } else {
                  return <TableHead key={date.getDate()} className="text-center border w-16 text-red-600">{date.getDate()}</TableHead>
                }
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="text-center h-14 m-0">
              {eventData.map((val, index) => <TableCell key={index} className="border text-base p-0 m-0">{val}</TableCell>)}
            </TableRow>
            {employees.map((employee,index) => {
              setOverTime(new Date(startDate),new Date(endDate), employee.employee_code);
              setSchedule(new Date(startDate),new Date(endDate), employee.employee_code);
              const zebraCss = index % 2 === 0 ? "h-7 bg-gray-200 text-base" : "h-7 text-base"
              return (
                <>
                  <TableRow className={zebraCss} key={index}>{overTimeData.map(overTime => {
                    if(overTime > 0) {
                      return <TableCell className="text-center border p-0">{`${Math.floor(overTime/60)}:${('00' + (overTime%60)).slice(-2)}`}</TableCell>
                    } else if (overTime === 0) {
                      return <TableCell className="text-center border p-0">0</TableCell>
                    } else {
                      return <TableCell className="border p-0"></TableCell>
                    }
                  })}</TableRow>
                  <TableRow className={zebraCss}>{scheduleData.map(schedule => {
                    if(schedule !== "") {
                      const textColorCss = schedule === "年休" ? "text-center border p-0 text-red-500" : "text-center border p-0"
                      return <TableCell className={textColorCss}>{schedule}</TableCell>
                    } else {
                      return <TableCell className="text-center border p-0 "></TableCell>
                    }
                  })}</TableRow>
                </>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow className="text-center h-14 bg-gray-400">
              {sumOverTimeData.map(overTime => {
                if (overTime > 0) {
                  return <TableCell className="text-center border p-0">{`${Math.floor(overTime/60)}:${('00' + (overTime%60)).slice(-2)}`}</TableCell>
                } else {
                  return <TableCell className="text-center border p-0"></TableCell>
                }
              })}
            </TableRow>
          </TableFooter>
        </Table>
      </div>
  )
}
