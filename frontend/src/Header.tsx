// import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {useContext} from "react";
import {dateContext} from "./App.tsx";
import {selectDateContext} from "./App.tsx";

export function Header(){
  const {date, setDate} = useContext(dateContext)
  const {selectDate} = useContext(selectDateContext)

  return (
    <div className="flex gap-3">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        LT441組
      </h2>
      <Select onValueChange={(value) => setDate(new Date(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`${date.getFullYear()}年${date.getMonth()+1}月`}/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            { selectDate.map((dt) => {
              const inputDate = `${dt.getFullYear()}年${dt.getMonth() + 1}月`;
              console.log("jsx内", inputDate);
              return <SelectItem value={dt.toString()} key={dt.toString()}>{inputDate}</SelectItem>
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}