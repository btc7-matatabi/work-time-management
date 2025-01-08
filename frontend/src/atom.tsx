import { atom } from 'jotai';

export const dateAtom = atom<Date>(new Date())

const dt = new Date();
const selectDateArr:Date[] = [];
dt.setMonth(dt.getMonth() - 2);
for (let i = 0; i < 3; i++) {
  dt.setMonth(dt.getMonth() + 1)
  selectDateArr.push(new Date(dt))
}
export const selectDateAtom = atom<Date[]>(selectDateArr)

interface employeeIF {
      name:string;
      employee_code:string;
      rest_paid_holiday:number;
      overtimes:[
        {
          start_date:string,
          start_ts:string,
          end_ts:string,
          before_overtime_flag:boolean,
          after_overtime_flag:boolean,
          overtime_minute:number
        }
      ],
      schedules:[
        ymd:string,
        name:string
      ]
}

export const employeesAtom = atom<employeeIF[]>([])
