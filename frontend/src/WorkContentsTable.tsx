import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx"

//サンプルデータ
import {workContents} from "@/Data.ts";
import {workHourResult} from "@/Data.ts";

//CSS
const headerCss = "text-center border"
const contentsCss = "text-center border p-1"

function restWorkHour(id : number, totalTime : number) {
  return (totalTime * 60) - workHourResult.filter(result => {
    return result.work_contents_id === id
  }).reduce((sum, time) => {
    return sum + time.work_minute;
  },0)
}

function totalWorkHour(id : number) {
  return workHourResult.filter(result => {
    return result.work_contents_id === id;
  }).reduce((sum, time) => {
    return sum + time.work_minute
  },0)
}

export function WorkContentsTable() {
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
          {workContents.map((content => {
            const viewTime = restWorkHour(content.id, content.total_work_minute)
            const totalMinute = totalWorkHour(content.id)
            return (
              <TableRow className="h-10">
                <TableCell className={contentsCss}>{content.work_content}</TableCell>
                <TableCell className={contentsCss}>{content.order_number}</TableCell>
                <TableCell className={contentsCss}>{content.total_work_minute}</TableCell>
                <TableCell className={contentsCss}>{`${Math.floor(viewTime/60)}:${('00' + (viewTime%60)).slice(-2)}`}</TableCell>
                <TableCell className={contentsCss}>{`${Math.floor(totalMinute/60)}:${('00' + (totalMinute%60)).slice(-2)}`}</TableCell>
              </TableRow>
            )
          }))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  )
}