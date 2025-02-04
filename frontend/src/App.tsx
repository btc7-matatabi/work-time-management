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
  groupInfoAtom, leaderEmployeeCodeAtom, orgCdAtom, refreshWorkContentsAtom, scheduleTypeAtom, updateAtom,
  workCodesAtom, workContentsAtom, workContentsIF,
  workDateAtom
} from "@/atom.ts";
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
  // const [sumWorkHourResult, setSumWorkHourResult] = useAtom(sumWorkHourResultAtom);
  const [groupCode, setGroupCode] = useAtom(orgCdAtom);
  const [leaderEmployeeCode, setLeaderEmployeeCode] = useAtom(leaderEmployeeCodeAtom);
  const [update, setUpdate] = useAtom(updateAtom);
  const [refreshWorkContents] = useAtom(refreshWorkContentsAtom);

  useEffect(() => {
    const groupCodeResult = localStorage.getItem("orgCd")
    const leaderEmployeeCodeResult = localStorage.getItem("leaderEmployeeCode")
    if (groupCodeResult !== null && groupCode === "") {
      setGroupCode(groupCodeResult)
    }
    if (leaderEmployeeCodeResult !== null && leaderEmployeeCode === "") {
      setLeaderEmployeeCode(leaderEmployeeCodeResult)
    }

  }, []);

  useEffect(() => {

    const paramsDate = new Date(date).setDate(1)
    //組メンバー情報
    fetch(`${URL}/members-overtime/${leaderEmployeeCode}/${format(paramsDate,"yyyy-MM-dd")}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEmployees(data)
        }
      })
    setUpdate(false)

  }, [date,leaderEmployeeCode,update]);

  useEffect(() => {

    const paramsDate = new Date(date).setDate(1)

    //稼働日情報
    fetch(`${URL}/working-dates/${format(paramsDate,"yyyy-MM-dd")}/${groupCode}`)
      .then(response => response.json())
      .then(data =>  {
        if (Array.isArray(data)) {
          setWorkDate(data)
        }
      })

    //組行事情報
    fetch(`${URL}/group-events/${format(paramsDate,"yyyy-MM-dd")}/${groupCode}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEvents(data)
        }
      })

    //作業項目情報
    fetch(`${URL}/work-contents/${format(paramsDate,"yyyy-MM-dd")}/${groupCode}`)
      .then(response => response.json())
      .then(async(data) => {
        if (Array.isArray(data)) {
          const dataWithSum = data.map(async (val) => {
            const res = await fetch(`${URL}/work-contents/${val.id}/sum-work-hour-results`);
            const sumWorkHourResult = await res.json();
            val["sum_work_minute"] = sumWorkHourResult.sum_work_minute;
            return val;
          })
          const wc: workContentsIF[] = await Promise.all(dataWithSum);
          setWorkContents(wc);
        }
      })
  }, [date,groupCode,leaderEmployeeCode, refreshWorkContents]);

  useEffect(() => {

    //組情報
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
