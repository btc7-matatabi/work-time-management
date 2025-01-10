import {Dispatch, SetStateAction, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {DialogDemo} from "@/DialogDemo.tsx";
import {Dialog, DialogTrigger} from "@/components/ui/dialog.tsx";
import {useAtom} from "jotai";
import {
  changeItemsAtom,
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
import {Input} from "@/components/ui/input.tsx";
// import {format} from "date-fns";

let calendarData : Date[];

function setCalender(startDate : Date, endDate : Date) {
  calendarData = [];
  while (startDate <= endDate) {
    calendarData.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1)
  }
}

function setStartTime(overtimes:overtimeIF[], date : Date, workCodes:workCodesIF[], workDate:workDateIF[],id:string){
  const element = document.getElementById(id);
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
    if (pickupData[0].before_overtime_flag && element !== null) {
        element.style.backgroundColor = "#fef9c3"//yellow-100
    }
    return `${startTime.getHours()}:${startTime.getMinutes().toString().padStart(2, '0')}`
  } else {
    if (element !== null) {
      element.style.backgroundColor = "#ffffff"
    }
    return ""
  }
}

function setEndTime(overtimes:overtimeIF[], date : Date, workCodes:workCodesIF[], workDate:workDateIF[],id:string) {
  const element = document.getElementById(id);
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

    if (pickupData[0].after_overtime_flag && element !== null) {
      element.style.backgroundColor = "#fef9c3"//yellow-100
    }
    return `${endTime.getHours()}:${endTime.getMinutes().toString().padStart(2, '0')}`
  } else {
    if (element !== null) {
      element.style.backgroundColor = "#ffffff"
    }
    return ""
  }
}

function setSchedule(date : Date, schedules:scheduleIF[], id:string) {
  const elements = [];
  elements.push(document.getElementById(id));
  elements.push(document.getElementById(id.slice( 0, -8 ) + "start"));
  elements.push(document.getElementById(id.slice( 0, -8 ) + "end"));
  if(elements[0] !== null){
    elements[0].style.backgroundColor = "#ffffff"
  }
  const pickupSchedule = schedules.filter(val => {
    return new Date(val.ymd).toDateString() === date.toDateString()
  })
  if (pickupSchedule.length === 1) {
    if (pickupSchedule[0].name === "年休") {
      elements.map(element => {
        if (element !== null) {
          element.style.backgroundColor = "#fecaca"//red-200
        }
      })
    } else {
      elements.map(element => {
        if (element !== null) {
          element.style.backgroundColor = "#d1d5db"//gray
        }
      })
    }
    return pickupSchedule[0].name
  }
}

function dataChange(id:string, defTime:string, inputText:string, changeItems:string[], setChangeItems:Dispatch<SetStateAction<string[]>>) {
  const element = document.getElementById(id);
  // const inputTimeArray = inputText.split(":");
  // const ts = new Date(id.split("_")[1]);
  // ts.setHours(Number(inputTimeArray[0]));
  // ts.setMinutes(Number(inputTimeArray[1]));
  // const inputData = format(ts,"yyyy/MM/dd HH:mm:ss")
  if (element !== null) {
    if (defTime !== inputText) {
      element.style.backgroundColor = "#bbf7d0"
      if (!changeItems.includes(id)) {
        setChangeItems([...changeItems, id])
      }
    } else {
      element.style.backgroundColor = ""
      setChangeItems(
        changeItems.filter((item) => (item !== id))
      )
    }
  }
  console.log(element?.textContent)
}

export function ClockinTimeTable() {

  const [date] = useAtom(dateAtom);
  const [dialogEmployee, setDialogEmployee] = useState("");
  const [dialogDate, setDialogDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const employees = useAtomValue(employeesAtom)
  const groupInfo = useAtomValue(groupInfoAtom)
  const workDate = useAtomValue(workDateAtom);
  const [changeItems, setChangeItems] = useAtom(changeItemsAtom);

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
                if (pickupWorkDate[0].work_code === groupInfo?.work_codes[0].work_code) {
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
                <TableRow className="bg-white h-9 text-base text-center border-b-2 border-dashed">
                {calendarData.map(date => {
                  let startTime = "";
                  let endTime = "";
                  if (groupInfo?.work_codes !== undefined) {
                    startTime = setStartTime(employee.overtimes,date, groupInfo.work_codes,workDate,`${employee.employee_code}_${date}_start_cell`)
                    endTime = setEndTime(employee.overtimes,date, groupInfo.work_codes,workDate,`${employee.employee_code}_${date}_end_cell`)
                  }
                  return (
                    <TableCell className="p-0 border-r-2">
                      <TableCell id={`${employee.employee_code}_${date}_start_cell`} className="border-r-2 border-dashed p-0">
                        <Input id={`${employee.employee_code}_${date}_start`} className={`p-0 text-center bg-white`} type="text" defaultValue={startTime} onChange={(e) => {
                          dataChange(`${employee.employee_code}_${date}_start`,startTime,e.target.value, changeItems, setChangeItems)
                        }}/>
                      </TableCell>
                      <TableCell id={`${employee.employee_code}_${date}_end_cell`} className="p-0">
                        <Input id={`${employee.employee_code}_${date}_end`} className={`p-0 text-center`} type="text" defaultValue={endTime} onChange={(e) => {
                          dataChange(`${employee.employee_code}_${date}_end`,endTime,e.target.value, changeItems, setChangeItems)
                        }}/>
                      </TableCell>
                    </TableCell>
                  )
                })}
                </TableRow>
                <TableRow className="h-9 text-base text-center">
                  {calendarData.map(date => {
                    const schedule = setSchedule(date, employee.schedules,`${employee.employee_code}_${date}_schedule`)
                      return (
                          <DialogTrigger asChild>
                            <TableCell id={`${employee.employee_code}_${date}_schedule`} className="h-6 border-r-2 border-b-2 p-0" onClick={() => {
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

