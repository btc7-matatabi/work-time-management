type SaveAT = {
  employee_code: string;
  start_date: string;
  start_ts?: string;
  end_ts?: string;
  before_overtime_flag?: boolean;
  after_overtime_flag?: boolean;
  overtime_minute: number;
};
type ClockInCheck = {
  id: number;
  start_date: string;
  start_ts: string;
  end_ts: string;
};

type StartEndDate = {
  startDate: Date;
  endDate: Date;
};

type Overtime = {
  start_date: string;
  start_ts: string;
  end_ts: string;
  before_overtime_flag: boolean;
  after_overtime_flag: boolean;
  overtime_minute: number;
};

type MembersOvertime = {
  name: string;
  employee_code: string;
  rest_paid_holiday: number;
  overtimes: Overtime[];
  schedules: { ymd: string; name: string }[];
};

type WorkContent = {
  id: number;
  group_code: string;
  work_content: string;
  order_number: string;
  total_work_minute: number;
};

type WorkContentReturn = {
  work_content: string;
  order_number: string;
  total_work_minute: number;
  work_hour_results: { ymd: string; work_minute: number }[];
};

type WorkContentCreate= {
  group_code: string;
  work_content: string;
  order_number?: string;
  total_work_minute?: number;
  work_hour_results?: { ymd: string; work_minute: number }[];
};

type UnusualSchedule = {
  employee_code: string;
  ymd: string;
  schedule_types_id: number;
  work_code: string;
  schedule_description: string;
};
