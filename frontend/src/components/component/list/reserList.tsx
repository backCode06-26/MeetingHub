import { useState, useEffect } from "react";
import { format, isValid } from "date-fns";
import { ko } from "date-fns/locale";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import Timer from "../form/timer";

type Reser = {
  id: number;
  username: string;
  roomName: string;
  reserDate: Date;
  startDate: number;
  endDate: number;
};

function formatSafe(date: Date | string) {
  const parsed = new Date(date);
  return isValid(parsed)
    ? format(parsed, "yyyy-MM-dd", { locale: ko })
    : "잘못된 날짜";
}

function formatTimeRange(startDate: number, endDate: number) {
  function formatHour(hourFloat: number) {
    const isPM = hourFloat >= 12;
    // 시간, 분
    const hour = Math.floor(hourFloat);
    const minute = hourFloat % 1 > 0 ? "30" : "00";

    // 시간이 12의 배수인 경우에는 0으로 표시될 수 있음
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${isPM ? "오후" : "오전"} ${displayHour}:${minute}`;
  }

  return `${formatHour(startDate)} ~ ${formatHour(endDate)}`;
}

type ReserListProps = {
  url: string;
  reserList: Reser[];
  setReserList: React.Dispatch<React.SetStateAction<Reser[]>>;
  key: string;
  setKey: React.Dispatch<React.SetStateAction<string>>
  tabs: any[];
  isEdit?: boolean;
};

function ReserList({
  url,
  reserList,
  setReserList,
  key,
  setKey,
  tabs,
  isEdit = false,
}: ReserListProps) {
  const navigate = useNavigate();

  const [openList, setOpenList] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    axios
      .get("/api/user/info", { withCredentials: true })
      .then((response) => {
        if (response.data.role === "ROLE_ADMIN") {
          navigate("/admin");
        }
      })
      .catch(() => navigate("/"));

  }, [navigate]);

  useEffect(() => {
    // 원하는 경로에 있는 정보 가져오기
    axios
      .get(url)
      .then((response) => {
        const reserData: Reser[] = response.data.map((data: any) => ({
          id: data.id,
          username: data.username,
          roomName: data.roomName,
          reserDate: new Date(data.reserDate),
          startDate: data.startDate,
          endDate: data.endDate,
        }));
        setReserList(reserData);
      })
      .catch((error) => {
        console.error("Error fetching reservation data", error);
      });
  }, [key]);

  const isDisabled = (data: any) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    today.setHours(0, 0, 0, 0);

    const currentTime = new Date(data.reserDate);
    currentTime.setHours(0, 0, 0, 0);

    const currentMinutes = now.getHours() + (now.getMinutes() > 30 ? 0.5 : 0);
    
    return (
      currentTime < today ||
      (currentTime.getTime() === today.getTime() && data.endDate <= currentMinutes)
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center">번호</TableHead>
          <TableHead className="text-center">회의실</TableHead>
          <TableHead className="text-center">사용자</TableHead>
          <TableHead className="text-center">예약 시간</TableHead>
          <TableHead className="text-center w-[200px]">사용시간</TableHead>
          {isEdit && <TableHead className="text-center">수정</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {reserList.map((data, index) => (
          <TableRow
            key={data.id}
            className={`${isDisabled(data) ? "text-gray-400" : "text-black"}`}
          >
            <TableCell className="font-medium text-center">
              {index + 1}
            </TableCell>
            <TableCell className="text-center">{data.roomName}</TableCell>
            <TableCell className="text-center">{data.username}</TableCell>

            {/* 날짜 */}
            <TableCell className="text-center">
              {formatSafe(data.reserDate)}
            </TableCell>

            {/* 시간 */}
            <TableCell className="text-center">
              {formatTimeRange(data.startDate, data.endDate)}
            </TableCell>

            {isEdit && (
              <TableCell className="text-center">
                <Dialog
                  open={!!openList[data.id]}
                  onOpenChange={(isOpen) =>
                    setOpenList((prev) => ({ ...prev, [data.id]: isOpen }))
                  }
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" disabled={isDisabled(data)}>
                      수정
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <Timer
                      reserList={reserList}
                      setReserList={setReserList}
                      setOpen={() => setOpenList((prev) => ({ ...prev, [data.id]: false }))}
                      setKey={setKey}
                      tabs={tabs}
                      edit={{isEdit : true, reserId: data.id}}

                    ></Timer>
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
