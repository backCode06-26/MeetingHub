import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { ko } from "date-fns/locale";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// 회의실 생성 axios 필요요

function AdminMain() {

  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <>
      {/* 로그인 여부에 따라 다른 UI 노출 예정 */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">번호</TableHead>
            <TableHead className="text-center">회의일 이름</TableHead>
            <TableHead className="text-center">예약 날짜</TableHead>
            <TableHead className="text-right">사용 시간</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>회의실A</TableCell>
            <TableCell>0000-00-00</TableCell>
            <TableCell >00:00</TableCell>
            <TableCell className="text-right">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">수정</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>정보수정/삭제</DialogTitle>
                    <DialogDescription>
                      회의실과 예약시간, 사용시간을 수정할 수 있으며, 회의실을 삭제할 수 있습니다.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        회의실 이름
                      </Label>
                      <Input id="name" value="" className="col-span-3" />
                      {/* <Input id="name" value={} className="col-span-3" /> */}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        회의실 시간
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild className="mx-auto">
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[300px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPPp", { locale: ko }) : <span>날짜를 선택해주세요!</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0 border-none" align="center">
                          <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            locale={ko}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="Pp"
                            className="border-none focus:ring-0"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">수정</Button>
                    <Button>삭제</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Drawer>
        <DrawerTrigger className="m-5 p-2 text-base border-gray-300 rounded-md border hover:border-sky-500 hover:bg-gray-200 transition-colors duration-500">
          회의실 생성
        </DrawerTrigger>
        <DrawerContent className="w-[50%] m-auto">
          <DrawerHeader>
            <DrawerTitle>회의실 생성</DrawerTitle>
            <DrawerDescription>
              회의실의 이름을 입력하여 회의실을 생성해주세요!
            </DrawerDescription>
            <Input type="text" placeholder="회의실의 이름을 입력해주세요" className="m-1" />
          </DrawerHeader>

          <DrawerFooter>
            <Button className="border hover:border-sky-500">생성</Button>
            <DrawerClose>
              <Button
                variant="outline"
                className="w-[100%] shadow-none hover:bg-gray-200 border hover:border-sky-500"
              >
                취소
              </Button>
            </DrawerClose>
          </DrawerFooter>

        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AdminMain;