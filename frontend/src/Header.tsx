// import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {Link} from "react-router-dom";
import {useAtom, useAtomValue} from "jotai";

//サンプルデータ
import {dateAtom, groupInfoAtom, selectDateAtom, workNameAtom} from "@/atom.ts";

export function Header(){
  const [date, setDate] = useAtom(dateAtom)
  const selectDate = useAtomValue(selectDateAtom)
  const groupInfo = useAtomValue(groupInfoAtom)
  const workName = useAtomValue(workNameAtom)

  return (
    <div className="flex fixed z-50 bg-slate-300 w-full">
      <h2 className="scroll-m-20 p-6 text-2xl font-semibold tracking-tight first:mt-0">
        {groupInfo?.group_name}
      </h2>
      <div className="p-6">
        <Select onValueChange={(value) => setDate(new Date(value))}>
          <SelectTrigger className="w-[180px] text-xl bg-gray-50">
            <SelectValue placeholder={`${date.getFullYear()}年${date.getMonth() + 1}月`}/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {selectDate.map((dt) => {
                const inputDate = `${dt.getFullYear()}年${dt.getMonth() + 1}月`;
                return <SelectItem value={dt.toLocaleDateString('sv-SE')} key={dt.toString()} className="text-2xl">{inputDate}</SelectItem>
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-5 mb-5 p-1 bg-yellow-300 rounded-l-lg">
        {workName[0].name}
      </h3>
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-5 mb-5 mr-5 p-1 bg-gray-50  rounded-r-lg">
        {`${groupInfo?.work_codes[0].start_time.slice(0,5)}~${groupInfo?.work_codes[0].end_time.slice(0,5)}`}
      </h3>
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-5 mb-5 p-1 bg-green-300 rounded-l-lg">
        {workName[1].name}
      </h3>
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-5 mb-5 p-1 bg-gray-50  rounded-r-lg">
        {`${groupInfo?.work_codes[2]?.start_time.slice(0,5)}~${groupInfo?.work_codes[2].end_time.slice(0,5)}`}
      </h3>
      <Link to="/stamp-list">
        <Button className="bg-gray-500 m-6 text-xl">始業 終業時刻一覧へ</Button>
      </Link>
    </div>
  )
}