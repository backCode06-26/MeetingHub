<<<<<<< HEAD
import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Nav from "@/components/component/nav"

import "./App.css"

function App() {
  return (
    <>
      <Nav></Nav>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button variant="outline" className="m-5">회의실 예약</Button>
    </>
  )
}

export default App
=======
import Nav from "@/components/component/nav";
import "./App.css";
import AdminMain from "./components/component/main/adminMainMain";

function App() {

  return (
    <>
      <Nav />

      <AdminMain></AdminMain>
    </>
  );
}

export default App;
>>>>>>> 4d30b8b (login, reserList add)
