import {useContext} from "react";
import {dateContext} from "./App.tsx";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {employees, workDate} from "@/Data.ts";

let calendarData : Date[];

function setCalender(startDate : Date, endDate : Date) {
  calendarData = [];
  while (startDate <= endDate) {
    calendarData.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1)
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
          {employees.map(() => {
            return (
              <>
                <TableRow className="bg-white h-12 text-xl">
                {calendarData.map(() => {
                  return (
                    <TableCell className="p-0 border-r-2">
                      <TableCell className="w-24 h-11 border-r-2"></TableCell>
                      <TableCell className="w-24 h-11"></TableCell>
                    </TableCell>
                  )
                })}
                </TableRow>
                <TableRow className="h-12 text-xl">
                  {calendarData.map(() => {
                    return <TableCell className="h-6 border-r-2"></TableCell>
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

