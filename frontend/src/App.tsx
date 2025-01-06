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

export const dialogEmployeeContext = createContext({} as {
  dialogEmployee: string
  setDialogEmployee: Dispatch<SetStateAction<string>>
})

export const dialogDateContext = createContext({} as {
  dialogDate: Date
  setDialogDate: Dispatch<SetStateAction<Date>>
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
  const [dialogEmployee, setDialogEmployee] = useState<string>("")
  const [dialogDate, setDialogDate] = useState<Date>(new Date())

  useEffect(() => {

  }, []);

  return (
    <dateContext.Provider value={{date, setDate}}>
      <selectDateContext.Provider value={{selectDate, setSelectDate}}>
        <dialogEmployeeContext.Provider value={{dialogEmployee, setDialogEmployee}}>
          <dialogDateContext.Provider value={{dialogDate, setDialogDate}}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<OverTimePage/>}/>
                <Route path="/stamp-list" element={<ClockinTimePage/>}/>
              </Routes>
            </BrowserRouter>
          </dialogDateContext.Provider>
         </dialogEmployeeContext.Provider>
      </selectDateContext.Provider>
    </dateContext.Provider>
)
}
