import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {useAtomValue} from "jotai/index";
import {CONTENTS_COLOR, employeesAtom} from "@/atom.ts";

export function ClockinMembers() {

  const employees = useAtomValue(employeesAtom)

  const headerCss = "text-center border"
  return (
    <div className="flex-shrink-0">
      <Table className="bg-gray-50 text-xl">
          <TableHeader>
            <TableRow className="h-12">
              <TableHead className={`${headerCss} w-10`}>No.</TableHead>
              <TableHead className={`${headerCss} w-48`}>氏名</TableHead>
            </TableRow>
          </TableHeader>
        <TableBody>
          {employees.map((employee, index) => {
            const zebraCss = index % 2 === 0 ? `h-[74px] bg-[${CONTENTS_COLOR.zebra}]` : "h-[74px]"
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