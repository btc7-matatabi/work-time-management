import {OverTimeTable} from "./OverTimeTable.tsx";
import {MemberTable} from "./MemberTable.tsx";
import {WorkContentsTable} from "@/WorkContentsTable.tsx";
import {WorkHourResultTable} from "@/WorkHourResultTable.tsx";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import {Button} from "@/components/ui/button.tsx";

import {updateWorkContentsAtom} from "@/atom.ts";
import {useAtomValue} from "jotai/index";

// import {dateAtom, orgCdAtom, sumWorkHourResultAtom, updateWorkContentsAtom, workContentsAtom} from "@/atom.ts";
// import {useAtom, useAtomValue} from "jotai/index";
// import {format} from "date-fns";
// import {useSetAtom} from "jotai";

export function Table() {
    const updateWorkContents  = useAtomValue(updateWorkContentsAtom);
    // const paramsDate = useAtomValue(dateAtom);
    // const groupCode = useAtomValue(orgCdAtom);
    // const setWorkContents = useSetAtom(workContentsAtom);
    // const [sumWorkHourResult, setSumWorkHourResult] = useAtom(sumWorkHourResultAtom);


    function saveWorkContents(){

        updateWorkContents.map(async (uwc) =>{
            if(uwc?.id){
                const params = {
                    method: "PUT",
                    body: JSON.stringify(uwc),
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
                await fetch(`${process.env.VITE_URL}/work-contents/${uwc.id}`, params);
            }
            // todo 新規作成のデータの形式考える
                // else {
            //     const params = {
            //         method: "POST",
            //         body: JSON.stringify(uwc),
            //         headers: {
            //             "Content-Type": "application/json",
            //         }
            //     };
            //     fetch(`${process.env.VITE_URL}/work-contents`, params);
            // }
        })

        // //todo 作業項目情報更新
        // fetch(`${URL}/work-contents/${format(paramsDate,"yyyy-MM-dd")}/${groupCode}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         if (Array.isArray(data)) {
        //             setWorkContents(data);
        //             setSumWorkHourResult([]);
        //             data.map(async (val) => {
        //                 const res = await fetch(`${URL}/work-contents/${val.id}/sum-work-hour-results`);
        //                 const data = await res.json()
        //                 setSumWorkHourResult([...sumWorkHourResult, data]);
        //             })
        //         }
        //     })
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