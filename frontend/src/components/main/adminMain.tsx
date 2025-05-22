import { useState } from "react";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import MyPage from "../component/form/nav/myPage";
import RoomPage from "../component/form/roomPage";

import ListTab from "../component/tab/ListTab";
import ReserList from "../component/list/reserList";

function AdminMain() {
  const [open, setOpen] = useState(false);

  const tabItems = [
    {
      key: "after",
      label: "현재 예약",
      component: <ReserList key="after" url={"after"} isEdit={true} />,
    },
    {
      key: "all",
      label: "전체 예약",
      component: <ReserList key="all" url={"all"} />,
    },
    {
      key: "before",
      label: "지난 예약",
      component: <ReserList key="before" url={"before"} />,
    },
  ];

  return (
    <>
      <MyPage />
      <ListTab tabs={tabItems}></ListTab>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger
          onClick={() => setOpen(true)}
          className="m-5 p-2 text-base border-gray-300 rounded-md border hover:border-sky-500 hover:bg-gray-200 transition-colors duration-500"
        >
          회의실 관리
        </DrawerTrigger>
        <RoomPage></RoomPage>
      </Drawer>
    </>
  );
}

export default AdminMain;
