import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerTrigger,
} from "@/components/ui/drawer";
import MyPage from "../form/myPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReserList from "../form/reserList";
import RoomList from "../form/roomList";

function AdminMain() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ username: "", email: "", role: "" });

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

  return (
    <>
      <MyPage />
      <ReserList role={user.role} />

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger
          onClick={() => setOpen(true)}
          className="m-5 p-2 text-base border-gray-300 rounded-md border hover:border-sky-500 hover:bg-gray-200 transition-colors duration-500"
        >
          회의실 관리
        </DrawerTrigger>
        <RoomList></RoomList>
      </Drawer>
    </>
  );
}

export default AdminMain;
