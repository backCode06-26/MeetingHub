import { useState } from "react";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import "react-datepicker/dist/react-datepicker.css";

import ReserPage from "../component/form/reserPage";
import ListTab from "../component/tab/ListTab";
import NavPage from "../component/form/nav/navPage";

type Reser = {
  id: number;
  username: string;
  roomName: string;
  reserDate: Date;
  startDate: number;
  endDate: number;
};

function BoardMain() {
  // 예약폼의 토클을 조절함함
  const [open, setOpen] = useState<boolean>(false);

  // 예약이 추가되었을때 바로 동기화될 수 있게 하기 위해 앞에서 만듬
  const [reserList, setReserList] = useState<Reser[]>([]);

  const tabItems = [
    {
      key: "all",
      label: "전체 예약",
      url: "/api/reser/all",
      reserList: reserList,
      setReserList: setReserList,
    },
    {
      key: "user",
      label: "내 예약",
      url: "/api/reser/user",
      reserList: reserList,
      setReserList: setReserList,
      isEdit: true,
    },
  ];

  const [activeKey, setActiveKey] = useState(tabItems[0].key);
  
  return (
    <>
      <NavPage></NavPage>
      <ListTab
        tabs={tabItems}
        activeKey={{ key: activeKey, setKey: setActiveKey }}
      ></ListTab>

      {/* 회의실 예약 폼 */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="m-5 p-2 text-base border-gray-300 rounded-md border hover:border-sky-500 hover:bg-gray-200 transition-colors duration-500">
          회의실 예약
        </DrawerTrigger>
        <ReserPage
          reserList={reserList}
          setReserList={setReserList}
          setOpen={setOpen}
          tabs={tabItems}
          setKey={setActiveKey}
        />
      </Drawer>
    </>
  );
}

export default BoardMain;
