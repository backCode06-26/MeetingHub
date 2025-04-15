import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
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
} from "@/components/ui/select";
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
import List from "../form/list";

type Room = {
  label: string;
  value: string;
};

type User = {
  username: string;
  email: string;
  role: string;
};

function LoginMain() {
  const navigate = useNavigate();

  const [roomList, setRoomList] = useState<Room[]>([]);
  const [opne, setOpen] = useState<boolean>(false);

  const [user, setUser] = useState<User>({ username: "", email: "", role: "" });
  const [roomId, setRoomId] = useState<string>();
  const [reserDate, setReserDate] = useState<Date | null>(new Date());
  const [useTime, setUseTime] = useState<Date | null>(new Date());

  useEffect(() => {
    // 로그인 되었는지 확인
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

  // 예약 추가


  return (
    <>
      <MyPage username={user.username} role={user.role} />

      <List></List>

      <Drawer open={opne} onOpenChange={(isOpne) => setOpen(!isOpne ? false : true)}>
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
