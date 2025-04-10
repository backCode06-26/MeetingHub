import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { cn } from "@/lib/utils";
import MyPage from "../form/myPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Room = {
  label: string;
  value: string;
};

type User = {
  username : string;
  email : string;
  role : string;
}

function LoginMain() {
  const navigate = useNavigate();

  const [roomList, setRoomList] = useState<Room[]>([]);

  const [date, setDate] = useState<Date | null>(new Date());
  const [user, setUser] = useState<User>({
    username : "",
    email : "",
    role : ""
  });
  const [roomId, setRoomId] = useState<string>()


  useEffect(() => {
    axios
      .get("/api/user/info", { withCredentials: true })
      .then((response) => {
        console.log("로그인한 사용자 정보:", response.data);
        
        const { username, email, role } = response.data;
        setUser({ username: username, email: email, role: role });
      })
      .catch((err) => {
        console.log("로그인 정보 가져오기 실패:", err);
        navigate("/");
      });

    axios.get("/api/room/read").then((response) => {
      console.log("회의실 정보", response.data);
      const roomData: Room[] = response.data.map((data: any) => ({
        value: data.id,
        label: data.roomName,
      }));
      setRoomList(roomData);
    });
  }, []);

  // 예약 조회
  // 예약 추가가

  return (
    <>
      <MyPage username={user.username} role={user.role} />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">번호</TableHead>
            <TableHead className="text-center">회의실 이름</TableHead>
            <TableHead className="text-center">이메일</TableHead>
            <TableHead className="text-right">예약 시간</TableHead>
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
            <Select onValueChange={(value) => {setRoomId(value)}}>
              <SelectTrigger className="w-[300px] m-auto border-gray-300 rounded-md border hover:border-sky-500 hover:bg-gray-200 transition-colors duration-500">
                <SelectValue placeholder="회의실을 선택해주세요!" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                {
                  roomList.map((data) => (
                    <SelectItem key={data.value} value={data.value}>
                      {data.label}
                    </SelectItem>
                  ))
                }
                </SelectGroup>
              </SelectContent>
            </Select>

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
                  {date ? (
                    format(date, "PPPp", { locale: ko })
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
