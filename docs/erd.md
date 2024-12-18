Table m_employees {
employee_code varchar(7) [primary key]
name varchar(50)
group_code varchar(5)
position_id integer
}

Table m_work_positions {
id integer [primary key]
name varchar(10)
}

Table m_groups {
group_code varchar(5) [primary key]
group_name varchar(100)
work_types_id integer
}

Table m_work_codes {
work_code varchar(4) [primary key]
start_time timestamp
end_time timestamp
}

Table m_working_dates {
id integer [primary key]
ymd date
work_types_id integer
work_code varchar(4)
}

Table m_work_types {
id integer [primary key]
work_type varchar(10)
}

Table work_contents {
id integer [primary key]
group_code varchar(5)
work_content varchar(50)
deadline_ymd date
order_group_code varchar(5)
order_number varchar
total_work_hour integer
}

Table work_hour_results {
id integer [primary key]
work_contents_id integer
ymd date
work_hour integer
}

Table attendance_times {
id integer [primary key]
employee_code varchar(7)
start_date date
start_time timestamp
end_time timestamp
before_overtime_flag boolean
after_overtime_flag boolean
overtime_hour time
}

Table group_events {
id integer [primary key]
group_code varchar(5)
ymd date
event_name varchar(100)
}

Table unusual_schedules {
id integer [primary key]
employee_code varchar(7)
ymd date
schedule_types_id integer
work_code varchar(4)
}

Table m_schedule_types {
id integer [primary key]
name varchar(8)
}

Ref: m_employees.employee_code < attendance_times.employee_code

Ref: m_groups.group_code < work_contents.group_code

Ref: m_groups.group_code < group_events.group_code

Ref: work_contents.id < work_hour_results.work_contents_id

Ref: m_employees.group_code > m_groups.group_code

Ref: m_work_codes.work_code < m_working_dates.work_code

Ref: m_schedule_types.id < unusual_schedules.schedule_types_id

Ref: m_work_codes.work_code < unusual_schedules.work_code

Ref: m_groups.group_code < work_contents.order_group_code

Ref: m_work_types.id < m_groups.work_types_id

Ref: m_work_types.id < m_working_dates.work_types_id

Ref: m_work_positions.id < m_employees.position_id