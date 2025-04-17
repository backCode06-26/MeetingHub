import { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
} from "@/components/ui/drawer";
import MyPage from "../form/myPage";
import ReserList from "../form/reserList";
import RoomList from "../form/roomList";

function AdminMain() {

  const [open, setOpen] = useState(false);

  return (
    <>
      <MyPage />
      <ReserList />

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
