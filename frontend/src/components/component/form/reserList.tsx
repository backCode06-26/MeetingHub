import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { format, isValid } from "date-fns";
import { cn } from "@/lib/utils";
import { ko } from "date-fns/locale";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Reser = {
  id: number;
  username: string;
  roomName: string;
  reserDate: string;
  useTime: string;
};

type Update = {
  reserDate: Date;
  useTime: Date;
};

interface ListProps {
  role?: string;
}

function formatSafe(dateStr: string) {
  const parsed = new Date(dateStr);
  return isValid(parsed)
    ? format(parsed, "yyyy-MM-dd a hh:mm", { locale: ko })
    : "잘못된 날짜";
}

function List({ role = "ROLE_USER" }: ListProps) {
  const [reserList, setReserList] = useState<Reser[]>([]);
  const [open, setOpen] = useState<boolean[]>([]);

  const [date, setDate] = useState<Update>({
    reserDate: new Date(),
    useTime: new Date(),
  });

  const updateReser = (id: number) => {
    axios
      .patch("/api/reser/update", {
        id: id,
        reserDate: date.reserDate,
        useTime: date.useTime,
      })
      .then((response) => {
        alert("시간이 수정되었습니다!");
        console.log("변경된 예약 정보", response);

        const updatedReser: Reser = {
          id: response.data.id,
          username: response.data.user.username,
          roomName: response.data.room.roomName,
          reserDate: response.data.reserDate,
          useTime: response.data.useTime,
        };
        setOpen(() => {
          const newOpen = [...open];
          newOpen[id] = !newOpen[id];
          return newOpen;
        });

        setReserList((prev) => prev.map((r) => (r.id === id ? updatedReser : r)));
      })
      .catch((err) => {
        alert("시간 수정을 실패하였습니다!");
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("/api/reser/all")
      .then((response) => {
        const reserData: Reser[] = response.data.map((data: any) => ({
          id: data.id,
          username: data.username,
          roomName: data.roomName,
          reserDate: data.reserDate,
          useTime: data.useTime,
        }));
        setReserList(reserData);
        console.log("예약 정보", reserData);
      })
      .catch((error) => {
        console.error("Error fetching reservation data", error);
      });
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center">번호</TableHead>
          <TableHead className="text-center">회의실</TableHead>
          <TableHead className="text-center">사용자</TableHead>
          <TableHead className="text-center">예약 시간</TableHead>
          <TableHead className="text-right">사용시간</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reserList.map((data) => {
          return (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell>{data.roomName}</TableCell>
              <TableCell>{data.username}</TableCell>
              <TableCell>{formatSafe(data.reserDate)}</TableCell>
              <TableCell className="text-right">
                {formatSafe(data.useTime)}
              </TableCell>

              {role === "ROLE_ADMIN" && (
                <TableCell>
                  <Dialog
                    open={open[data.id]}
                    onOpenChange={(isOpen) => {
                      const newOpen = [...open];
                      newOpen[data.id] = isOpen;
                      setOpen(newOpen);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline">수정</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>정보수정/삭제</DialogTitle>
                        <DialogDescription>
                          예약 시간과 사용시간을 수정할 수 있습니다!
                        </DialogDescription>

                        {/* 예약시간 */}
                        <Popover>
                          <PopoverTrigger asChild className="m-auto">
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[300px] justify-start text-left font-normal",
                                date.reserDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date.reserDate ? (
                                format(data.reserDate, "yyyy-MM-dd a hh:mm", { locale: ko })
                              ) : (
                                <span>날짜를 선택해주세요!</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-[400px] p-0 border-none"
                            align="center"
                          >
                            <DatePicker
                              selected={date.reserDate}
                              onChange={(d) =>
                                setDate((prev) => ({ ...prev, reserDate: d! }))
                              }
                              locale={ko}
                              showTimeSelect
                              timeFormat="HH:mm"
                              timeIntervals={15}
                              dateFormat="Pp"
                              className="border-none focus:ring-0"
                            />
                          </PopoverContent>
                        </Popover>

                        {/* 사용시간 */}
                        <Popover>
                          <PopoverTrigger asChild className="m-auto">
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[300px] justify-start text-left font-normal",
                                date.useTime && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date.useTime ? (
                                format(data.useTime, "yyyy-MM-dd a hh:mm", { locale: ko })
                              ) : (
                                <span>날짜를 선택해주세요!</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-[400px] p-0 border-none"
                            align="center"
                          >
                            <DatePicker
                              selected={date.useTime}
                              onChange={(d) =>
                                setDate((prev) => ({ ...prev, useTime: d! }))
                              }
                              locale={ko}
                              showTimeSelect
                              timeFormat="HH:mm"
                              timeIntervals={15}
                              dateFormat="Pp"
                              className="border-none focus:ring-0"
                            />
                          </PopoverContent>
                        </Popover>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          onClick={() => updateReser(data.id)}
                          type="submit"
                          variant="outline"
                        >
                          수정
                        </Button>
                        <Button
                          onClick={() => {
                            const newOpen = [...open];
                            newOpen[data.id] = !newOpen[data.id];
                            setOpen(newOpen);

                            // 날짜 초기화
                            setDate({
                              reserDate: new Date(),
                              useTime: new Date(),
                            });
                          }}
                        >
                          닫기
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default List;
