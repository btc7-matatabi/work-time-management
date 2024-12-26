import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

export function ClockinHeader() {
  return (
    <div className="flex">
      <h2 className="scroll-m-20 p-6 text-3xl font-semibold tracking-tight first:mt-0">
        LT135組
      </h2>
      <Link to="/">
        <Button className="bg-gray-500 m-6 text-2xl">戻る</Button>
      </Link>
    </div>
  )
}