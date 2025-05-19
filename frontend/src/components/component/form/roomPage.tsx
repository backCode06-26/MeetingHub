import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import axios from "axios";
import { Input } from "@/components/ui/input";

type Room = {
  id: number;
  roomName: string;
};

function RoomList() {
  // 기존의 회의실
  const [roomList, setRoomList] = useState<Room[]>([]);

  // 수정된 회의실
  const [updateList, setUpdateList] = useState<Room[]>([]);

  const schema = yup.object().shape({
    roomName: yup.string().required("회의실 이름을 입력해주세요!"),
  });

  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  // 회의실 삭제
  const deleteRoom = (id: number) => {
    if (confirm("정말로 삭제하시겠습니다?")) {
      axios
        .delete(`api/room/delete/${id}`)
        .then((response) => {
          alert("회의실 삭제가 완료되었습니다!");
          console.log(response);

          // 삭제 후 값이 바로 변경되게 처리
          setRoomList((prevList) => prevList.filter((room) => room.id !== id));
        })
        .catch((error) => {
          alert("회의실 삭제를 실패하였습니다!");
          console.error(error);
        });
    }
  };

  // 회의실의 정보 수정
  const handleChange = (id: number, newName: string) => {
    // 수정된 값이 바로 보이게 수정
    setRoomList((prevList: Room[]) =>
      prevList.map((room: Room) =>
        room.id === id ? { ...room, roomName: newName } : room
      )
    );

    // DB로 따로 보내야하는 값은 따로 저장
    setUpdateList((prev) => [...prev, { id: id, roomName: newName }]);
  };

  // 회의실 수정
  const updateRoom = () => {
    const requests = updateList.map((room) => {
      axios.patch("/api/room/update", room);
    });

    // 모든 처리가 끝나고 성공한다면 알림림
    Promise.all(requests)
      .then((response) => {
        alert("회의실 수정이 완료되었습니다.");
        console.log("회의실 수정", response);
      })
      // 처리 하는 도중에 실패하면 알림
      .catch((err) => {
        alert("회의실 수정을 실패했습니다.");
        console.log("회의실 수정 실패", err);
      });
  };

  // 회의실 정보 가져오기기
  useEffect(() => {
    axios
      .get("/api/room/all")
      .then((response) => {
        console.log("회의실 정보", response);

        // 가져온 데이터 저장장
        const roomData: Room[] = response.data.map((room: any) => ({
          id: room.id,
          roomName: room.roomName,
        }));
        setRoomList(roomData);
      })
      .catch((error) => {
        console.error("회의실 정보 가져오기 실패", error);
      });
  }, []);

  // 회의실 추가
  function createRoom(data: { roomName: string }) {
    console.log(data.roomName);
    axios
      .post(
        "/api/room/create",
        { roomName: data.roomName },
        // 다른 형식으로 가는 에러가 있어서 수정정
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        alert("회의실 생성이 완료되었습니다!");
        console.log("새로운 회의실", response.data);

        const newRoom = {
          id: response.data.id,
          roomName: response.data.roomName,
        };
        setValue("roomName", "");
        setRoomList((prevList) => [...prevList, newRoom]);
      })
      .catch((err) => {
        alert("회의실 생성을 실패했습니다!");
        console.log(err);
      });
  }

  const onError = (errors: any) => {
    if (errors.roomName) {
      alert(errors.roomName.message);
    }
  };

  return (
    <DrawerContent className="w-[50%] mx-auto">
      <DrawerHeader>
        <DrawerTitle>회의실 관리</DrawerTitle>
        <DrawerDescription>
          회의실은 수정, 생성, 삭제할 수 있습니다. 수정은 항목을 클릭하고 저장,
          생성은 이름 입력 후 생성 버튼 클릭, 삭제는 삭제 버튼을 누르면 됩니다.
        </DrawerDescription>

        {/* 회의실 리스트 */}
        <div className="max-h-60 overflow-auto">
          <Table className="w-[50%] m-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-center">회의실</TableHead>
                <TableHead className="text-center">삭제</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roomList.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="font-medium text-center">
                    <Input
                      type="text"
                      value={data.roomName}
                      onChange={(e) => handleChange(data.id, e.target.value)}
                      className="text-center border border-none shadow-none"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      onClick={() => deleteRoom(data.id)}
                    >
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  <Button
                    type="button"
                    className="w-[100%] border hover:border-sky-500"
                    onClick={updateRoom}
                  >
                    저장
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* 생성용 form만 별도 감싸기 */}
        <form onSubmit={handleSubmit(createRoom, onError)}>
          <Input
            type="text"
            placeholder="회의실의 이름을 입력해주세요"
            className="w-full mb-1"
            {...register("roomName")}
          />
          <Button type="submit" className="w-full mb-1 border hover:border-sky-500">
            생성
          </Button>
          <DrawerClose className="w-full">
            <Button
              variant="outline"
              type="button"
              className=" w-[100%] shadow-none hover:bg-gray-200 border hover:border-sky-500"
            >
              취소
            </Button>
          </DrawerClose>
        </form>
      </DrawerHeader>
    </DrawerContent>
  );
}

export default RoomList;
