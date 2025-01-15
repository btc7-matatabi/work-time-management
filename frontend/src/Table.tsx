import {OverTimeTable} from "./OverTimeTable.tsx";
import {MemberTable} from "./MemberTable.tsx";
import {WorkContentsTable} from "@/WorkContentsTable.tsx";
import {WorkHourResultTable} from "@/WorkHourResultTable.tsx";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import {Button} from "@/components/ui/button.tsx";

import {updateWorkContentsAtom, refreshWorkContentsAtom, orgCdAtom} from "@/atom.ts";
import {useAtomValue, useSetAtom} from "jotai/index";

// import {dateAtom, orgCdAtom, sumWorkHourResultAtom, updateWorkContentsAtom, workContentsAtom} from "@/atom.ts";
// import {useAtom, useAtomValue} from "jotai/index";
// import {format} from "date-fns";
// import {useSetAtom} from "jotai";

export function Table() {
    const updateWorkContents  = useAtomValue(updateWorkContentsAtom);
    const setRefreshWorkContents = useSetAtom(refreshWorkContentsAtom);
    // const paramsDate = useAtomValue(dateAtom);
    const groupCode = useAtomValue(orgCdAtom);
    const setUpdateWorkContents = useSetAtom(updateWorkContentsAtom);
    // const setWorkContents = useSetAtom(workContentsAtom);
    // const [sumWorkHourResult, setSumWorkHourResult] = useAtom(sumWorkHourResultAtom);


    async function saveWorkContents(){

        const promises = updateWorkContents.map(async (uwc) =>{
            if(uwc?.id && uwc.id > 0){
                const params = {
                    method: "PUT",
                    body: JSON.stringify(uwc),
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
                console.log("PUT: ", uwc);
                await fetch(`${process.env.VITE_URL}/work-contents/${uwc.id}`, params);
            } else if(uwc?.id && uwc.id < 0) {
                delete uwc['id'];
                uwc['group_code'] = groupCode;
                const params = {
                    method: "POST",
                    body: JSON.stringify(uwc),
                    headers: {
                        "Content-Type": "application/json",
                    }
                };
                console.log("POST: ", uwc);
                await fetch(`${process.env.VITE_URL}/work-contents`, params);
            }
        })
        await Promise.all(promises);
        setUpdateWorkContents([]);
        setRefreshWorkContents(prev => prev +1);
    }

    return(
    <>
      <div className="flex p-5 pt-24">
        <MemberTable/>
        <ScrollArea>
          <OverTimeTable/>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

      </div>
        <div className="flex h-8 pt-5 pb-5">
            <h2 className="pl-5 text-3xl font-semibold tracking-tight first:mt-0">
                工数管理
            </h2>
            <Button className="h-8 w-50 ml-8 bg-blue-600" onClick={() => saveWorkContents()}>工数変更箇所を保存</Button>
        </div>

        <div className="flex p-5">
            <WorkContentsTable/>
            <ScrollArea>
                <WorkHourResultTable/>
                <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  )
}