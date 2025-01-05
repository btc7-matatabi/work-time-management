import {ClockinHeader} from "@/ClockinHeader.tsx";
import {ClockinMembers} from "@/ClockinMembers.tsx";
import {ClockinTimeTable} from "@/ClockinTimeTable.tsx";

export function ClockinTimePage() {
  return (
    <>
      <ClockinHeader/>
      <div className="flex p-5">
        <ClockinMembers/>
        <ClockinTimeTable/>
      </div>
    </>
  )
}