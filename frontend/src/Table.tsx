import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import calendarData from "@/Data.tsx";

export function Home() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {calendarData.map(date => <TableHead key={date}>{date}</TableHead>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {/*{invoices.map((invoice) => (*/}
        {/*  <TableRow key={invoice.invoice}>*/}
        {/*    <TableCell className="font-medium">{invoice.invoice}</TableCell>*/}
        {/*    <TableCell>{invoice.paymentStatus}</TableCell>*/}
        {/*    <TableCell>{invoice.paymentMethod}</TableCell>*/}
        {/*    <TableCell className="text-right">{invoice.totalAmount}</TableCell>*/}
        {/*  </TableRow>*/}
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
