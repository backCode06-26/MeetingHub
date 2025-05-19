import { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
} from "@/components/ui/drawer";
import "react-datepicker/dist/react-datepicker.css";

import MyPage from "../component/form/nav/myPage";
import ReserPage from "../component/form/reserPage";
import ListTab from "../component/tab/ListTab";
import ReserList from "../component/list/ReserList";

function BoardMain() {
  const [open, setOpen] = useState<boolean>(false);

  const tabItems = [
    { key: "all", label: "전체 예약", component: <ReserList key="all" url={"all"} /> },
    { key: "user", label: "내 예약", component: <ReserList key="user" url={"user"} isEdit={true} /> },
  ];
  
  return (
    <>
      <MyPage />
      <ListTab tabs = {tabItems}></ListTab>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="m-5 p-2 text-base border-gray-300 rounded-md border hover:border-sky-500 hover:bg-gray-200 transition-colors duration-500">
          회의실 예약
        </DrawerTrigger>
        <ReserPage />
      </Drawer>
    </>
  );
}

export default BoardMain;