import { atom } from 'jotai';

export const dateAtom = atom<Date>(new Date)

const dt = new Date();
const selectDateArr:Date[] = [];
dt.setMonth(dt.getMonth() - 2);
for (let i = 0; i < 3; i++) {
  dt.setMonth(dt.getMonth() + 1)
  selectDateArr.push(new Date(dt))
}
export const selectDateAtom = atom<Date[]>(selectDateArr)

export interface employeeIF {
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
        {
          id:number,
          ymd:string,
          name:string
        }
      ]
}

export interface overtimeIF {
  start_date:string,
  start_ts:string,
  end_ts:string,
  before_overtime_flag:boolean,
  after_overtime_flag:boolean,
  overtime_minute:number
}

export interface scheduleIF {
  id:number;
  ymd:string;
  name:string;
}

export const employeesAtom = atom<employeeIF[]>([])

export interface groupInfoIF {
  group_name:string;
  work_codes:workCodesIF[]
}

export const groupInfoAtom = atom<groupInfoIF>()

export interface workCodesIF {
  work_code:string;
  start_time: string;
  end_time: string;
}

export const workCodesAtom = atom<workCodesIF[]>([])

export interface workDateIF {
  ymd:string;
  work_code:string;
}

export const workDateAtom = atom<workDateIF[]>([])

export interface eventsIF {
  ymd:string;
  event_name:string;
}

export const eventsAtom = atom<eventsIF[]>([]);

export interface scheduleTypeIF{
  id:number;
  name: string;
}

export const scheduleTypeAtom = atom<scheduleTypeIF[]>([]);

export interface workContentsIF {
  id: number;
  work_content:string;
  order_number:string;
  total_work_minute:number | null;
  sum_work_minute: number | null;
  work_hour_results:workHourResultIF[];
}

export type UpdateWorkContents = {
  id?: number;
  group_code?: string;
  work_content?:string;
  order_number?:string;
  total_work_minute?:number;
  sum_work_minute?: number | null;
  work_hour_results?:workHourResultIF[];
}

export interface workHourResultIF {
  ymd:string;
  work_minute:number;
}

export const workContentsAtom = atom<workContentsIF[]>([]);

export const updateWorkContentsAtom = atom<UpdateWorkContents[]>([]);

export interface sumWorkHourResultIF {
  work_contents_id: number;
    sum_work_minute: number;
}

export const workHourResultAtom = atom<workHourResultIF[]>([]);

export const sumWorkHourResultAtom = atom<sumWorkHourResultIF[]>([])

export interface workNameIF {
  name:string;
  work_code:string;
  bg_color:string;
}

export const workNameAtom = atom<workNameIF[]>([
  {name: '1直', work_code: '0001', "bg_color": "bg-[#EAEEC1]"},
  {name: '2直', work_code: '0002', "bg_color": "bg-[#D7DCEB]"},
  {name: '1直', work_code: '0011', "bg_color": "bg-[#EAEEC1]"},
  {name: '2直', work_code: '0012', "bg_color": "bg-[#D7DCEB]"},
  {name: '2直', work_code: '0013', "bg_color": "bg-[#D7DCEB]"},
  {name: '1直', work_code: '0020', "bg_color": "bg-[#EAEEC1]"},
  {name: '2直', work_code: '0021', "bg_color": "bg-[#D7DCEB]"},
])

export const orgCdAtom = atom<string>("");
export const leaderEmployeeCodeAtom = atom<string>("");

export const updateAtom = atom<boolean>(false);

export const refreshWorkContentsAtom = atom<number>(0);

export interface changeItemsIF {
  id:string
  employee_code:string;
  start_date:string;
  ts:string;
  start_end:string;
}

export const changeItemsAtom = atom<changeItemsIF[]>([])

export interface contentsColorIF {
  firstWork:string;
  secondWork:string;
  zebra:string;
  usualSchedule_holiday:string;
  usualSchedule_other:string;
  overtime_bg:string;
}

export const CONTENTS_COLOR:contentsColorIF = {
  firstWork:"bg-[#EAEEC1]",
  secondWork:"bg-[#D7DCEB]",
  zebra:"#EAF7EA",
  usualSchedule_holiday:"#F6B1B6",
  usualSchedule_other:"#F4F4F4",
  overtime_bg:"#F5FFD5"
}
