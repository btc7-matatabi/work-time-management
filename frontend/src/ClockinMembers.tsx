import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {employees} from "@/Data.ts";

export function ClockinMembers() {

  const headerCss = "text-center border "
  return (
    <div className="flex-shrink-0">
      <Table className="bg-gray-50 text-2xl">
          <TableHeader>
            <TableRow className="h-14">
              <TableHead className={`${headerCss} w-16`}>No.</TableHead>
              <TableHead className={`${headerCss} w-64`}>氏名</TableHead>
            </TableRow>
          </TableHeader>
        <TableBody>
          {employees.map((employee, index) => {
            const zebraCss = index % 2 === 0 ? "h-24 bg-gray-200" : "h-24"
            return (
              <TableRow className={zebraCss} key={index}>
                <TableCell className="text-center border">{index+1}</TableCell>
                <TableCell className="text-center border">{employee.name}</TableCell>
              </TableRow>
            )
          })}

        </TableBody>
        </Table>
    </div>
  )
}