import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx"
import {useAtom} from "jotai";
import {dateAtom, workContentsAtom, workDateAtom, workHourResultIF} from "@/atom.ts";
import {useAtomValue} from "jotai/index";

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

function setResult(startDate : Date, endDate : Date, workHourResult:workHourResultIF[]) {
  resultTime = [];
  while (startDate <= endDate) {
    const pickupData = workHourResult.filter(result => {
      return  new Date(result.ymd).toDateString() === startDate.toDateString()
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
  const [date] = useAtom(dateAtom)
  const workDate = useAtomValue(workDateAtom);
  const workContents = useAtomValue(workContentsAtom);

  const year : number = date.getFullYear();
  const month : number = date.getMonth()+1;

  const startDate : Date = new Date(year, month - 1, 1);
  const endDate : Date = new Date(year, month, 0);
  setCalender(new Date(startDate),new Date(endDate));

  return (
    <div className="flex-shrink-0 w-max">
      <Table className="bg-gray-50 text-xl">
        <TableHeader>
          <TableRow className="h-12">
            {calendarData.map(date => {
              const pickupWorkDate = workDate.filter(val => new Date(val.ymd).toDateString() === date.toDateString())
              if (pickupWorkDate.length === 1) {
                if (pickupWorkDate[0].work_code === "0011") {
                  return <TableHead key={date.getDate()}
                                    className="text-center border w-16 bg-yellow-300">{date.getDate()}</TableHead>
                } else {
                  return <TableHead key={date.getDate()}
                                    className="text-center border w-16 bg-green-300">{date.getDate()}</TableHead>
                }
              } else {
                return <TableHead key={date.getDate()}
                                  className="text-center border w-16 text-red-600">{date.getDate()}</TableHead>
              }
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            workContents.map((content,index) => {
              setResult(new Date(startDate),new Date(endDate), content.work_hour_results);
              return (
              <TableRow key={index} className="h-10">
                {resultTime.map((time, index) => {
                  if (time > 0) {
                    return (
                      <TableCell className="text-center border p-1" key={index}>
                        {`${Math.floor(time/60)}:${('00' + (time%60)).slice(-2)}`}
                      </TableCell>
                    )
                  } else {
                    return (
                      <TableCell className="text-center border p-1" key={index}></TableCell>
                    )
                  }
                })}
              </TableRow>
              )})
          }
          {[...Array(10-workContents.length)].map(val => {
            return(
              <TableRow key={val} className="h-10">
                {[...Array(((endDate.getTime()-startDate.getTime()) / 1000 / 60 / 60 / 24) + 1)].map(val => {
                  return <TableCell className="text-center border p-1" key={val}></TableCell>
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}