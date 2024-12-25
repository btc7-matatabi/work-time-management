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

import {useContext} from "react";
import {dateContext} from "./App.tsx";
import {selectDateContext} from "./App.tsx";

//サンプルデータ
import {workCode} from "./Data.ts";
import {workName} from "./Data.ts";

export function Header(){
  const {date, setDate} = useContext(dateContext)
  const {selectDate} = useContext(selectDateContext)

  return (
    <div className="flex gap-3">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        LT442組
      </h2>
      <Select onValueChange={(value) => setDate(new Date(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`${date.getFullYear()}年${date.getMonth() + 1}月`}/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selectDate.map((dt) => {
              const inputDate = `${dt.getFullYear()}年${dt.getMonth() + 1}月`;
              return <SelectItem value={dt.toString()} key={dt.toString()}>{inputDate}</SelectItem>
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {workName[0].name}
      </h3>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {`${workCode.filter(val => val.work_code === workName[0].work_code)[0].start_time}~${workCode.filter(val => val.work_code === workName[0].work_code)[0].end_time}`}
      </h3>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {workName[1].name}
      </h3>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {`${workCode.filter(val => val.work_code === workName[1].work_code)[0].start_time}~${workCode.filter(val => val.work_code === workName[1].work_code)[0].end_time}`}
      </h3>
      <Button className="bg-gray-500">始業 終業時刻一覧へ</Button>
    </div>
  )
}