const workDate = [
  { ymd: '2024/12/2', work_code: '0002' },
  { ymd: '2024/12/3', work_code: '0002' },
  { ymd: '2024/12/4', work_code: '0002' },
  { ymd: '2024/12/5', work_code: '0002' },
  { ymd: '2024/12/6', work_code: '0002' },
  { ymd: '2024/12/9', work_code: '0002' },
  { ymd: '2024/12/10', work_code: '0002' },
  { ymd: '2024/12/11', work_code: '0002' },
  { ymd: '2024/12/12', work_code: '0002' },
  { ymd: '2024/12/13', work_code: '0002' },
  { ymd: '2024/12/16', work_code: '0002' },
  { ymd: '2024/12/17', work_code: '0002' },
  { ymd: '2024/12/18', work_code: '0002' },
  { ymd: '2024/12/19', work_code: '0002' },
  { ymd: '2024/12/20', work_code: '0002' },
  { ymd: '2024/12/23', work_code: '0002' },
  { ymd: '2024/12/24', work_code: '0002' },
  { ymd: '2024/12/25', work_code: '0002' },
  { ymd: '2024/12/26', work_code: '0002' },
  { ymd: '2025/1/6', work_code: '0002' },
  { ymd: '2025/1/7', work_code: '0002' },
  { ymd: '2025/1/8', work_code: '0002' },
  { ymd: '2025/1/9', work_code: '0002' },
  { ymd: '2025/1/10', work_code: '0002' },
  { ymd: '2025/1/13', work_code: '0001' },
  { ymd: '2025/1/14', work_code: '0001' },
  { ymd: '2025/1/15', work_code: '0001' },
  { ymd: '2025/1/16', work_code: '0001' },
  { ymd: '2025/1/17', work_code: '0001' },
  { ymd: '2025/1/20', work_code: '0002' },
  { ymd: '2025/1/21', work_code: '0002' },
  { ymd: '2025/1/22', work_code: '0002' },
  { ymd: '2025/1/23', work_code: '0002' },
  { ymd: '2025/1/24', work_code: '0002' },
  { ymd: '2025/1/27', work_code: '0001' },
  { ymd: '2025/1/28', work_code: '0001' },
  { ymd: '2025/1/29', work_code: '0001' },
  { ymd: '2025/1/30', work_code: '0001' },
  { ymd: '2025/1/31', work_code: '0001' }
]
const year : number = new Date().getFullYear();
const month : number = new Date().getMonth()+1;

const startDate : Date = new Date(year, month - 1, 1);
const endDate : Date = new Date(year, month, 0);
const calendarData : number[] = [];

while (startDate <= endDate) {
  calendarData.push(startDate.getDate());
  startDate.setDate(startDate.getDate() + 1)
}

export default calendarData;


