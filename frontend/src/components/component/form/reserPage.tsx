import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import Timer from "./timer";

type Reser = {
  id: number;
  username: string;
  roomName: string;
  reserDate: Date;
  startDate: number;
  endDate: number;
};

type ReserForm = {
  reserList: Reser[];
  setReserList: React.Dispatch<React.SetStateAction<Reser[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tabs: any[];
  setKey: React.Dispatch<React.SetStateAction<string>>;
};

function ReserPage(toggle: ReserForm) {
  return (
    <DrawerContent className="w-[50%] m-auto">
      <DrawerHeader className="p-5 pb-0">
        <DrawerTitle>회의실 예약</DrawerTitle>
        <DrawerDescription>
          원하는 회의실과 사용 시간, 사용 기간을 선택해주세요
        </DrawerDescription>

        <Timer
          reserList={toggle.reserList}
          setReserList={toggle.setReserList}
          setOpen={() => toggle.setOpen(false)}
          tabs={toggle.tabs}
          setKey={toggle.setKey}
        ></Timer>
      </DrawerHeader>

      <DrawerFooter className="p-5 pt-1">
        <DrawerClose asChild>
          <Button variant="outline">닫기</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}

export default ReserPage;
