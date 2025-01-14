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
import {DatePickerWithRange} from "@/DatePickerWithRange.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {DateRange} from "react-day-picker";
import {format} from "date-fns";
import {useAtomValue, useSetAtom} from "jotai";
import {employeesAtom, scheduleTypeAtom, updateAtom, workCodesAtom} from "@/atom.ts";

function scheduleRegistration(id:number | undefined, setOpen:Dispatch<SetStateAction<boolean>>, selectMember:string, date:DateRange | undefined, selectSchedule:string, selectWorkCode:string, description:string, setUpdate:Dispatch<SetStateAction<boolean>>) {

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

    if (id === undefined) {
      return  {
        method : "POST",
        body : JSON.stringify(inputObj),
        headers: {
          "Content-Type": "application/json",
        }};
    } else {
      return {
        method : "PUT",
        body: JSON.stringify(inputObj),
        headers: {
          "Content-Type": "application/json",
        }};
    }

  }

  if (id === undefined) {
    if (inputDate !== undefined && date?.to === undefined) {
      fetch(`${process.env.VITE_URL}/unusual-schedules`, inputItem(inputDate))
        .then(() => setUpdate(true))
    } else if(inputDate !== undefined && date?.to !== undefined) {
      while (inputDate <= date.to) {
        fetch(`${process.env.VITE_URL}/unusual-schedules`, inputItem(inputDate))
          .then(() => setUpdate(true))
        inputDate.setDate(inputDate.getDate() + 1);
      }
    }
  } else {
    if (inputDate !== undefined) {
      fetch(`${process.env.VITE_URL}/unusual-schedules/${id}`, inputItem(inputDate))
        .then(() => setUpdate(true))
    }
  }
  setOpen(false);
}

function scheduleDelete(id:number,setOpen:Dispatch<SetStateAction<boolean>>,setUpdate:Dispatch<SetStateAction<boolean>>) {
  const params = {method : "DELETE"};
  fetch(`${process.env.VITE_URL}/unusual-schedules/${id}`, params)
    .then(() => {
      setUpdate(true);
      setOpen(false)});
}

type Props = {
  dialogEmployee: string;
  dialogDate: Date;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function DialogDemo({dialogEmployee, dialogDate, setOpen}: Props) {

  const [date, setDate] = useState<DateRange | undefined>()
  const [selectMember, setSelectMember] = useState<string>(dialogEmployee);
  const [selectSchedule, setSelectSchedule] = useState<string>("2");
  const [selectWorkCode, setSelectWorkCode] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const employees = useAtomValue(employeesAtom)
  const workCodes = useAtomValue(workCodesAtom)
  const scheduleType = useAtomValue(scheduleTypeAtom)
  const setUpdate = useSetAtom(updateAtom);

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
  let defaultSchedule = "年休";

  const selectItem = employees.find(employee => employee.employee_code === dialogEmployee)
    ?.schedules.filter(schedule => schedule.ymd === format(dialogDate,"yyyy-MM-dd"))[0]
  if (selectItem?.id !== undefined) {
    defaultSchedule = selectItem.name;
  }

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
            <SelectValue placeholder={defaultSchedule}/>
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
            {workCodes.map(val => {
              return <SelectItem value={val.work_code} className="text-lg">{val.work_code}</SelectItem>
            })}
          </SelectContent>
        </Select>
        <Label className={labelCss}>備考</Label>
        <Textarea className="text-2xl col-span-3 bg-white" onChange={e => setDescription(e.target.value)}/>
      </div>
      <DialogFooter>
        {selectItem?.id !== undefined && <Button type="button" className="bg-gray-500 text-2xl h-10 w-40 mr-10" onClick={() => scheduleDelete(selectItem?.id,setOpen,setUpdate)}>削除</Button>}
        <Button type="button" className="bg-blue-500 text-2xl h-10 w-40" onClick={() => scheduleRegistration(selectItem?.id, setOpen, selectMember, date, selectSchedule, selectWorkCode, description, setUpdate)}>登録する</Button>
      </DialogFooter>
    </DialogContent>
  )
}