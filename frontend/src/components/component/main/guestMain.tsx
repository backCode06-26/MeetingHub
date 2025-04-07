import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function GuestMain() {

  return (
    <>
      {/* 로그인 여부에 따라 다른 UI 노출 예정 */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">번호</TableHead>
            <TableHead className="text-center">상태</TableHead>
            <TableHead className="text-center">결제 방식</TableHead>
            <TableHead className="text-right">금액</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>결제 완료</TableCell>
            <TableCell>신용카드</TableCell>
            <TableCell className="text-right">₩250,000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

export default GuestMain;