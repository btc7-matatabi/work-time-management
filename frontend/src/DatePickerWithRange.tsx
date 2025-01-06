"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {useContext} from "react";
import {dialogDateContext} from "@/App.tsx";

export function DatePickerWithRange() {
  const {dialogDate} = useContext(dialogDateContext);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(dialogDate),
  })

  return (
    <div className={cn("grid gap-2 col-span-3")}>
      <Popover>
        <PopoverTrigger asChild className="bg-white">
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal text-lg",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy/MM/dd")} -{" "}
                  {format(date.to, "yyyy/MM/dd")}
                </>
              ) : (
                format(date.from, "yyyy/MM/dd")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
