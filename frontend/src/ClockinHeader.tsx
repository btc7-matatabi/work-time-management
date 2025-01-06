import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {workCode, workName} from "@/Data.ts";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useContext} from "react";
import {dateContext, selectDateContext} from "@/App.tsx";

export function ClockinHeader() {

  const {date, setDate} = useContext(dateContext)
  const {selectDate} = useContext(selectDateContext)

  return (
    <div className="flex">
      <h2 className="scroll-m-20 p-6 text-2xl font-semibold tracking-tight first:mt-0">
        LT135組
      </h2>
      <h3 className="scroll-m-20 p-6 text-xl font-semibold tracking-tight">
        始業 終業時刻一覧
      </h3>
      <div className="p-6">
        <Select onValueChange={(value) => setDate(new Date(value))}>
          <SelectTrigger className="w-[180px] text-xl bg-gray-50">
            <SelectValue placeholder={`${date.getFullYear()}年${date.getMonth() + 1}月`}/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {selectDate.map((dt) => {
                const inputDate = `${dt.getFullYear()}年${dt.getMonth() + 1}月`;
                return <SelectItem value={dt.toLocaleDateString('sv-SE')} key={dt.toString()}
                                   className="text-2xl">{inputDate}</SelectItem>
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-5 mb-5 p-1 bg-yellow-300 rounded-l-lg">
        {workName[0].name}
      </h3>
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-5 mb-5 mr-5 p-1 bg-gray-50  rounded-r-lg">
        {`${workCode.filter(val => val.work_code === workName[0].work_code)[0].start_time}~${workCode.filter(val => val.work_code === workName[0].work_code)[0].end_time}`}
      </h3>
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-5 mb-5 p-1 bg-green-300 rounded-l-lg">
        {workName[1].name}
      </h3>
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-5 mb-5 p-1 bg-gray-50  rounded-r-lg">
        {`${workCode.filter(val => val.work_code === workName[1].work_code)[0].start_time}~${workCode.filter(val => val.work_code === workName[1].work_code)[0].end_time}`}
      </h3>
      <Link to="/">
        <Button className="bg-gray-500 m-6 text-xl">戻る</Button>
      </Link>
    </div>
  )
}