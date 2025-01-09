import {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {DialogDemo} from "@/DialogDemo.tsx";
import {Dialog, DialogTrigger} from "@/components/ui/dialog.tsx";
import {useAtom} from "jotai";
import {
  dateAtom,
  employeesAtom,
  groupInfoAtom,
  overtimeIF,
  scheduleIF,
  workCodesIF,
  workDateAtom,
  workDateIF
} from "@/atom.ts";
import {useAtomValue} from "jotai/index";

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

function setStartTime(overtimes:overtimeIF[], date : Date, workCodes:workCodesIF[], workDate:workDateIF[]){
  startBgColor = "";
  const pickupData = overtimes.filter(val => {
    return new Date(val.start_date).toDateString() === date.toDateString();
  })
  if (pickupData.length === 1) {
    const startTime = new Date(pickupData[0].start_ts);
    const setWorkCode = workDate.filter(val => new Date(val.ymd).toDateString() === date.toDateString())[0].work_code;
    const workStartTime = workCodes.filter(val => val.work_code === setWorkCode)[0].start_time.split(":");
    const comparisonTime = new Date(date);
    comparisonTime.setHours(Number(workStartTime[0]))
    comparisonTime.setMinutes(Number(workStartTime[1]))
    comparisonTime.setSeconds(0)
    if (startTime.getTime() < comparisonTime.getTime()) {
      startBgColor = "bg-yellow-100"
    }
    return `${startTime.getHours()}:${startTime.getMinutes()}`
  } else {
    return ""
  }
}

function setEndTime(overtimes:overtimeIF[], date : Date, workCodes:workCodesIF[], workDate:workDateIF[]) {
  endBgColor=""
  const pickupData = overtimes.filter(val => {
    return new Date(val.start_date).toDateString() === date.toDateString();
  })
  if (pickupData.length === 1) {
    const endTime = new Date(pickupData[0].end_ts);
    const setWorkCode = workDate.filter(val => new Date(val.ymd).toDateString() === date.toDateString())[0].work_code;
    const workEndTime = workCodes.filter(val => val.work_code === setWorkCode)[0].end_time.split(":");
    const comparisonTime = new Date(date);
    comparisonTime.setHours(Number(workEndTime[0]))
    comparisonTime.setMinutes(Number(workEndTime[1]))
    comparisonTime.setSeconds(0)

    if (endTime.getTime() > comparisonTime.getTime()) {
      endBgColor = "bg-yellow-100"
    }
    return `${endTime.getHours()}:${endTime.getMinutes()}`
  } else {
    return ""
  }
}

function setSchedule(date : Date, schedules:scheduleIF[]) {
  bgColor=""
  const pickupSchedule = schedules.filter(val => {
    return new Date(val.ymd).toDateString() === date.toDateString()
  })
  if (pickupSchedule.length === 1) {
    if (pickupSchedule[0].name === "年休") {
      bgColor = "bg-red-200"
    } else {
      bgColor = "bg-gray-300"
    }
    return pickupSchedule[0].name
  }
}

export function ClockinTimeTable() {

  const [date] = useAtom(dateAtom);
  const [dialogEmployee, setDialogEmployee] = useState("");
  const [dialogDate, setDialogDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const employees = useAtomValue(employeesAtom)
  const groupInfo = useAtomValue(groupInfoAtom)
  const workDate = useAtomValue(workDateAtom);

  const year : number = date.getFullYear();
  const month : number = date.getMonth()+1;
  const startDate : Date = new Date(year, month - 1, 1);
  const endDate : Date = new Date(year, month, 0);
  setCalender(new Date(startDate),new Date(endDate));

  return (
    <div className="flex-shrink-0 w-max">
      <Table className="bg-gray-50 text-xl">
        <TableHeader>
          <TableRow className="h-12">
            {calendarData.map(date => {
              const pickupWorkDate = workDate.filter(val => new Date(val.ymd).toDateString() === date.toDateString())
              if (pickupWorkDate.length === 1) {
                if (pickupWorkDate[0].work_code === "0011") {
                  return <TableHead key={date.getDate()} className="text-center border w-32 bg-yellow-300">{date.getDate()}</TableHead>
                } else {
                  return <TableHead key={date.getDate()} className="text-center border w-32 bg-green-300">{date.getDate()}</TableHead>
                }
              } else {
                return <TableHead key={date.getDate()} className="text-center border w-32 text-red-600">{date.getDate()}</TableHead>
              }
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          <Dialog open={open} onOpenChange={setOpen}>
          {employees.map(employee => {
            return (
              <>
                <TableRow className="bg-white h-8 text-base text-center border-b-2 border-dashed">
                {calendarData.map(date => {
                  setSchedule(date, employee.schedules)
                  let startTime = "";
                  let endTime = "";
                  if (groupInfo?.work_codes !== undefined) {
                    startTime = setStartTime(employee.overtimes,date, groupInfo.work_codes,workDate)
                    endTime = setEndTime(employee.overtimes,date, groupInfo.work_codes,workDate)
                  }
                  return (
                    <TableCell className={`${bgColor} p-0 border-r-2`}>
                      <TableCell className={`${startBgColor} w-24 h-7 border-r-2 border-dashed p-0`}>{startTime}</TableCell>
                      <TableCell className={`${endBgColor} w-24 h-7 p-0`}>{endTime}</TableCell>
                    </TableCell>
                  )
                })}
                </TableRow>
                <TableRow className="h-8 text-base text-center">
                  {calendarData.map(date => {
                    const schedule = setSchedule(date, employee.schedules)
                      return (
                          <DialogTrigger asChild>
                            <TableCell className={`${bgColor} h-6 border-r-2 border-b-2 p-0`} onClick={() => {
                              setDialogEmployee(employee.employee_code);
                              setDialogDate(date);
                            }}>{schedule}</TableCell>
                          </DialogTrigger>
                        )
                  })}
                </TableRow>
              </>
            )
          })}
            <DialogDemo setOpen={setOpen} dialogEmployee={dialogEmployee} dialogDate={dialogDate}/>
          </Dialog>
        </TableBody>
      </Table>
    </div>
  )

}

