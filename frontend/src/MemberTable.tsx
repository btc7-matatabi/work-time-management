import {Table, TableBody, TableHead, TableFooter, TableHeader, TableRow, TableCell} from "@/components/ui/table.tsx";
import {useAtom} from "jotai";
import {dateAtom} from "@/atom.ts";

//サンプルデータ
import {employees} from "@/Data.ts";
import {usualSchedule} from "@/Data.ts";
import {attendanceTime} from "@/Data.ts";
const today = new Date('2024/12/6')



function sumOverTime(employeeCode:string) {
  return attendanceTime.filter(data => {
    return new Date(data.start_date) <= today &&
      data.employee_code === employeeCode
  }).reduce((sum, val) => {
    return sum + val.overtime_minute
  },0)
}

function allSumOverTime() {
  return attendanceTime.filter(data => {
    return new Date(data.start_date) <= today
  }).reduce((sum,val) => {
    return sum + val.overtime_minute;
  },0)
}

export function MemberTable() {
  const [date] = useAtom(dateAtom)

  const year : number = date.getFullYear();
  const month : number = date.getMonth()+1;

  const startDate : Date = new Date(year, month - 1, 1);
  const endDate : Date = new Date(year, month, 0);

  const allOverTime = allSumOverTime()

  return(
    <div className="flex-shrink-0">
      <Table className="bg-gray-50 text-xl">
        <TableHeader>
          <TableRow className="h-12">
            <TableHead className="text-center border w-12">No</TableHead>
            <TableHead className="text-center border w-52">氏名</TableHead>
            <TableHead colSpan={3} className="text-center border">年休</TableHead>
            <TableHead colSpan={2} className="text-center border">残業</TableHead>
          </TableRow>
          <TableRow className="h-14">
            <TableHead colSpan={2} className="text-center border">行事</TableHead>
            <TableHead className="text-center border w-[118.4px] p-2">年間残り</TableHead>
            <TableHead className="text-center border w-[118.4px] p-2">当月予定</TableHead>
            <TableHead className="text-center border w-[118.4px] p-2">当月実績</TableHead>
            <TableHead className="text-center border w-[118.4px] p-2">当月予定</TableHead>
            <TableHead className="text-center border w-[118.4px] p-2">当月実績</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee, index) => {
            const zebraCss = index % 2 === 0 ? "h-14 bg-gray-200" : "h-14"
            const sumTime= sumOverTime(employee.employee_code)
            return (
              <TableRow className={zebraCss} key={index}>
                <TableCell className="text-center border">{index+1}</TableCell>
                <TableCell className="text-center border">{employee.name}</TableCell>
                <TableCell className="text-center border">{employee.paid_holiday}</TableCell>
                <TableCell className="text-center border">{usualSchedule.filter(data => {
                  return data.employee_code === employee.employee_code &&
                    data.schedule_types_id === 2;
                }).length}</TableCell>
                <TableCell className="text-center border">{usualSchedule.filter(data => {
                  return new Date(data.ymd) <= today &&
                    data.employee_code === employee.employee_code &&
                    data.schedule_types_id === 2;
                }).length}</TableCell>
                <TableCell className="text-center border">20</TableCell>
                <TableCell className="text-center border">
                  {`${Math.floor(sumTime/60)}:${('00' + (sumTime%60)).slice(-2)}`}</TableCell>
              </TableRow>
            )
          })}

        </TableBody>
        <TableFooter>
          <TableRow className="text-center h-14 bg-gray-400">
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
              {`${Math.floor(allOverTime/60)}:${('00' + (allOverTime%60)).slice(-2)}`}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>

  )
}
