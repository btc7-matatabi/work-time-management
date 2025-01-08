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


//サンプルデータ
import {event} from "./Data.ts";
import {workDate} from "./Data.ts";
import {useAtom, useAtomValue} from "jotai";
import {dateAtom, employeeIF, employeesAtom, overtimeIF, scheduleIF} from "@/atom.ts";

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

function setOverTime(startDate : Date, endDate : Date, overtimes:overtimeIF[]) {
  overTimeData = [];
  while (startDate <= endDate) {
      const pickupData = overtimes.filter(data => new Date(data.start_date).toDateString() === startDate.toDateString())
      if (pickupData.length === 0) {
        overTimeData.push(-1);
      } else {
        overTimeData.push(pickupData[0].overtime_minute)
      }
    startDate.setDate(startDate.getDate() + 1)
  }
}

function setSchedule(startDate : Date, endDate : Date, schedules:scheduleIF[]) {
  scheduleData = [];
  while (startDate <= endDate) {
    const pickupData = schedules.filter(data => {
      return new Date(data.ymd).toDateString() === startDate.toDateString()
    })[0]
    if (pickupData === undefined) {
      scheduleData.push("");
    } else {
      scheduleData.push(pickupData.name)
    }
    startDate.setDate(startDate.getDate() + 1)
  }
}

function setSumOverTime(startDate : Date, endDate : Date, employees: employeeIF[]) {
  sumOverTimeData = [];
  while (startDate <= endDate) {
    const pickupData = employees.map(data => {
      return data.overtimes.filter(data => new Date(data.start_date).toDateString() === startDate.toDateString())[0]
    }).filter(val => val !== undefined)

    sumOverTimeData.push(pickupData.reduce((sum, overTime) => {
      if (overTime.overtime_minute > 0) {
        return sum + overTime.overtime_minute;
      } else {
        return sum;
      }
    },0))
    startDate.setDate(startDate.getDate() + 1)
  }
}

export function OverTimeTable() {

  const [date] = useAtom(dateAtom)
  const employees = useAtomValue(employeesAtom)

  const year : number = date.getFullYear();
  const month : number = date.getMonth()+1;

  const startDate : Date = new Date(year, month - 1, 1);
  const endDate : Date = new Date(year, month, 0);
  setCalender(new Date(startDate),new Date(endDate));
  setEvent(new Date(startDate),new Date(endDate));
  setSumOverTime(new Date(startDate), new Date(endDate), employees)

  return (
      <div className="flex-shrink-0 w-max">
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
              setOverTime(new Date(startDate),new Date(endDate), employee.overtimes);
              setSchedule(new Date(startDate),new Date(endDate), employee.schedules);
              const zebraCss = index % 2 === 0 ? "h-7 bg-gray-200 text-base" : "h-7 text-base"
              return (
                <>
                  <TableRow className={zebraCss}>{overTimeData.map((overTime,index) => {
                    if(overTime > 0) {
                      return <TableCell className="text-center border p-0" key={index}>{`${Math.floor(overTime/60)}:${('00' + (overTime%60)).slice(-2)}`}</TableCell>
                    } else if (overTime === 0) {
                      return <TableCell className="text-center border p-0" key={index}>0</TableCell>
                    } else {
                      return <TableCell className="border p-0" key={index}></TableCell>
                    }
                  })}</TableRow>
                  <TableRow className={zebraCss}>{scheduleData.map((schedule,index) => {
                    if(schedule !== "") {
                      const textColorCss = schedule === "年休" ? "text-center border p-0 text-red-500" : "text-center border p-0"
                      return <TableCell className={textColorCss} key={index}>{schedule}</TableCell>
                    } else {
                      return <TableCell className="text-center border p-0" key={index}></TableCell>
                    }
                  })}</TableRow>
                </>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow className="text-center h-14 bg-gray-400">
              {sumOverTimeData.map((overTime, index) => {
                if (overTime > 0) {
                  return <TableCell className="text-center border p-0" key={index}>{`${Math.floor(overTime/60)}:${('00' + (overTime%60)).slice(-2)}`}</TableCell>
                } else {
                  return <TableCell className="text-center border p-0" key={index}></TableCell>
                }
              })}
            </TableRow>
          </TableFooter>
        </Table>
      </div>
  )
}
