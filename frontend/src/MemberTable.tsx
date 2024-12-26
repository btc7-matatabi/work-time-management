import {Table, TableBody, TableHead, TableFooter, TableHeader, TableRow, TableCell} from "@/components/ui/table.tsx";
import {useContext} from "react";
import {dateContext} from "./App.tsx";

//サンプルデータ
import {employees} from "@/Data.ts";
import {usualSchedule} from "@/Data.ts";
import {attendanceTime} from "@/Data.ts";
const today = new Date('2024/12/6')



function sumOverTime(employeeCode:string, startDate: Date) {
  return attendanceTime.filter(data => {
    return startDate <= new Date(data.start_date) &&
      new Date(data.start_date) <= today &&
      data.employee_code === employeeCode
  }).reduce((sum, val) => {
    return sum + val.overtime_minute
  },0)
}

function allSumOverTime(startDate:Date) {
  return attendanceTime.filter(data => {
    return startDate <= new Date(data.start_date) && new Date(data.start_date) <= today
  }).reduce((sum,val) => {
    return sum + val.overtime_minute;
  },0)
}

export function MemberTable() {
  const {date} = useContext(dateContext)

  const year : number = date.getFullYear();
  const month : number = date.getMonth()+1;

  const startDate : Date = new Date(year, month - 1, 1);
  const endDate : Date = new Date(year, month, 0);

  return(
    <div className="flex-shrink-0">
      <Table className="bg-gray-50 text-2xl">
        <TableHeader>
          <TableRow className="h-20">
            <TableHead className="text-center border w-16">No</TableHead>
            <TableHead className="text-center border w-40">氏名</TableHead>
            <TableHead colSpan={3} className="text-center border">年休</TableHead>
            <TableHead colSpan={2} className="text-center border">残業</TableHead>
          </TableRow>
          <TableRow className="h-20">
            <TableHead colSpan={2} className="text-center border">行事</TableHead>
            <TableHead className="text-center border w-20 p-2">年間残り</TableHead>
            <TableHead className="text-center border w-20 p-2">当月予定</TableHead>
            <TableHead className="text-center border w-20 p-2">当月実績</TableHead>
            <TableHead className="text-center border w-20 p-2">当月予定</TableHead>
            <TableHead className="text-center border w-20 p-2">当月実績</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee, index) => {
            const zebraCss = index % 2 === 0 ? "h-20 bg-gray-200" : "h-20"
            return (
              <TableRow className={zebraCss} key={index}>
                <TableCell className="text-center border">{index+1}</TableCell>
                <TableCell className="text-center border">{employee.name}</TableCell>
                <TableCell className="text-center border">{employee.paid_holiday}</TableCell>
                <TableCell className="text-center border">{usualSchedule.filter(data => {
                  return startDate <= new Date(data.ymd)  && new Date(data.ymd) <= endDate &&
                    data.employee_code === employee.employee_code &&
                    data.schedule_types_id === 2;
                }).length}</TableCell>
                <TableCell className="text-center border">{usualSchedule.filter(data => {
                  return startDate <= new Date(data.ymd) &&
                    new Date(data.ymd) <= today &&
                    data.employee_code === employee.employee_code &&
                    data.schedule_types_id === 2;
                }).length}</TableCell>
                <TableCell className="text-center border">20</TableCell>
                <TableCell className="text-center border">
                  {`${Math.floor(sumOverTime(employee.employee_code,startDate)/60)}:${('00' + (sumOverTime(employee.employee_code,startDate)%60)).slice(-2)}`}</TableCell>
              </TableRow>
            )
          })}

        </TableBody>
        <TableFooter>
          <TableRow className="text-center h-20 bg-gray-400">
            <TableCell colSpan={3} className="text-center border">集計</TableCell>
            <TableCell className="border">{usualSchedule.filter(data => {
              return startDate <= new Date(data.ymd) && new Date(data.ymd) <= endDate && data.schedule_types_id === 2
            }).reduce((sum) => {
              return sum + 1;
            },0)}</TableCell>
            <TableCell className="border">{usualSchedule.filter(data => {
              return startDate <= new Date(data.ymd) && new Date(data.ymd) <= today && data.schedule_types_id === 2
            }).reduce((sum) => {
              return sum + 1;
            },0)}</TableCell>
            <TableCell className="border">{20*employees.length}</TableCell>
            <TableCell className="border">
              {`${Math.floor(allSumOverTime(startDate)/60)}:${('00' + (allSumOverTime(startDate)%60)).slice(-2)}`}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>

  )
}
