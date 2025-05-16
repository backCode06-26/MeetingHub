import { useState } from "react";
import AllReserList from "../list/allReserList";
import MyReserList from "../list/myReserList";

function BoardTab() {
    const [active, setActive] = useState<"all" | "my">("all")
    return (
        <>
            <div className="flex space-x-2 ">
                <button onClick={() => setActive("all")} className={`w-[100px] h-[50px] rounded-sm ${active === "all" ? "bg-sky-300 text-white" : "bg-gray-300"}`}>
                    전체 예약
                </button>
                <button onClick={() => setActive("my")} className={`w-[100px] h-[50px] rounded-sm ${active === "my" ? "bg-sky-300 text-white" : "bg-gray-300"}`}>
                    내 예약
                </button>
            </div>
            <div className="mt-4">
                {active === "all" && <AllReserList />}
                {active === "my" && <MyReserList />}
            </div>
        </>
    );
}

export default BoardTab;