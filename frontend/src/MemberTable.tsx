import {Table, TableBody, TableHead, TableFooter, TableHeader, TableRow, TableCell} from "@/components/ui/table.tsx";

//サンプルデータ
import {employees} from "@/Data.ts";


export function MemberTable() {
  return(
    <div>
      <Table>
        <TableHeader>
          <TableRow className="h-10">
            <TableHead className="text-center border w-12">No</TableHead>
            <TableHead className="text-center border w-36">氏名</TableHead>
            <TableHead colSpan={3} className="text-center border">年休</TableHead>
            <TableHead colSpan={2} className="text-center border">残業</TableHead>
          </TableRow>
          <TableRow className="h-10">
            <TableHead colSpan={2} className="text-center border">行事</TableHead>
            <TableHead className="text-center border w-16 p-2">年間残り</TableHead>
            <TableHead className="text-center border w-16 p-2">当月予定</TableHead>
            <TableHead className="text-center border w-16 p-2">当月実績</TableHead>
            <TableHead className="text-center border w-16 p-2">当月予定</TableHead>
            <TableHead className="text-center border w-16 p-2">当月実績</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee, index) => {
            return (
              <TableRow className="h-12">
                <TableCell className="text-center border">{index+1}</TableCell>
                <TableCell className="text-center border">{employee.name}</TableCell>
                <TableCell className="text-center border">{employee.paid_holiday}</TableCell>
              </TableRow>
            )
          })}

        </TableBody>
        <TableFooter>
          <TableRow className="text-center h-10">
            <TableCell colSpan={3} className="text-center border">集計</TableCell>
            <TableCell className="border"></TableCell>
            <TableCell className="border"></TableCell>
            <TableCell className="border"></TableCell>
            <TableCell className="border"></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>

  )
}
