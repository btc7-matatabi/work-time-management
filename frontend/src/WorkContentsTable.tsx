import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx"

import {useAtom} from "jotai";
import {useAtomValue} from "jotai/index";
import {
  // sumWorkHourResultAtom,
  // sumWorkHourResultIF,
  workContentsAtom,
  workContentsIF,
  workHourResultIF,
  UpdateWorkContents, updateWorkContentsAtom,
} from "@/atom.ts";
import {Input} from "@/components/ui/input.tsx";
//CSS
const headerCss = "text-center border"
const contentsCss = "text-center border p-0"

function restWorkHour(wc: workContentsIF) {
  if(wc.total_work_minute && wc.sum_work_minute) {
    return (wc.total_work_minute * 60 - wc.sum_work_minute);
  } else {
    return 0;
  }
}

function totalWorkMinute(workHourResult:workHourResultIF[]) {
  return workHourResult.reduce((sum, time) => {
    return sum + time.work_minute
  },0)
}

function generateWorkContents(existWorkContents: workContentsIF[]) {
  const workContents10 : workContentsIF[] = [...existWorkContents];
  [...Array(10-existWorkContents.length)].map((_, i) => {
    const tmpId = -i - 1;
    const obj: workContentsIF = {
      id: tmpId,
      work_content: '',
      order_number: '',
      total_work_minute: null,
      sum_work_minute: null,
      work_hour_results: []
    };
    workContents10.push(obj);
  })
  return workContents10;
}

export function WorkContentsTable() {

  const existWorkContents = useAtomValue(workContentsAtom);
  const workContents = generateWorkContents(existWorkContents);
  const [updateWorkContents, setUpdateWorkContents] = useAtom(updateWorkContentsAtom);

  // 入力変更時の処理
  const handleInputChange = (id: number, key: keyof workContentsIF, newValue: string) => {
    console.log("updateWorkContents: ", updateWorkContents);
    setUpdateWorkContents((prev) : UpdateWorkContents[] => {
      // 初期データ（variableA）から変更対象のアイテムを取得
      const originalItem = workContents.find((item) => item.id === id);
      if (!originalItem) return prev;

      // 変更された値が元の値と同じ場合
      if (newValue === originalItem[key]) {
        // `variableB`から該当する変更箇所を削除
        return prev.map((item) => {
          if (item.id === id) {
            const updatedItem = { ...item };
            delete updatedItem[key]; // 変更箇所を削除

            // 他の変更が残っていなければエントリ全体を削除
            return Object.keys(updatedItem).length > 1 ? updatedItem : null;
          }
          return item;
        }).filter(item => item !== null); // nullを除外
      }

      const existingItem = prev.find((item) => item.id === id);
      if (existingItem) {
        // 既存エントリがある場合は更新
        return prev.map((item) =>
            item.id === id ? { ...item, [key]: newValue } : item
        );
      } else {
        // 初めての変更の場合は新規追加
        return [...prev, { id, [key]: newValue }];
      }
    });
  };

  // 表示する値を決定
  const getDisplayValue = (id: number, key: keyof workContentsIF): string => {
    const modifiedItem = updateWorkContents.find((item) => item.id === id);
    if (modifiedItem && modifiedItem[key] !== undefined) {
      return modifiedItem[key] as string;
    }
    const originalItem = workContents.find((item) => item.id === id);
    return originalItem ? originalItem[key] as string : '';
  };

  const getBackgroundColor = (id: number, key: keyof workContentsIF): string => {
    const modifiedItem = updateWorkContents.find((item) => item.id === id);
    if (modifiedItem && modifiedItem[key] !== undefined) {
      return '#dae4ef'; // 変更があった場合の背景色
    }
    return ''; //todo デフォルトの背景色
  };

  return(
    <div className="flex-shrink-0">
      <Table className="bg-gray-50 text-xl overflow-hidden">
        <TableHeader>
          <TableRow className="h-12">
            <TableHead className={`${headerCss} w-64`}>作業内容</TableHead>
            <TableHead className={`${headerCss} w-64`}>管理番号</TableHead>
            <TableHead className={`${headerCss} w-28`}>全工数</TableHead>
            <TableHead className={`${headerCss} w-28`}>残工数</TableHead>
            <TableHead className={`${headerCss} w-28`}>今月合計</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workContents.map((content, index) => {
            const totalMinuteThisMonth = totalWorkMinute(content.work_hour_results)
            const viewTime = restWorkHour(content);
            return (
              <TableRow className="h-10" key={index}>
                <TableCell className={contentsCss}
                           style={{backgroundColor: getBackgroundColor(content.id, 'work_content')}}
                >
                  <Input
                      className={`p-0 text-center text-xl`}
                      value={getDisplayValue(content.id, 'work_content')} // 表示する値を決定
                      style={{ backgroundColor: 'transparent' }}
                      onChange={(e) => handleInputChange(content.id, 'work_content', e.target.value)}
                  />
                </TableCell>
                <TableCell className={contentsCss}
                           style={{backgroundColor: getBackgroundColor(content.id, 'order_number')}}
                >
                  <Input
                      className={`p-0 text-center text-xl`}
                      value={getDisplayValue(content.id, 'order_number')} // 表示する値を決定
                      style={{ backgroundColor: 'transparent' }}
                      onChange={(e) => handleInputChange(content.id, 'order_number', e.target.value)}
                  />
                </TableCell>
                <TableCell className={contentsCss}
                           style={{backgroundColor: getBackgroundColor(content.id, 'total_work_minute')}}>
                  <Input
                      className={`p-0 text-center text-xl`}
                      value={getDisplayValue(content.id, 'total_work_minute')} // 表示する値を決定
                      style={{ backgroundColor: 'transparent'}}
                      onChange={(e) => handleInputChange(content.id, 'total_work_minute', e.target.value)}
                  />
                </TableCell>
                <TableCell
                  className={contentsCss}>{`${Math.floor(viewTime / 60)}:${('00' + (viewTime % 60)).slice(-2)}`}
                </TableCell>
                <TableCell
                  className={contentsCss}>{`${Math.floor(totalMinuteThisMonth / 60)}:${('00' + (totalMinuteThisMonth % 60)).slice(-2)}`}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  )
}