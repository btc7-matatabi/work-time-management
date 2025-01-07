import {ClockinHeader} from "@/ClockinHeader.tsx";
import {ClockinMembers} from "@/ClockinMembers.tsx";
import {ClockinTimeTable} from "@/ClockinTimeTable.tsx";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function ClockinTimePage() {
  return (
    <>
      <ClockinHeader/>
      <div className="flex p-5">
        <ClockinMembers/>
        <ScrollArea>
            <ClockinTimeTable/>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  )
}