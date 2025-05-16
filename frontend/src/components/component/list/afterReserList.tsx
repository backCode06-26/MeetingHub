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
function List() {
  const navigate = useNavigate();

  const [reserList, setReserList] = useState<Reser[]>([]);

  useEffect(() => {
    // 로그인 정보 가져오기
    axios
      .get("/api/user/info", { withCredentials: true })
      .then((response) => {
        console.log("로그인한 사용자 정보:", response.data);

        if (response.data.role === "ROLE_ADMIN") {
          navigate("/admin");
        }
      })
      .catch((err) => {
        console.log("로그인 정보 가져오기 실패:", err);
        navigate("/");
      });

    // 예약 정보 가져오기
    axios
      .get("/api/reser/all")
      .then((response) => {
        const reserData: Reser[] = response.data.map((data: any) => ({
          id: data.id,
          username: data.username,
          roomName: data.roomName,
          reserDate: new Date(data.reserDate),
          useTime: new Date(data.useTime),
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

            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default List;
