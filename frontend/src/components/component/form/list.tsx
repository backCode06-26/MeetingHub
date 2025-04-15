import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

type Room = {
    label: string;
    value: string;
  };

interface ListProps {
  role?: string;
}

function List({ role = "ROLE_USER" }: ListProps) {
  const [reserList, setReserList] = useState<Reser[]>([]);
  const [roomList, setRoomList] = useState<Room[]>([]);

  const [roomId, setRoomId] = useState<string>();
  const [reserDate, setReserDate] = useState<Date | null>(new Date());
  const [useTime, setUseTime] = useState<Date | null>(new Date());

  useEffect(() => {
    // 예약 정보
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
      })
      .catch((error) => {
        console.error("Error fetching reservation data", error);
      });
    // 회의실 정보
    axios.get("/api/room/all").then((response) => {
      console.log("회의실 정보", response.data);
      const roomData: Room[] = response.data.map((data: any) => ({
        value: data.id,
        label: data.roomName,
      }));
      setRoomList(roomData);
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
              <TableCell>{data.reserDate}</TableCell>
              <TableCell className="text-right">{data.useTime}</TableCell>

              {/* 정보를 변경하기 위한 id 필요 수정할때 파라미터로 id 넣어야함 */}
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">수정</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>정보수정/삭제</DialogTitle>
                      <DialogDescription>
                        회의실과 예약시간, 사용시간을 수정할 수 있으며, 회의실을
                        삭제할 수 있습니다.
                      </DialogDescription>
                      {/* 회의실 선택 */}
                      <Select
                        onValueChange={(value) => {
                          setRoomId(value);
                        }}
                      >
                        <SelectTrigger className="w-[300px] m-auto border-gray-300 rounded-md border hover:border-sky-500 hover:bg-gray-200 transition-colors duration-500">
                          <SelectValue placeholder="회의실을 선택해주세요!" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {roomList.map((data) => (
                              <SelectItem key={data.value} value={data.value}>
                                {data.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {/* 예약시간 */}
                      <Popover>
                        <PopoverTrigger asChild className="mx-auto">
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[300px] justify-start text-left font-normal",
                              !reserDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {reserDate ? (
                              format(reserDate, "PPPp", { locale: ko })
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
                            selected={reserDate}
                            onChange={(date) => setReserDate(date)}
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
                        <PopoverTrigger asChild className="mx-auto">
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[300px] justify-start text-left font-normal",
                              !useTime && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {useTime ? (
                              format(useTime, "PPPp", { locale: ko })
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
                            selected={useTime}
                            onChange={(date) => setUseTime(date)}
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
                      <Button type="submit" variant="outline">
                        수정
                      </Button>
                      <Button>삭제</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          );
        })}
        ;
      </TableBody>
    </Table>
  );
}

export default List;
