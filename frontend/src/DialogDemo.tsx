import {Button} from "@/components/ui/button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Label} from "@/components/ui/label"
import {employees, scheduleType, usualSchedule, workCode} from "@/Data.ts";
import {DatePickerWithRange} from "@/DatePickerWithRange.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {DateRange} from "react-day-picker";
import {format} from "date-fns";

function scheduleRegistration(setOpen:Dispatch<SetStateAction<boolean>>, selectMember:string, date:DateRange | undefined, selectSchedule:string, selectWorkCode:string, description:string) {

  const inputDate = date?.from

  function inputItem(inputDate:Date) {

    interface Obj {
      employee_code: string;
      ymd: string;
      schedule_types_id: number;
      work_code?: string;
      schedule_description?: string;
    }

    const inputObj:Obj = {
      employee_code: selectMember,
      ymd: format(inputDate, "yyyy/MM/dd"),
      schedule_types_id: Number(selectSchedule)
    }

    if (selectWorkCode !== "") {
      inputObj.work_code = selectWorkCode;
    }

    if (description !== "") {
      inputObj.schedule_description = description;
    }

    usualSchedule.push(inputObj);
  }

  if (inputDate !== undefined && date?.to === undefined) {
    inputItem(inputDate);
  } else if(inputDate !== undefined && date?.to !== undefined) {
    while (inputDate <= date.to) {
      inputItem(inputDate);
      inputDate.setDate(inputDate.getDate() + 1);
    }
  }
  setOpen(false);
}

type Props = {
  dialogEmployee: string
  dialogDate: Date
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function DialogDemo({dialogEmployee, dialogDate, setOpen}: Props) {

  const [date, setDate] = useState<DateRange | undefined>()
  const [selectMember, setSelectMember] = useState<string>(dialogEmployee);
  const [selectSchedule, setSelectSchedule] = useState<string>("2");
  const [selectWorkCode, setSelectWorkCode] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setSelectMember(dialogEmployee)
  }, [dialogEmployee]);

  useEffect(() => {
    setDate({
      from: new Date(dialogDate)
    })
  }, [dialogDate]);

  const labelCss = "text-xl"
  const defaultMember = dialogEmployee !== "" ? employees.filter(val => val.employee_code === dialogEmployee)[0].name : "";

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl text-center">予定登録</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Label className={labelCss}>氏名</Label>
        <Select onValueChange={setSelectMember}>
          <SelectTrigger className="w-80 col-span-3 text-lg bg-white">
            <SelectValue placeholder={defaultMember}/>
          </SelectTrigger>
          <SelectContent>
            {employees.map(employee => {
              return <SelectItem value={employee.employee_code} className="text-lg">{employee.name}</SelectItem>
            })}
          </SelectContent>
        </Select>
        <Label className={labelCss}>日時</Label>
        <DatePickerWithRange date={date} setDate={setDate}/>
        <Label className={labelCss}>予定内容</Label>
        <Select onValueChange={setSelectSchedule}>
          <SelectTrigger className="w-80 col-span-3 text-lg bg-white">
            <SelectValue placeholder={"年休"}/>
          </SelectTrigger>
          <SelectContent>
            {scheduleType.map(val => {
              return <SelectItem value={String(val.id)} className="text-lg">{val.name}</SelectItem>
            })}
          </SelectContent>
        </Select>
        <Label className={labelCss}>時間コード</Label>
        <Select onValueChange={setSelectWorkCode}>
          <SelectTrigger className="w-80 col-span-3 text-lg bg-white">
            <SelectValue placeholder={""}/>
          </SelectTrigger>
          <SelectContent>
            {workCode.map(val => {
              return <SelectItem value={val.work_code} className="text-lg">{val.work_code}</SelectItem>
            })}
          </SelectContent>
        </Select>
        <Label className={labelCss}>備考</Label>
        <Textarea className="text-2xl col-span-3 bg-white" onChange={e => setDescription(e.target.value)}/>
      </div>
      <DialogFooter>
        <Button type="button" className="bg-blue-500 text-2xl h-10" onClick={() => scheduleRegistration(setOpen, selectMember, date, selectSchedule, selectWorkCode, description)}>登録する</Button>
      </DialogFooter>
    </DialogContent>
  )
}