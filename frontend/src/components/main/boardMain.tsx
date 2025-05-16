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

import MyPage from "../component/form/myPage";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import BoardTab from "../component/tab/boardTab";

// 타입 정의
type Room = {
  label: string;
  value: number;  // value를 number로 설정
};

type FormValues = {
  email: string;
  roomId: number;
  reserDate: Date;
  useTime: Date;
};

function BoardMain() {
  const navigate = useNavigate();
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  // 유효성 검사 스키마
  const schema = yup.object().shape({
    email: yup.string().required("이메일을 입력해주세요"),
    roomId: yup.number().required("회의실을 선택해주세요"),
    reserDate: yup
      .date()
      .typeError("날짜 형식이 올바르지 않습니다!")
      .min(new Date(), "오늘 이전의 날짜를 선택할 수 없습니다!")
      .required("예약날짜를 입력해주세요!"),
    useTime: yup
      .date()
      .typeError("날짜 형식이 올바르지 않습니다!")
      .test(
        "is-time-valid",
        "사용시간은 예약시간보다 최소 5분 이상으로 설정해야합니다!",
        function (value) {
          const { reserDate } = this.parent;
          if (!reserDate || !value) return true;
          const timeDiff = value.getTime() - reserDate.getTime();
          return timeDiff >= 5 * 60 * 1000;
        }
      )
      .required("사용시간을 입력하지 않았습니다!"),
  });

  const {
    handleSubmit,
    setValue,
    control,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      roomId: undefined,
      reserDate: undefined,
      useTime: undefined,
    },
  });

  useEffect(() => {
    // 사용자 정보 조회
    axios
      .get("/api/user/info", { withCredentials: true })
      .then(({ data }) => setValue("email", data.email))
      .catch((err) => {
        console.error("로그인 정보 불러오기 실패:", err);
        navigate("/");
      });

    // 회의실 목록 조회
    axios.get("/api/room/all").then((response) => {
      const rooms: Room[] = response.data.map((room: any) => ({
        value: room.id,  // value는 number로 그대로 사용
        label: room.roomName,
      }));
      console.log("회의실 정보 : ", rooms);
      setRoomList(rooms);
    });
  }, []);

  // 예약 요청 함수
  const createReser = (data: FormValues) => {
    axios
      .post("/api/reser/create", data)
      .then(() => {
        alert("예약이 완료되었습니다.");
        setOpen(false);
        reset();
      })
      .catch((err) => {
        console.error(err);
        alert(err.response.data);
      });
  };

  // 유효성 검사 실패 시 경고
  const onError = (errors: any) => {
    if (errors.roomId) alert(errors.roomId.message);
    else if (errors.reserDate) alert(errors.reserDate.message);
    else if (errors.useTime) alert(errors.useTime.message);
  };

  return (
    <>
      <MyPage />
      <BoardTab></BoardTab>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="m-5 p-2 text-base border-gray-300 rounded-md border hover:border-sky-500 hover:bg-gray-200 transition-colors duration-500">
          회의실 예약
        </DrawerTrigger>
        <DrawerContent className="w-[50%] m-auto">
          <form onSubmit={handleSubmit(createReser, onError)}>
            <DrawerHeader>
              <DrawerTitle>회의실 예약</DrawerTitle>
              <DrawerDescription>
                원하는 회의실과 사용 시간, 사용 기간을 선택해주세요
              </DrawerDescription>

              {/* 회의실 선택 */}
              <Controller
                name="roomId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ? String(field.value) : ''}  // Select에 전달할 값은 string으로 변환
                    onValueChange={(value) => {
                      field.onChange(Number(value));  // roomId는 number로 변환하여 저장
                      const selectedRoom = roomList.find(
                        (room) => room.value === Number(value) // value를 number로 비교
                      );
                      console.log(selectedRoom?.label);
                    }}
                  >
                    <SelectTrigger className="w-[300px] m-auto border-gray-300 rounded-md border hover:border-sky-500 hover:bg-gray-200 transition-colors duration-500">
                      <SelectValue placeholder="회의실 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {roomList.map((room) => (
                          <SelectItem key={room.value} value={String(room.value)}>  {/* 값은 string으로 */}
                            {room.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {/* 예약 날짜 선택 */}
              <Controller
                name="reserDate"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[300px] m-auto justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "yyyy-MM-dd a hh:mm", {
                              locale: ko,
                            })
                          : "예약 날짜 선택"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0" align="center">
                      <DatePicker
                        selected={field.value}
                        onChange={field.onChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="Pp"
                        locale={ko}
                        className="border-none focus:ring-0"
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />

              {/* 사용 시간 선택 */}
              <Controller
                name="useTime"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[300px] m-auto justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "yyyy-MM-dd a hh:mm", {
                              locale: ko,
                            })
                          : "사용 시간 선택"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0" align="center">
                      <DatePicker
                        selected={field.value}
                        onChange={field.onChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="Pp"
                        locale={ko}
                        className="border-none focus:ring-0"
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </DrawerHeader>

            <DrawerFooter>
              <Button type="submit" className="border hover:border-sky-500">
                예약
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="ml-2">
                  취소
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default BoardMain;