// 로그인 되었는지 확인, 권한이 있는지 확인
// 로그인를 하고 권한을 알려주는 컨트롤러 필요

import { useState } from "react";
import AdminMain from "./main/adminMainMain";
import LoginMain from "./main/loginMain";
import GuestMain from "./main/guestMain";

function Main() {
    const [user, setUser] = useState({
        email : "",
        auth : ""
    });
    if(user.auth == "admin") {
        return <AdminMain></AdminMain>
    } else if(user.auth == "user") {
        return <LoginMain></LoginMain>
    }
    return <GuestMain></GuestMain>
}

export default Main;