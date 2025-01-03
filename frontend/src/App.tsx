import {createContext, useEffect, useState, Dispatch, SetStateAction} from 'react'
import {OverTimePage} from "@/OverTimePage.tsx";
import {Route, Routes, BrowserRouter} from "react-router-dom"
import {ClockinTimePage} from "@/ClockinTimePage.tsx";

export const dateContext = createContext({} as {
  date: Date
  setDate: Dispatch<SetStateAction<Date>>
})

export const selectDateContext = createContext({} as {
  selectDate: Date[]
  setSelectDate: Dispatch<SetStateAction<Date[]>>
})

export function App() {

  const dt = new Date();
  const selectDateArr:Date[] = [];
  dt.setMonth(dt.getMonth() - 2);
  for (let i = 0; i < 3; i++) {
    dt.setMonth(dt.getMonth() + 1)
    selectDateArr.push(new Date(dt))
  }

  const [date, setDate] = useState<Date>(new Date());
  const [selectDate, setSelectDate] = useState<Date[]>(selectDateArr);

  useEffect(() => {
    console.log("load");
  }, []);

  return (
    <dateContext.Provider value={{date, setDate}}>
      <selectDateContext.Provider value={{selectDate, setSelectDate}}>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<OverTimePage/>} />
              <Route path="/stamp-list" element={<ClockinTimePage/>} />
          </Routes>
        </BrowserRouter>
      </selectDateContext.Provider>
    </dateContext.Provider>
  )
}
