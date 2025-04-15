import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import MyPage from "../form/myPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import List from "../form/list";

type Room = {
  roomName: string;
};

function AdminMain() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ username: "", email: "", role: "" });

  const [roomName, setRoomName] = useState<Room | null>();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/api/user/info", { withCredentials: true })
      .then((response) => {
        console.log("로그인한 사용자 정보:", response.data);

        const { username, email, role } = response.data;
        setUser({ username: username, email: email, role: role });

        if (response.data.role !== "ROLE_ADMIN") {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("로그인 정보 가져오기 실패:", err);
        navigate("/");
      });
  }, []);

  // 회의실 추가
  function addRoom() {
    console.log(roomName);
    axios
      .post("/api/room/create", roomName)
      .then((response) => {
        alert("회의실 생성이 완료되었습니다!");
        console.log(response);

        setRoomName(null);
        setOpen(false);
      })
      .catch((err) => {
        alert("회의실 생성을 실패했습니다!");
        console.log(err);
      });
  }

  return (
    <>
      <MyPage username={user.username} role={user.role} />
      <List></List>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger
          onClick={() => setOpen(true)}
          className="m-5 p-2 text-base border-gray-300 rounded-md border hover:border-sky-500 hover:bg-gray-200 transition-colors duration-500"
        >
          회의실 생성
        </DrawerTrigger>
        <DrawerContent className="w-[50%] m-auto">
          <DrawerHeader>
            <DrawerTitle>회의실 생성</DrawerTitle>
            <DrawerDescription>
              회의실의 이름을 입력하여 회의실을 생성해주세요!
            </DrawerDescription>
            <Input
              type="text"
              placeholder="회의실의 이름을 입력해주세요"
              className="m-1"
              onChange={(e) => {
                setRoomName({ roomName: e.target.value });
              }}
            />
          </DrawerHeader>

          <DrawerFooter>
            <Button className="border hover:border-sky-500" onClick={addRoom}>
              생성
            </Button>
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

export default AdminMain;
