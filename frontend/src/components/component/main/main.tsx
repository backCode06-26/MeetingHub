import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function Main() {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/user/info", { withCredentials: true })
        .then(() => {
            console.log("다른 페이지로 이동합니다!");
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => setLoading(false));
    }, []);

    if (isLoading) return <div>로딩중 ...</div>;
        return (
            <Outlet />
        );
}

export default Main;