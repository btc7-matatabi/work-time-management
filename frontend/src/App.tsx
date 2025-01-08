import {useEffect} from 'react'
import {OverTimePage} from "@/OverTimePage.tsx";
import {Route, Routes, BrowserRouter} from "react-router-dom"
import {ClockinTimePage} from "@/ClockinTimePage.tsx";
import {format} from "date-fns";
import {useAtom, useSetAtom} from "jotai";
import {dateAtom, employeesAtom, groupCodeAtom, groupInfoAtom, workCodesAtom} from "@/atom.ts";
import {useAtomValue} from "jotai/index";

export function App() {

  const [date] = useAtom(dateAtom);
  const setEmployees = useSetAtom(employeesAtom)
  const setGroupInfo = useSetAtom(groupInfoAtom)
  const setWorkCodes = useSetAtom(workCodesAtom)
  const groupCode = useAtomValue(groupCodeAtom);

  useEffect(() => {
    //仮置き
    const leaderEmployeeCode= "0000013"
    const paramsDate = new Date(date).setUTCDate(1)

    fetch(`http://localhost:3000/members-overtime/${leaderEmployeeCode}/${format(paramsDate,"yyyy-MM-dd")}`)
      .then(response => response.json())
      .then(data => setEmployees(data))
  }, [date]);

  useEffect(() => {
    //仮置き
    fetch(`http://localhost:3000/groups/${groupCode}`)
      .then(response => response.json())
      .then(data => setGroupInfo(data))

    fetch(`http://localhost:3000/work-codes`)
      .then(response => response.json())
      .then(data => setWorkCodes(data))
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
