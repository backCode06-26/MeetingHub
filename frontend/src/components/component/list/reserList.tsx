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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

type Reser = {
  id: number;
  username: string;
  roomName: string;
  reserDate: Date;
  useTime: Date;
};

function formatSafe(date: Date | string) {
  const parsed = new Date(date);
  return isValid(parsed)
    ? format(parsed, "yyyy-MM-dd a hh:mm", { locale: ko })
    : "잘못된 날짜";
}

type ReserListProps = {
  url: string;
  isEdit?: boolean;
};

function ReserList({ url, isEdit = false }: ReserListProps) {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    startDate: yup
      .date()
      .typeError("날짜 형식이 올바르지 않습니다!")
      .min(
        new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        "오늘 이전의 날짜를 선택 할 수 없습니다!"
      )
      .required("날짜를 입력해주세요!"),
    endDate: yup
      .date()
      .typeError("날짜 형식이 올바르지 않습니다!")
      .test(
        "is-time-valid",
        "사용시간은 예약시간보다 최소 5분 이상으로 설정해야합니다!",
        function (value) {
          const { startDate } = this.parent;
          if (!startDate || !value) return true;

          const timeDiff = value.getTime() - startDate.getTime();
          return timeDiff >= 5 * 60 * 1000;
        }
      )
      .required("사용시간을 입력하지 않았습니다!"),
  });

  const { handleSubmit, setValue, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const [reserList, setReserList] = useState<Reser[]>([]);
  const [open, setOpen] = useState<boolean[]>([]);

  const updateReser = (
    id: number,
    data: { startDate: Date; endDate: Date }
  ) => {
    axios
      .patch("/api/reser/update", {
        id: id,
        reserDate: data.startDate,
        useTime: data.endDate,
      })
      .then((response) => {
        alert("시간이 수정되었습니다!");
        const updatedReser: Reser = {
          id: response.data.id,
          username: response.data.user.username,
          roomName: response.data.room.roomName,
          reserDate: new Date(response.data.reserDate),
          useTime: new Date(response.data.useTime),
        };
        setOpen((prevOpen) => {
          const newOpen = [...prevOpen];
          newOpen[id] = false;
          return newOpen;
        });
        setReserList((prev) =>
          prev.map((r) => (r.id === id ? updatedReser : r))
        );
      })
      .catch((err) => {
        alert("시간 수정을 실패하였습니다!");
        console.log(err);
      });
  };

  const onError = (errors: any) => {
    if (errors.startDate) {
      alert(errors.startDate.message);
    } else if (errors.endDate) {
      alert(errors.endDate.message);
    }
  };

  useEffect(() => {
    axios
      .get("/api/user/info", { withCredentials: true })
      .then((response) => {
        if (response.data.role === "ROLE_ADMIN") {
          navigate("/admin");
        }
      })
      .catch(() => navigate("/"));

    axios
      .get("/api/reser/" + url)
      .then((response) => {
        const reserData: Reser[] = response.data.map((data: any) => ({
          id: data.id,
          username: data.username,
          roomName: data.roomName,
          reserDate: new Date(data.reserDate),
          useTime: new Date(data.useTime),
        }));
        setReserList(reserData);
      })
      .catch((error) => {
        console.error("Error fetching reservation data", error);
      });
  }, [url, navigate]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center">번호</TableHead>
          <TableHead className="text-center">회의실</TableHead>
          <TableHead className="text-center">사용자</TableHead>
          <TableHead className="text-center">예약 시간</TableHead>
          <TableHead className="text-right">사용시간</TableHead>
          {isEdit && <TableHead className="text-center">수정</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {reserList.map((data) => (
          <TableRow key={data.id}>
            <TableCell className="font-medium text-center">{data.id}</TableCell>
            <TableCell className="text-center">{data.roomName}</TableCell>
            <TableCell className="text-center">{data.username}</TableCell>
            <TableCell className="text-center">{formatSafe(data.reserDate)}</TableCell>
            <TableCell className="text-right">{formatSafe(data.useTime)}</TableCell>
            {isEdit && (
              <TableCell className="text-center">
                <Dialog
                  open={open[data.id] || false}
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
                    <form
                      onSubmit={handleSubmit(
                        (formData) => updateReser(data.id, formData),
                        onError
                      )}
                    >
                      <DialogHeader>
                        <DialogTitle>정보수정</DialogTitle>
                        <DialogDescription>
                          예약 시간과 사용시간을 수정할 수 있습니다!
                        </DialogDescription>

                        <Popover>
                          <PopoverTrigger asChild className="m-auto">
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[300px] justify-start text-left font-normal",
                                data.reserDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {data.reserDate ? (
                                format(data.reserDate, "yyyy-MM-dd a hh:mm", {
                                  locale: ko,
                                })
                              ) : (
                                <span>날짜를 선택해주세요!</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[400px] p-0 border-none" align="center">
                            <Controller
                              name="startDate"
                              control={control}
                              render={({ field }) => (
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
                              )}
                            />
                          </PopoverContent>
                        </Popover>

                        <Popover>
                          <PopoverTrigger asChild className="m-auto">
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[300px] justify-start text-left font-normal",
                                data.useTime && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {data.useTime ? (
                                format(data.useTime, "yyyy-MM-dd a hh:mm", {
                                  locale: ko,
                                })
                              ) : (
                                <span>날짜를 선택해주세요!</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[400px] p-0 border-none" align="center">
                            <Controller
                              name="endDate"
                              control={control}
                              render={({ field }) => (
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
                              )}
                            />
                          </PopoverContent>
                        </Popover>
                      </DialogHeader>
                      <DialogFooter>
                        <Button type="submit" variant="outline">
                          수정
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            const newOpen = [...open];
                            newOpen[data.id] = false;
                            setOpen(newOpen);
                            setValue("startDate", new Date());
                            setValue("endDate", new Date());
                          }}
                        >
                          닫기
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ReserList;
