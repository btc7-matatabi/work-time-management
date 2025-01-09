import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx"

//サンプルデータ
import {useAtomValue} from "jotai/index";
import {sumWorkHourResultAtom, sumWorkHourResultIF, workContentsAtom, workHourResultIF} from "@/atom.ts";

//CSS
const headerCss = "text-center border"
const contentsCss = "text-center border p-1"

function restWorkHour(id: number, sumWorkHourResult:sumWorkHourResultIF[]) {
  console.log(sumWorkHourResult)
  const result = sumWorkHourResult.filter(val => val.work_contents_id === id);
  if (result.length === 1) {
    return result[0].sum_work_minute;
  } else {
    return 0;
  }
}

function totalWorkHour(workHourResult:workHourResultIF[]) {
  return workHourResult.reduce((sum, time) => {
    return sum + time.work_minute
  },0)
}

export function WorkContentsTable() {

  const workContents = useAtomValue(workContentsAtom);
  const sumWorkHourResult = useAtomValue(sumWorkHourResultAtom);

  return(
    <div className="flex-shrink-0">
      <Table className="bg-gray-50 text-xl overflow-hidden">
        <TableHeader>
          <TableRow className="h-12">
            <TableHead className={`${headerCss} w-64`}>作業内容</TableHead>
            <TableHead className={`${headerCss} w-64`}>管理番号</TableHead>
            <TableHead className={`${headerCss} w-28`}>全工数</TableHead>
            <TableHead className={`${headerCss} w-28`}>残工数</TableHead>
            <TableHead className={`${headerCss} w-28`}>今月合計</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workContents.map((content, index) => {
            const viewTime = restWorkHour(content.id,sumWorkHourResult)
            const totalMinute = totalWorkHour(content.work_hour_results)
            return (
              <TableRow className="h-10" key={index}>
                <TableCell className={contentsCss}>{content.work_content}</TableCell>
                <TableCell className={contentsCss}>{content.order_number}</TableCell>
                <TableCell className={contentsCss}>{content.total_work_minute}</TableCell>
                <TableCell
                  className={contentsCss}>{`${Math.floor(viewTime / 60)}:${('00' + (viewTime % 60)).slice(-2)}`}</TableCell>
                <TableCell
                  className={contentsCss}>{`${Math.floor(totalMinute / 60)}:${('00' + (totalMinute % 60)).slice(-2)}`}</TableCell>
              </TableRow>
            )
          })}
          {[...Array(10-workContents.length)].map(val => {
            return (
              <TableRow className="h-10" key={val}>
                <TableCell className={contentsCss}></TableCell>
                <TableCell className={contentsCss}></TableCell>
                <TableCell className={contentsCss}></TableCell>
                <TableCell className={contentsCss}></TableCell>
                <TableCell className={contentsCss}></TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  )
}