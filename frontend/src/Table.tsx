import {OverTimeTable} from "./OverTimeTable.tsx";
import {MemberTable} from "./MemberTable.tsx";
import {WorkContentsTable} from "@/WorkContentsTable.tsx";
import {WorkHourResultTable} from "@/WorkHourResultTable.tsx";


export function Table() {
  return(
    <>
      <div className="flex p-5">
        <MemberTable/>
        <OverTimeTable/>
      </div>
      <h2 className="pl-5 pt-5 text-3xl font-semibold tracking-tight first:mt-0">
        工数管理
      </h2>
      <div className="flex p-5">
        <WorkContentsTable/>
        <WorkHourResultTable/>
      </div>
    </>
  )
}