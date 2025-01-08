import {useEffect} from 'react'
import {OverTimePage} from "@/OverTimePage.tsx";
import {Route, Routes, BrowserRouter} from "react-router-dom"
import {ClockinTimePage} from "@/ClockinTimePage.tsx";
import {format} from "date-fns";
import {useAtom, useSetAtom} from "jotai";
import {dateAtom, employeesAtom} from "@/atom.ts";

export function App() {

  const [date] = useAtom(dateAtom);
  const setEmployees = useSetAtom(employeesAtom)

  useEffect(() => {
    //仮置き
    const leaderEmployeeCode= "0000013"
    const paramsDate = new Date(date).setUTCDate(1)

    fetch(`http://localhost:3000/members-overtime/${leaderEmployeeCode}/${format(paramsDate,"yyyy-MM-dd")}`)
      .then(response => response.json())
      .then(data => setEmployees(data))
  }, [date]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OverTimePage/>}/>
        <Route path="/stamp-list" element={<ClockinTimePage/>}/>
      </Routes>
    </BrowserRouter>
)
}
