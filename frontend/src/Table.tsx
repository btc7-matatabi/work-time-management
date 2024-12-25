import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {useContext} from "react";
import {dateContext} from "./App.tsx";

//サンプルデータ
// import {employees} from "./Data.ts";
import {event} from "./Data.ts";

let calendarData : number[];
let eventData : string[];

function setCalender(startDate : Date, endDate : Date) {
  console.log(startDate.toDateString())
  while (startDate <= endDate) {
    calendarData.push(startDate.getDate());
    startDate.setDate(startDate.getDate() + 1)
  }
}

function setEvent(startDate : Date, endDate : Date) {

  while (startDate <= endDate) {
    const pickupEvent = event.filter(val => {
      return new Date(val.ymd).toDateString() === startDate.toDateString()
    });
    if (pickupEvent.length === 0) {
      eventData.push("")
    } else {
      eventData.push(pickupEvent[0].event_name)
    }
    startDate.setDate(startDate.getDate() + 1)
  }
}

export function Home() {

  const {date} = useContext(dateContext)
  calendarData = [];
  eventData = [];

  const year : number = date.getFullYear();
  const month : number = date.getMonth()+1;

  const startDate : Date = new Date(year, month - 1, 1);
  const endDate : Date = new Date(year, month, 0);
  setCalender(new Date(startDate),new Date(endDate));
  setEvent(new Date(startDate),new Date(endDate));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {calendarData.map(date => <TableHead key={date}>{date}</TableHead>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {/*{invoices.map((invoice) => (*/}
          <TableRow>
            {eventData.map((val, index) => <TableCell key={index}>{val}</TableCell>)}
        {/*    <TableCell>{invoice.paymentStatus}</TableCell>*/}
        {/*    <TableCell>{invoice.paymentMethod}</TableCell>*/}
        {/*    <TableCell className="text-right">{invoice.totalAmount}</TableCell>*/}
          </TableRow>
        {/*))}*/}
      </TableBody>
      <TableFooter>
        {/*<TableRow>*/}
        {/*  <TableCell colSpan={3}>Total</TableCell>*/}
        {/*  <TableCell className="text-right">$2,500.00</TableCell>*/}
        {/*</TableRow>*/}
      </TableFooter>
    </Table>
  )
}
