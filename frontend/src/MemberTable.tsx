import {Table, TableBody, TableHead, TableFooter, TableHeader, TableRow, TableCell} from "@/components/ui/table.tsx";
import {employeeIF, employeesAtom, overtimeIF} from "@/atom.ts";

//サンプルデータ
import {useAtomValue} from "jotai/index";
const today = new Date('2024/12/6')



function sumOverTime(overtimes:overtimeIF[]) {
  return overtimes.filter(data => {
    return new Date(data.start_date) <= today
  }).reduce((sum, val) => {
    return sum + val.overtime_minute
  },0)
}

function allSumOverTime(employees:employeeIF[]) {

  return employees.map(data => {
    return data.overtimes.filter(data => {
      return new Date(data.start_date) <= today
    }).reduce((sum,val) => {
      return sum + val.overtime_minute;
    },0)
  }).reduce((sum, val) => sum + val,0)
}

export function MemberTable() {
  const employees = useAtomValue(employeesAtom)

  const allOverTime = allSumOverTime(employees)

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
            const zebraCss = index % 2 === 0 ? `h-14 bg-[#EAF7EA]` : "h-14"
            const sumTime= sumOverTime(employee.overtimes)
            return (
              <TableRow className={zebraCss} key={index}>
                <TableCell className="text-center border">{index+1}</TableCell>
                <TableCell className="text-center border">{employee.name}</TableCell>
                <TableCell className="text-center border">{employee.rest_paid_holiday}</TableCell>
                <TableCell className="text-center border">{employee.schedules.filter(data => {
                  return data.name === "年休";
                }).length}</TableCell>
                <TableCell className="text-center border">{employee.schedules.filter(data => {
                  return new Date(data.ymd) <= today && data.name === "年休";
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
            <TableCell className="border">{employees.map(employee => {
              return employee.schedules.filter(data => {
                return data.name === "年休"
              }).length
            }).reduce((sum,val) => {
              return sum + val;
            },0)}</TableCell>
            <TableCell className="border">{employees.map(employee => {
              return employee.schedules.filter(data => {
                return new Date(data.ymd) <= today && data.name === "年休"
              }).length
            }).reduce((sum,val) => {
              return sum + val;
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
