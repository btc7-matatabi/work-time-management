import {OverTimeTable} from "./OverTimeTable.tsx";
import {MemberTable} from "./MemberTable.tsx";

export function Table() {
  return(
    <div className="flex">
      <MemberTable/>
      <OverTimeTable/>
    </div>
  )
}