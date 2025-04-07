import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { cn } from "@/lib/utils";

function LoginMain() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const frameworks = [
    { value: "next.js", label: "회의실 A" },
    { value: "sveltekit", label: "회의실 B" },
    { value: "nuxt.js", label: "회의실 C" },
    { value: "remix", label: "회의실 D" },
    { value: "astro", label: "회의실 E" },
  ];

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

      <Drawer>
        <DrawerTrigger className="m-5 p-2 text-base border-gray-300 rounded-md border hover:border-sky-500 hover:bg-gray-200 transition-colors duration-500">
          회의실 예약
        </DrawerTrigger>
        <DrawerContent className="w-[50%] m-auto">
          <DrawerHeader>
            <DrawerTitle>회의실 예약</DrawerTitle>
            <DrawerDescription>
              원하는 회의실과 시간, 사용시간을 선택해주세요
            </DrawerDescription>

            {/* 회의실 선택 */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="m-auto text-gray-500">
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[300px] justify-between"
                >
                  {value
                    ? frameworks.find((f) => f.value === value)?.label
                    : "회의실을 선택해주세요!"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {frameworks.map((f) => (
                        <CommandItem
                          key={f.value}
                          value={f.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === f.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {f.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* 날짜 및 시간 선택 */}
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
          </DrawerHeader>

          <DrawerFooter>
            <Button className="border hover:border-sky-500">예약</Button>
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

export default LoginMain;