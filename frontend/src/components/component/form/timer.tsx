import { useEffect, useState } from "react";
import { ko } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import { useForm } from "react-hook-form";
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
  reserId : number;
  email: string;
  roomId: number;
  reserDate: Date;
  startDate: number;
  endDate: number;
};

type Reser = {
  id: number;
  username: string;
  roomName: string;
  reserDate: Date;
  startDate: number;
  endDate: number;
};

type editProps = {
  isEdit: boolean;
  reserId: number;
};

type TimerToggle = {
  reserList: Reser[];
  setReserList: React.Dispatch<React.SetStateAction<Reser[]>>;
  setOpen: () => void;
  tabs: any[];
  setKey: React.Dispatch<React.SetStateAction<string>>;
  edit?: editProps;
};

function Timer({
  reserList,
  setReserList,
  setOpen,
  tabs,
  edit = { isEdit: false, reserId: 0 },
  setKey,
}: TimerToggle) {
  const navigate = useNavigate();

  const yesterDay = new Date();
  yesterDay.setDate(yesterDay.getDate() - 1);

  const [roomActive, setRoomActive] = useState<boolean>(false);
  const [dateActive, setDateActive] = useState<"date" | "time">("date");
  const [timeActive, setTimeActive] = useState<"AM" | "PM">("AM");

  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);
  const [rooms, setRoomList] = useState<Room[]>([]);
  const [times, setTimeList] = useState<Time[] | undefined>(undefined);

  const { handleSubmit, setValue, getValues, reset, register } =
    useForm<FormValues>({
      defaultValues: {
        reserId : edit.reserId,
        email: "",
        roomId: 0,
        reserDate: new Date(),
        startDate: 0,
        endDate: 0,
      },
    });

  useEffect(() => {
    if (edit.isEdit) {
      axios.get(`/api/reser/select/${edit.reserId}`).then((res) => {
        const startDate = res.data.startDate;
        const endDate = res.data.endDate;

        const payload = {
          id : edit.reserId,
          email : getValues("email"),
          roomId: res.data.roomId,
          reserDate: new Date(res.data.reserDate),
          startDate: startDate,
          endDate: endDate,
        };
        reset(payload);

        const times = []
        for(let time=startDate; time<=endDate; time+=0.5) {
          times.push(time);
        }
        setSelectedTimes(times);
      });
    }
  }, [edit]);

  const findRoomName = () => {
    const roomId = getValues("roomId");
    return rooms.find((room) => room.id === roomId)?.roomName;
  };

  useEffect(() => {
    // 회의실 목록 조회
    axios.get("/api/room/all").then((response) => {
      const rooms: Room[] = response.data.map((room: any) => ({
        id: room.id,
        roomName: room.roomName,
      }));
      setRoomList(rooms);
    });

    // 사용자 정보 조회
    axios
      .get("/api/user/info", { withCredentials: true })
      .then(({ data }) => {
        setValue("email", data.email)
      })
      .catch((err) => {
        console.error("로그인 정보 불러오기 실패:", err);
        navigate("/");
      });

    updateSelectTimes(getValues("roomId"));
  }, [navigate, setValue, getValues]);

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

  useEffect(() => {
    updateStartEndDate(selectedTimes);
  }, [selectedTimes, setValue]);

  // 시간을 가져오는 함수
  const updateSelectTimes = (id: number) => {
    const reserDate = format(getValues("reserDate"), "yyyy-MM-dd");
    axios
      .get(`/api/reser/time?roomId=${id}&reserDate=${reserDate}`)
      .then((response) => {
        const times: Time[] = response.data.map((time: number) => ({
          time: time,
        }));

        setTimeList(times);
      });
  };

  // 시간을 추가하는 함수
  const handleAddTime = (value: number) => {
    if (selectedTimes.includes(value)) {
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
    setValue("roomId", selectedRoom.id, { shouldValidate: true });
    setRoomActive(false);
  };

  // 자체 유효성 검사 함수
  const validateForm = (data: FormValues) => {
    if (!data.reserId) {
      alert("예약번호를 확인해주세요");
      return false;
    }
    if (!data.email) {
      alert("이메일을 입력해주시요");
      return false;
    }
    if (!data.roomId || data.roomId === 0) {
      alert("회의실을 선택해주세요");
      return false;
    }
    if (!(data.reserDate instanceof Date) || isNaN(data.reserDate.getTime())) {
      alert("날짜 형식이 올바르지 않습니다!");
      return false;
    }
    if (data.reserDate < yesterDay) {
      alert("오늘 이전의 날짜를 선택할 수 없습니다!");
      return false;
    }
    if (selectedTimes.length === 0) {
      alert("시간을 선택해주세요");
      return false;
    }
    if (selectedTimes.length === 1) {
      alert("2개 이상의 시간을 선택해주세요");
      return false;
    }
    if (selectedTimes.length > 1) {
      if (!data.startDate) {
        alert("시작 시간을 선택해주세요");
        return false;
      }
      if (!data.endDate) {
        alert("종료 시간을 선택해주세요");
        return false;
      }
    }
    return true;
  };

  // 예약 요청 함수
  const createReser = (data: FormValues) => {
    if (!validateForm(data)) return;

    const payload = {
      email: getValues("email"),
      roomId: data.roomId,
      reserDate: format(data.reserDate, "yyyy-MM-dd"),
      startDate: data.startDate,
      endDate: data.endDate,
    };

    const url = edit.isEdit ? "/api/reser/update" : "/api/reser/create";
    const method = edit.isEdit ? axios.patch : axios.post;

    method(url, payload)
      .then((res) => {
        alert("작업이 완료되었습니다.");
        console.log(res.data);

        setKey(tabs[0].key);

        const newList = [res.data, ...reserList];
        newList.sort((a, b) => {
          const dateA = new Date(a.reserDate).getTime();
          const dateB = new Date(b.reserDate).getTime();

          if (a.reserDate !== b.reserDate) {
            return dateB - dateA;
          } else {
            return b.startDate - a.startDate;
          }
        });

        setReserList(newList);
        setOpen();
        reset();

        setSelectedTimes([]);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data || "작업중 중 오류가 발생했습니다.");
      });
  };

  return (
    <form onSubmit={handleSubmit(createReser)} className="w-full m-auto">
      {/* 회의실 선택 */}
      <div
        {...register("roomId")}
        className="relative w-full text-center my-5 z-10"
        onClick={() => setRoomActive(!roomActive)}
      >
        <button
          type="button"
          className="w-full h-[40px] border border-sky-200 rounded-sm"
          onClick={() => setRoomActive((prev) => !prev)}
        >
          {findRoomName() === undefined
            ? "회의실을 선택해주세요!"
            : findRoomName()}
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
          selected={getValues("reserDate")}
          onSelect={(selectedDate: Date | undefined) => {
            if (selectedDate) {
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

          {/* 시간 선택 버튼 */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {!times ? (
              <div className="col-span-4 text-center my-5">
                회의실을 먼저 선택해야지 <br></br>남은 시간을 찾을 수 있습니다.
              </div>
            ) : (
              times
                .filter((t) =>
                  timeActive === "AM" ? t.time < 12 : t.time >= 12
                )
                .map(({ time }) => {
                  const hour = Math.floor(time);
                  const minute = time % 1 === 0.5 ? "30" : "00";

                  return (
                    <button
                      key={time}
                      type="button"
                      className={`rounded border px-2 py-1 ${
                        selectedTimes.includes(time)
                          ? "bg-sky-400 text-white"
                          : "bg-white"
                      }`}
                      onClick={() => {
                        if (selectedTimes.includes(time)) {
                          handleRemoveTime(time);
                        } else {
                          handleAddTime(time);
                        }
                      }}
                    >
                      {hour}:{minute}
                    </button>
                  );
                })
            )}
          </div>
        </>
      )}

      <Button type="submit" className="w-full">
        {edit.isEdit ? "예약 수정" : "예약 수정"}
      </Button>
    </form>
  );
}

export default Timer;
