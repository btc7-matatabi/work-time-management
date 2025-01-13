import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx"

//サンプルデータ
import {useAtomValue} from "jotai/index";
import {
  sumWorkHourResultAtom,
  sumWorkHourResultIF,
  workContentsAtom,
  workContentsIF,
  workHourResultIF
} from "@/atom.ts";
import {useState} from "react";

//CSS
const headerCss = "text-center border"
const contentsCss = "text-center border p-1"

function restWorkHour(id: number, sumWorkHourResult:sumWorkHourResultIF[]) {
  const result = sumWorkHourResult.filter(val => val.work_contents_id === id);
  if (result.length === 1) {
    return result[0].sum_work_minute;
  } else {
    return 0;
  }
}

function totalWorkHour(workHourResult:workHourResultIF[]) {
  return workHourResult.reduce((sum, time) => {
    return sum + time.work_minute
  },0)
}

type UpdateWorkContents = {
  id: number
  work_content?:string;
  order_number?:string;
  total_work_minute?:number;
  work_hour_results?:workHourResultIF[];
}

// 入力変更時の処理

export function WorkContentsTable() {

  const workContents = useAtomValue(workContentsAtom);
  const sumWorkHourResult = useAtomValue(sumWorkHourResultAtom);
  const [inputWorkContents, setInputWorkContents] = useState<UpdateWorkContents[]>([]);

  const handleInputChange = (id: number, key: keyof UpdateWorkContents, newValue: string) => {
    console.log("inputWorkContents: ", inputWorkContents);
    setInputWorkContents((prev) : UpdateWorkContents[] => {
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
    const modifiedItem = inputWorkContents.find((item) => item.id === id);
    if (modifiedItem && modifiedItem[key] !== undefined) {
      return modifiedItem[key] as string;
    }
    const originalItem = workContents.find((item) => item.id === id);
    return originalItem ? originalItem[key] as string : '';
  };

  const getBackgroundColor = (id: number, key: keyof workContentsIF): string => {
    const modifiedItem = inputWorkContents.find((item) => item.id === id);
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
            const viewTime = restWorkHour(content.id,sumWorkHourResult)
            const totalMinute = totalWorkHour(content.work_hour_results)
            return (
              <TableRow className="h-10" key={index}>
                <TableCell className={contentsCss}
                           style={{backgroundColor: getBackgroundColor(content.id, 'work_content')}}
                >
                  <input
                      value={getDisplayValue(content.id, 'work_content')} // 表示する値を決定
                      style={{ backgroundColor: 'transparent' }}
                      onChange={(e) => handleInputChange(content.id, 'work_content', e.target.value)}
                  />
                </TableCell>
                <TableCell className={contentsCss}
                           style={{backgroundColor: getBackgroundColor(content.id, 'order_number')}}
                >
                  <input
                      value={getDisplayValue(content.id, 'order_number')} // 表示する値を決定
                      style={{ backgroundColor: 'transparent' }}
                      onChange={(e) => handleInputChange(content.id, 'order_number', e.target.value)}
                  />
                </TableCell>
                <TableCell className={contentsCss}
                           style={{backgroundColor: getBackgroundColor(content.id, 'total_work_minute')}}>
                  <input
                      value={getDisplayValue(content.id, 'total_work_minute')} // 表示する値を決定
                      style={{ backgroundColor: 'transparent' , width: '50px'}}
                      onChange={(e) => handleInputChange(content.id, 'total_work_minute', e.target.value)}
                  />
                </TableCell>
                <TableCell
                  className={contentsCss}>{`${Math.floor(viewTime / 60)}:${('00' + (viewTime % 60)).slice(-2)}`}</TableCell>
                <TableCell
                  className={contentsCss}>{`${Math.floor(totalMinute / 60)}:${('00' + (totalMinute % 60)).slice(-2)}`}</TableCell>
              </TableRow>
            )
          })}
          {[...Array(10-workContents.length)].map(val => {
            return (
              <TableRow className="h-10" key={val}>
                <TableCell className={contentsCss}></TableCell>
                <TableCell className={contentsCss}></TableCell>
                <TableCell className={contentsCss}></TableCell>
                <TableCell className={contentsCss}></TableCell>
                <TableCell className={contentsCss}></TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  )
}