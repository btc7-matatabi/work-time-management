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
  groupCodeAtom,
  groupInfoAtom, scheduleTypeAtom, sumWorkHourResultAtom,
  workCodesAtom, workContentsAtom,
  workDateAtom
} from "@/atom.ts";
import {useAtomValue} from "jotai/index";

export function App() {

  const [date] = useAtom(dateAtom);
  const setEmployees = useSetAtom(employeesAtom)
  const setGroupInfo = useSetAtom(groupInfoAtom)
  const setWorkCodes = useSetAtom(workCodesAtom)
  const groupCode = useAtomValue(groupCodeAtom);
  const setWorkDate = useSetAtom(workDateAtom)
  const setEvents = useSetAtom(eventsAtom);
  const setScheduleType = useSetAtom(scheduleTypeAtom);
  const setWorkContents = useSetAtom(workContentsAtom);
  const [sumWorkHourResult, setSumWorkHourResult] = useAtom(sumWorkHourResultAtom);

  useEffect(() => {
    //仮置き
    const leaderEmployeeCode= "0000013"
    const paramsDate = new Date(date).setDate(1)

    fetch(`http://localhost:3000/members-overtime/${leaderEmployeeCode}/${format(paramsDate,"yyyy-MM-dd")}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEmployees(data)
        }
      })

    fetch(`http://localhost:3000/working-dates/${format(paramsDate,"yyyy-MM-dd")}/${groupCode}`)
      .then(response => response.json())
      .then(data =>  {
        if (Array.isArray(data)) {
          setWorkDate(data)
        }
      })

    fetch(`http://localhost:3000/group-events/${format(paramsDate,"yyyy-MM-dd")}/${groupCode}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEvents(data)
        }
      })

    // fetch(`http://localhost:3000/work-contents/${format(paramsDate,"yyyy-MM-dd")}/${groupCode}`)
    fetch(`http://localhost:3000/work-contents/${format(paramsDate,"yyyy-MM-dd")}/LT441`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setWorkContents(data);
          setSumWorkHourResult(sumWorkHourResult.splice(0));
          data.map(async (val) => {
                const res = await fetch(`http://localhost:3000/work-contents/${val.id}/sum-work-hour-results`);
                const data = await res.json()
                setSumWorkHourResult([...sumWorkHourResult, data]);
          })
        }
      })
  }, [date]);

  useEffect(() => {
    //仮置き
    fetch(`http://localhost:3000/groups/${groupCode}`)
      .then(response => response.json())
      .then(data => setGroupInfo(data))

    fetch(`http://localhost:3000/work-codes`)
      .then(response => response.json())
      .then(data => setWorkCodes(data))

    fetch(`http://localhost:3000/schedule-types`)
      .then(response => response.json())
      .then(data => setScheduleType(data))
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OverTimePage/>}/>
        <Route path="/stamp-list" element={<ClockinTimePage/>}/>
      </Routes>
    </BrowserRouter>
)
}
