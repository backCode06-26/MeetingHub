import logo from "@/assets/유플러스시스템_로고.png";
import axios from "axios";
import { useEffect, useState } from "react";
import UserPage from "./user/userPage";
import AdminPage from "./admin/adminPage";

function NavPage() {

    const [auth, setAuth] = useState(null);

    useEffect(() => {
        axios.get("/api/user/info")
        .then((res) => {
            console.log(res)
            setAuth(res.data.role);
        })
    }, [])

    return (
        <div className="flex justify-between m-2 items-center">
                <img src={logo} alt="로고" className="w-[20%]" />
                {auth === "ROLE_ADMIN" || auth === "ROLE_USER" ? <AdminPage /> : <UserPage />}
        </div>
    )

}

export default NavPage;