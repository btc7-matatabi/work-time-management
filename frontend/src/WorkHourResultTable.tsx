import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx"
import {useContext} from "react";
import {dateContext} from "./App.tsx";
import {workContents, workDate, workHourResult} from "@/Data.ts";

//サンプルデータ


let calendarData : Date[];

function setCalender(startDate : Date, endDate : Date) {
  calendarData = [];
  while (startDate <= endDate) {
    calendarData.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1)
  }
}

let resultTime : number[];

function setResult(id : number, startDate : Date, endDate : Date) {
  resultTime = [];
  while (startDate <= endDate) {
    const pickupData = workHourResult.filter(result => {
      return result.work_contents_id === id && new Date(result.ymd).toDateString() === startDate.toDateString()
    })
    if (pickupData.length === 1) {
      resultTime.push(pickupData[0].work_minute);
    } else {
      resultTime.push(0);
    }
    startDate.setDate(startDate.getDate() + 1)
  }
}

export function WorkHourResultTable() {
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
                  return <TableHead key={date.getDate()}
                                    className="text-center border w-24 bg-yellow-300">{date.getDate()}</TableHead>
                } else {
                  return <TableHead key={date.getDate()}
                                    className="text-center border w-24 bg-green-300">{date.getDate()}</TableHead>
                }
              } else {
                return <TableHead key={date.getDate()}
                                  className="text-center border w-24 text-red-600">{date.getDate()}</TableHead>
              }
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            workContents.map(content => {
              setResult(content.id,new Date(startDate),new Date(endDate));
              return (
              <TableRow key={content.id} className="h-12">
                {resultTime.map(time => {
                  if (time > 0) {
                    return (
                      <TableCell className="text-center border p-1">
                        {`${Math.floor(time/60)}:${('00' + (time%60)).slice(-2)}`}
                      </TableCell>
                    )
                  } else {
                    return (
                      <TableCell className="text-center border p-1"></TableCell>
                    )
                  }
                })}
              </TableRow>
              )})
          }
        </TableBody>
      </Table>
    </div>
  )
}