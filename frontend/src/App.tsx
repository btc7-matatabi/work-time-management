import {useEffect} from 'react'
import {OverTimePage} from "@/OverTimePage.tsx";
import {Route, Routes, BrowserRouter} from "react-router-dom"
import {ClockinTimePage} from "@/ClockinTimePage.tsx";
import {format} from "date-fns";
import {useAtom, useSetAtom} from "jotai";
import {
  dateAtom,
  employeesAtom,
  eventsAtom,
  groupInfoAtom, leaderEmployeeCodeAtom, orgCdAtom, scheduleTypeAtom, sumWorkHourResultAtom,
  workCodesAtom, workContentsAtom,
  workDateAtom
} from "@/atom.ts";
import {useAtomValue} from "jotai/index";
import LoginPage from "@/LoginPage.tsx";

const URL = process.env.VITE_URL;

export function App() {

  const [date] = useAtom(dateAtom);
  const setEmployees = useSetAtom(employeesAtom)
  const setGroupInfo = useSetAtom(groupInfoAtom)
  const setWorkCodes = useSetAtom(workCodesAtom)
  const setWorkDate = useSetAtom(workDateAtom)
  const setEvents = useSetAtom(eventsAtom);
  const setScheduleType = useSetAtom(scheduleTypeAtom);
  const setWorkContents = useSetAtom(workContentsAtom);
  const [sumWorkHourResult, setSumWorkHourResult] = useAtom(sumWorkHourResultAtom);
  const groupCode = useAtomValue(orgCdAtom);
  const leaderEmployeeCode = useAtomValue(leaderEmployeeCodeAtom);

  console.log(groupCode);
  console.log(leaderEmployeeCode);

  useEffect(() => {
    //仮置き
    const paramsDate = new Date(date).setDate(1)

    fetch(`${URL}/members-overtime/${leaderEmployeeCode}/${format(paramsDate,"yyyy-MM-dd")}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEmployees(data)
        }
      })

    fetch(`${URL}/working-dates/${format(paramsDate,"yyyy-MM-dd")}/${groupCode}`)
      .then(response => response.json())
      .then(data =>  {
        if (Array.isArray(data)) {
          setWorkDate(data)
        }
      })

    fetch(`${URL}/group-events/${format(paramsDate,"yyyy-MM-dd")}/${groupCode}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEvents(data)
        }
      })

    fetch(`${URL}/work-contents/${format(paramsDate,"yyyy-MM-dd")}/${groupCode}`)
    // fetch(`http://localhost:3000/work-contents/${format(paramsDate,"yyyy-MM-dd")}/LT441`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setWorkContents(data);
          setSumWorkHourResult(sumWorkHourResult.splice(0));
          data.map(async (val) => {
                const res = await fetch(`${URL}/work-contents/${val.id}/sum-work-hour-results`);
                const data = await res.json()
                setSumWorkHourResult([...sumWorkHourResult, data]);
          })
        }
      })
  }, [date,groupCode,leaderEmployeeCode]);

  useEffect(() => {
    //仮置き
    fetch(`${URL}/groups/${groupCode}`)
      .then(response => response.json())
      .then(data => setGroupInfo(data))

    fetch(`${URL}/work-codes`)
      .then(response => response.json())
      .then(data => setWorkCodes(data))

    fetch(`${URL}/schedule-types`)
      .then(response => response.json())
      .then(data => setScheduleType(data))
  }, [groupCode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/overtime-list" element={<OverTimePage/>}/>
        <Route path="/stamp-list" element={<ClockinTimePage/>}/>
      </Routes>
    </BrowserRouter>
)
}
