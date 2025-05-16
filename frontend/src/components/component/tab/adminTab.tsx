import { useState } from "react";
import AllReserList from "../list/allReserList";
import BeforeReserList from "../list/beforReserList";
import AfterReserList from "../list/afterReserList";

function BoardTab() {
    const [active, setActive] = useState<"bf" | "af" | "all">("bf");
    return (
        <>
            <div className="flex space-x-2 ">
                <button onClick={() => setActive("bf")} className={`w-[100px] h-[50px] rounded-sm ${active === "bf" ? "bg-sky-300 text-white" : "bg-gray-300"}`}>
                    현재 예약
                </button>
                <button onClick={() => setActive("all")} className={`w-[100px] h-[50px] rounded-sm ${active === "all" ? "bg-sky-300 text-white" : "bg-gray-300"}`}>
                    전체 예약
                </button>
                <button onClick={() => setActive("af")} className={`w-[100px] h-[50px] rounded-sm ${active === "af" ? "bg-sky-300 text-white" : "bg-gray-300"}`}>
                    지난 예약
                </button>
            </div>
            <div className="mt-4">
                {active === "all" && <AllReserList />}
                {active === "bf" && <BeforeReserList />}
                {active === "af" && <AfterReserList />}
            </div>
        </>
    );
}

export default BoardTab;