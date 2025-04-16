import { useState, useEffect } from "react";
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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
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

  const [roomName, setRoomName] = useState<string>("");

  // 수정된 회의실
  const [updateList, setUpdateList] = useState<Room[]>([]);

  const handleChange = (id: number, newName: string) => {
    setRoomList((prevList: Room[]) =>
      prevList.map((room: Room) =>
        room.id === id ? { ...room, roomName: newName } : room
      )
    );
    setUpdateList((prev) => [...prev, { id: id, roomName: newName }]);
  };

  // 회의실 추가
  function addRoom() {
    console.log(roomName);
    axios
      .post(
        "/api/room/create",
        {
          roomName: roomName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert("회의실 생성이 완료되었습니다!");
        console.log("새로운 회의실", response.data);

        const newRoom = {
          id: response.data.id,
          roomName: response.data.roomName,
        };
        setRoomName("");
        setRoomList((prevList) => [...prevList, newRoom]);
      })
      .catch((err) => {
        alert("회의실 생성을 실패했습니다!");
        console.log(err);
      });
  }

  // 회의실 수정
  const updateRoom = () => {
    const requests = updateList.map((room) => {
      axios.patch("/api/room/update", room);
    });

    Promise.all(requests)
      .then((response) => {
        alert("회의실 수정이 완료되었습니다.");
        console.log("회의실 수정", response);
      })
      .catch((err) => {
        alert("회의실 수정을 실패했습니다.");
        console.log("회의실 수정 실패", err);
      });
  };

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

  useEffect(() => {
    axios
      .get("/api/room/all")
      .then((response) => {
        console.log("회의실 정보", response);
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

  return (
    <DrawerContent className="w-[50%] m-auto">
      <DrawerHeader>
        <DrawerTitle>회의실 관리</DrawerTitle>
        <DrawerDescription>
          회의실을 생성 또는 회의실의 정보를 수정 할 수 있으며, 삭제 또한
          가능합니다!
        </DrawerDescription>

        {/* 회의실 리스트, 거기에서 더블클릭으로 회의실 정보 수정, 버튼으로 삭제 */}
        <div className="max-h-60 overflow-auto">
          <Table className="w-[50%] m-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-center">회의실</TableHead>
                <TableHead className="text-center">삭제</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roomList.map((data) => {
                return (
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
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* 회의실 생성 */}
        <Input
          type="text"
          placeholder="회의실의 이름을 입력해주세요"
          className="m-1"
          value={roomName}
          onChange={(e) => {
            setRoomName(e.target.value);
          }}
        />
      </DrawerHeader>

      <DrawerFooter>
        <div className="flex justify-between flex-wrap">
          <Button
            className="w-[50%] border hover:border-sky-500"
            onClick={addRoom}
          >
            생성
          </Button>
          <Button
            className="w-[50%] border hover:border-sky-500"
            onClick={updateRoom}
          >
            저장
          </Button>
        </div>
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
  );
}

export default RoomList;
