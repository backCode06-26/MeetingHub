import { useEffect, useState } from "react";
import { ko } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

type Room = {
  id: number;
  roomName: string;
};

type Time = {
  time: number;
};

type FormValues = {
  email: string;
  roomId: number;
  reserDate: Date;
  startDate: number;
  endDate: number;
};

function Timer({ isEdit = false } : { isEdit?: boolean}) {
  const navigate = useNavigate();

  const yesterDay = new Date();
  yesterDay.setDate(yesterDay.getDate() - 1);

  const [roomActive, setRoomActive] = useState<boolean>(false);
  const [dateActive, setDateActive] = useState<"date" | "time">("date");
  const [timeActive, setTimeActive] = useState<"AM" | "PM">("AM");

  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);
  const [rooms, setRoomList] = useState<Room[]>([]);
  const [times, setTimeList] = useState<Time[]>([]);

  const [date, setDate] = useState<Date>(new Date());
  const [room, setRoomName] = useState<Room | undefined>(undefined);

  // 유효성 검사 스키마
  const schema = yup.object().shape({
    email: yup.string().required("이메일을 입력해주시요"),
    roomId: yup.number().required("회의실을 선택해주세요"),
    reserDate: yup
      .date()
      .typeError("날짜 형식이 올바르지 않습니다!")
      .min(yesterDay, "오늘 이전의 날짜를 선택할 수 없습니다!")
      .required("예약날짜를 입력해주세요!"),
    startDate: yup.number().required("날짜를 선택해주세요"),
    endDate: yup.number().required("날짜를 선택해주세요"),
  });

  const { handleSubmit, setValue, getValues, reset, register } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
      defaultValues: {
        email: "",
        roomId: 0,
        reserDate: new Date(),
        startDate: 0,
        endDate: 0,
      },
    });

  useEffect(() => {
    // 회의실 목록 조회
    axios.get("/api/room/all").then((response) => {
      const rooms: Room[] = response.data.map((room: any) => ({
        id: room.id,
        roomName: room.roomName,
      }));
      setRoomList(rooms);
    });

    const selecteDate = getValues("reserDate");
    const formattedDate = format(selecteDate, "yyyy-MM-dd");

    axios.get(`/api/reser/time/${formattedDate}`).then((response) => {
      const times: Time[] = response.data.map((time: any) => ({
        time: time,
      }));
      console.log(times);
      setTimeList(times);
    });
    // 사용자 정보 조회
    axios
      .get("/api/user/info", { withCredentials: true })
      .then(({ data }) => setValue("email", data.email))
      .catch((err) => {
        console.error("로그인 정보 불러오기 실패:", err);
        navigate("/");
      });
  }, [navigate, setValue]);

  // 시작 시간과 종료 시간 업데이트 함수
  const updateStartEndDate = (times: number[]) => {
    if (times.length === 0) {
      setValue("startDate", 0);
      setValue("endDate", 0);
      return;
    }
    const sorted = [...times].sort((a, b) => a - b);

    const start = sorted[0];
    const end = sorted[sorted.length - 1];

    setValue("startDate", start);
    setValue("endDate", end);
  };

  // `date` 또는 `selectedTimes`가 변경될 때 `updateStartEndDate` 호출
  useEffect(() => {
    updateStartEndDate(selectedTimes);
  }, [date, selectedTimes, setValue]);

  // 시간을 추가하는 함수
  const handleAddTime = (value: number) => {
    if (selectedTimes.includes(value)) {
      // 이미 선택된 시간은 무시
      return;
    }

    if (selectedTimes.length === 0) {
      setSelectedTimes([value]);
      updateStartEndDate([value]);
    } else {
      const sorted = [...selectedTimes].sort((a, b) => a - b);
      const min = sorted[0];
      const max = sorted[sorted.length - 1];

      if (value === min - 0.5) {
        const newSelected = [value, ...sorted];
        setSelectedTimes(newSelected);
        updateStartEndDate(newSelected);
      } else if (value === max + 0.5) {
        const newSelected = [...sorted, value];
        setSelectedTimes(newSelected);
        updateStartEndDate(newSelected);
      } else {
        alert("연속된 시간만 선택할 수 있습니다.");
      }
    }
  };

  // 시간 제거 함수
  const handleRemoveTime = (value: number) => {
    const newSelected = selectedTimes.filter((t) => t !== value);
    setSelectedTimes(newSelected);
    updateStartEndDate(newSelected);
  };
  // 회의실 선택 함수
  const handleSelectRoom = (selectedRoom: Room) => {
    setRoomName(selectedRoom);
    setValue("roomId", selectedRoom.id, { shouldValidate: true });
    setRoomActive(false);
  };

  // 예약 요청 함수
  const createReser = (data: FormValues) => {
    console.log(data);
    const url = isEdit ? "/api/reser/create" : "/api/reser/update";

    axios
      .post(url, data)
      .then(() => {
        alert("작업이 완료되었습니다.");
        reset();
        setSelectedTimes([]);
        setRoomName(undefined);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data || "작업중 중 오류가 발생했습니다.");
      });
  };

  // 유효성 검사 실패 시 경고
  const onError = (errors: any) => {
    if (errors.email) alert(errors.email.message);
    else if (errors.roomId) alert(errors.roomId.message);
    else if (errors.reserDate) alert(errors.reserDate.message);
    else if (errors.startDate) alert(errors.startDate.message);
    else if (errors.endDate) alert(errors.endDate.message);
  };

  return (
    <form
      onSubmit={handleSubmit(createReser, onError)}
      className="w-full m-auto"
    >
      {/* 회의실 선택 */}
      <div
        {...register("roomId")}
        className="relative w-full text-center my-5 z-10"
        onMouseEnter={() => setRoomActive(true)}
        onMouseLeave={() => setRoomActive(false)}
      >
        <button
          type="button"
          className="w-full h-[40px] border border-sky-200 rounded-sm"
          onClick={() => setRoomActive((prev) => !prev)}
        >
          {room === undefined ? "회의실을 선택해주세요!" : room.roomName}
        </button>
        <div
          className={`w-full absolute top-[40px] left-0 border border-1 border-sky-200 rounded-[15px] transition-all duration-200 bg-white
            ${
              roomActive
                ? "block pointer-events-auto"
                : "hidden pointer-events-none"
            }`}
        >
          {rooms.map((roomItem) => (
            <div key={roomItem.id} className="w-full">
              <button
                type="button"
                className="w-full py-3 rounded-sm hover:bg-gray-300"
                onClick={() => handleSelectRoom(roomItem)}
              >
                {roomItem.roomName}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 날짜, 시간 탭 */}
      <div className="flex mb-3">
        <div className="w-1/2">
          <button
            type="button"
            className={`w-full py-2 ${
              dateActive === "date" ? "bg-sky-300 text-white" : "bg-white"
            }`}
            onClick={() => setDateActive("date")}
          >
            날짜
          </button>
        </div>
        <div className="w-1/2">
          <button
            type="button"
            className={`w-full py-2 ${
              dateActive === "time" ? "bg-sky-300 text-white" : "bg-white"
            }`}
            onClick={() => setDateActive("time")}
          >
            시간
          </button>
        </div>
      </div>

      {/* 날짜 선택 */}
      {dateActive === "date" && (
        <Calendar
          {...register("reserDate")}
          mode="single"
          selected={date}
          onSelect={(selectedDate: Date | undefined) => {
            if (selectedDate) {
              setDate(selectedDate);
              setValue("reserDate", selectedDate);
              // 날짜 변경 시 시간 초기화
              setSelectedTimes([]);
              setValue("startDate", 0);
              setValue("endDate", 0);
            }
          }}
          locale={ko}
          className="h-[300px] rounded-md border shadow justify-center mb-3"
        />
      )}

      {/* 오전, 오후 선택 */}
      {dateActive === "time" && (
        <>
          <div className="flex mb-2">
            <div className="w-1/2">
              <button
                type="button"
                className={`w-full ${
                  timeActive === "AM"
                    ? "font-bold border border-1 border-sky-200"
                    : "font-normal"
                }`}
                onClick={() => setTimeActive("AM")}
              >
                오전
              </button>
            </div>
            <div className="w-1/2">
              <button
                type="button"
                className={`w-full ${
                  timeActive === "PM"
                    ? "font-bold border border-1 border-sky-200"
                    : "font-normal"
                }`}
                onClick={() => setTimeActive("PM")}
              >
                오후
              </button>
            </div>
          </div>

          {/* 시간 선택 */}
          <div className="h-[300px] overflow-hidden hover:overflow-auto border border-1 border-sky-200 rounded-sm">
            {times.map((time) => {
              const useTime = time.time;

              const hour = Math.floor(useTime);
              const minutes = useTime % 1 > 0 ? "30" : "0";

              const label = `${
                timeActive === "AM" ? "오전" : "오후"
              } ${hour}시 ${minutes}분`;
              const value =
                (timeActive === "AM" ? hour : hour + 12) +
                (minutes === "30" ? 0.5 : 0);
              const isSelected = selectedTimes.includes(value);
              return (
                <div key={value} className="bg-white">
                  <button
                    type="button"
                    className={`w-full py-3 border border-sky-200 hover:bg-gray-300 ${
                      isSelected ? "bg-sky-100 hover:bg-sky-100" : ""
                    }`}
                    onClick={() => handleAddTime(value)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      handleRemoveTime(value);
                    }}
                  >
                    {label}
                  </button>
                </div>
              );
            })}
            <div>선택된 시간: {selectedTimes.join(", ")}</div>
          </div>
        </>
      )}

      {/* 제출 버튼 */}
      <Button type="submit" className="w-full border hover:border-sky-500 mt-4">
        생성
      </Button>
    </form>
  );
}

export default Timer;
