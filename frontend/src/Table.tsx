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

let calendarData : number[];
let eventData : string[];
let overTimeData : number[];
let scheduleData : string[];

function setCalender(startDate : Date, endDate : Date) {
  calendarData = [];
  while (startDate <= endDate) {
    calendarData.push(startDate.getDate());
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

export function Home() {

  const {date} = useContext(dateContext)

  const year : number = date.getFullYear();
  const month : number = date.getMonth()+1;

  const startDate : Date = new Date(year, month - 1, 1);
  const endDate : Date = new Date(year, month, 0);
  setCalender(new Date(startDate),new Date(endDate));
  setEvent(new Date(startDate),new Date(endDate));



  return (
    <Table>
      <TableHeader>
        <TableRow>
          {calendarData.map(date => <TableHead key={date} className="w-11">{date}</TableHead>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {eventData.map((val, index) => <TableCell key={index}>{val}</TableCell>)}
        </TableRow>
        {employees.map(employee => {
          setOverTime(new Date(startDate),new Date(endDate), employee.employee_code);
          setSchedule(new Date(startDate),new Date(endDate), employee.employee_code);
          return (
            <>
              <TableRow>{overTimeData.map(overTime => {
                if(overTime > 0) {
                  return <TableCell>{`${Math.floor(overTime/60)}:${('00' + (overTime%60)).slice(-2)}`}</TableCell>
                } else if (overTime === 0) {
                  return <TableCell>0</TableCell>
                }
              })}</TableRow>
              <TableRow>{scheduleData.map(schedule => {
                if(schedule !== "") {
                  return <TableCell>{schedule}</TableCell>
                } else {
                  return <TableCell></TableCell>
                }
              })}</TableRow>
            </>
          )
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
