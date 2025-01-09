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
  ymd:string,
  name:string
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
  total_work_minute:number;
  work_hour_results:workHourResultIF[];
}

export interface workHourResultIF {
  ymd:string;
  work_minute:number;
}

export const workContentsAtom = atom<workContentsIF[]>([]);

export interface sumWorkHourResultIF {
  work_contents_id: number;
    sum_work_minute: number;
}

export const sumWorkHourResultAtom = atom<sumWorkHourResultIF[]>([])

export interface workNameIF {
  name:string;
  work_code:string;
  bg_color:string;
}

export const workNameAtom = atom<workNameIF[]>([
  {name: '1直', work_code: '0001', "bg_color": "bg-yellow-300"},
  {name: '2直', work_code: '0002', "bg_color": "bg-green-300"},
  {name: '1直', work_code: '0011', "bg_color": "bg-yellow-300"},
  {name: '2直', work_code: '0012', "bg_color": "bg-green-300"},
  {name: '2直', work_code: '0013', "bg_color": "bg-green-300"},
])

export const orgCdAtom = atom<string>("");
export const leaderEmployeeCodeAtom = atom<string>("");

export const updateAtom = atom<boolean>(false);