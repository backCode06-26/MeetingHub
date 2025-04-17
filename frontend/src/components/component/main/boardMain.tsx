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

import MyPage from "../form/myPage";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import ReserList from "../form/reserList";
import { watch } from "fs";

type Room = {
  label: string;
  value: string;
};

function BoardMain() {
  const navigate = useNavigate();

  const [roomList, setRoomList] = useState<Room[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const schema = yup.object().shape({
    email: yup.string().required("이메일을 입력해주세요"),
    roomId: yup.string().required("회의실을 선택해주세요"),
    reserDate: yup
      .date()
      .typeError("날짜 형식이 올바르지 않습니다!")
      .min(
        new Date(new Date().getDate() - 1),
        "오늘 이전의 날짜를 선택 할 수 없습니다!"
      )
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

  const { handleSubmit, setValue, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      roomId: undefined,
      reserDate: undefined,
      useTime: undefined,
    },
  });

  useEffect(() => {
    // 로그인 되었는지 확인
    axios
      .get("/api/user/info", { withCredentials: true })
      .then((response) => {
        const { email } = response.data;
        setValue("email", email);
      })
      .catch((err) => {
        console.log("로그인 정보 가져오기 실패:", err);
        navigate("/");
      });

    // 회의실 정보
    axios.get("/api/room/all").then((response) => {
      const roomData: Room[] = response.data.map((data: any) => ({
        value: data.id,
        label: data.roomName,
      }));
      setRoomList(roomData);
    });
  }, []);

  // 예약 추가하기
  const createReser = (data: {
    email: string;
    roomId: string;
    reserDate: Date;
    useTime: Date;
  }) => {
    axios
      .post("/api/reser/create", data)
      .then(() => {
        alert("예약이 완료되었습니다.");
        setOpen(false);
        reset(); // 예약 성공 후 필드 초기화

        console.log("예약 정보", data);
      })
      .catch((err) => {
        alert("예약을 실패하였습니다.");
        console.log(err);
      });
  };

  const onError = (errors: any) => {
    if (errors.roomId) {
      alert(errors.roomId.message);
    } else if (errors.reserDate) {
      alert(errors.reserDate.message);
    } else if (errors.useTime) {
      alert(errors.useTime.message);
    }
  };

  return (
    <>
      <MyPage />

      <ReserList />

      <Drawer open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DrawerTrigger className="m-5 p-2 text-base border-gray-300 rounded-md border hover:border-sky-500 hover:bg-gray-200 transition-colors duration-500">
          회의실 예약
        </DrawerTrigger>
        <DrawerContent className="w-[50%] m-auto">
          <form onSubmit={handleSubmit(createReser, onError)}>
            <DrawerHeader>
              <DrawerTitle>회의실 예약</DrawerTitle>
              <DrawerDescription>
                원하는 회의실과 시간, 사용시간을 선택해주세요
              </DrawerDescription>

              {/* 회의실 선택 */}

              <Select>
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

              {/* 날짜 선택 */}
              <Controller
                name="reserDate"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild className="m-auto">
                      <Button
                        variant="outline"
                        className={`w-[300px] m-auto border-gray-300 rounded-md border hover:border-sky-500 hover:bg-gray-200 transition-colors duration-500 justify-start text-left font-normal ${
                          field.value ? "text-muted-foreground" : ""
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd a hh:mm", {
                            locale: ko,
                          })
                        ) : (
                          <span>사용시간을 선택해주세요!</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[400px] p-0 border-none"
                      align="center"
                    >
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        locale={ko}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="Pp"
                        className="border-none focus:ring-0"
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />

              {/* 사용시간 선택 */}
              <Controller
                name="useTime"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild className="m-auto">
                      <Button
                        variant="outline"
                        className={`w-[300px] m-auto border-gray-300 rounded-md border hover:border-sky-500 hover:bg-gray-200 transition-colors duration-500 justify-start text-left font-normal ${
                          field.value ? "text-muted-foreground" : ""
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd a hh:mm", {
                            locale: ko,
                          })
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
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        locale={ko}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="Pp"
                        className="border-none focus:ring-0"
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </DrawerHeader>

            <DrawerFooter>
              <Button className="border hover:border-sky-500">예약</Button>
              <DrawerClose>
                <Button
                  type="button"
                  variant="outline"
                  className="w-[100%] shadow-none hover:bg-gray-200 border hover:border-sky-500"
                  onClick={() => {
                    setOpen(false);
                    reset(); // 취소 시 폼 초기화
                  }}
                >
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
