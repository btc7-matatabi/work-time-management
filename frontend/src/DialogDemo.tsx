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
import {employees, scheduleType, workCode} from "@/Data.ts";
import {DatePickerWithRange} from "@/DatePickerWithRange.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Dispatch, SetStateAction, useContext} from "react";
import {dialogEmployeeContext} from "@/App.tsx";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function DialogDemo({setOpen}: Props) {

  const {dialogEmployee} = useContext(dialogEmployeeContext);

  const labelCss = "text-xl"

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl text-center">予定登録</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Label className={labelCss}>氏名</Label>
        <Select>
          <SelectTrigger className="w-80 col-span-3 text-lg bg-white">
            <SelectValue placeholder={dialogEmployee}/>
          </SelectTrigger>
          <SelectContent>
            {employees.map(employee => {
              return <SelectItem value={employee.employee_code} className="text-lg">{employee.name}</SelectItem>
            })}
          </SelectContent>
        </Select>
        <Label className={labelCss}>日時</Label>
        <DatePickerWithRange/>
        <Label className={labelCss}>予定内容</Label>
        <Select>
          <SelectTrigger className="w-80 col-span-3 text-lg bg-white">
            <SelectValue placeholder={"年休"}/>
          </SelectTrigger>
          <SelectContent>
            {scheduleType.map(val => {
              return <SelectItem value={val.name} className="text-lg">{val.name}</SelectItem>
            })}
          </SelectContent>
        </Select>
        <Label className={labelCss}>時間コード</Label>
        <Select>
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
        <Textarea className="text-2xl col-span-3 bg-white"/>
      </div>
      <DialogFooter>
        <Button type="button" className="bg-blue-500 text-2xl h-10" onClick={() => setOpen(false)}>登録する</Button>
      </DialogFooter>
    </DialogContent>
  )
}