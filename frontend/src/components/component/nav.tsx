import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import logo from "@/assets/pnjl44_j6pb-0_logo.jpg";
import Login from "@/components/component/form/login";
import Join from "@/components/component/form/join";

function Nav() {
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    axios
      .get("/api/user/info", { withCredentials: true })
      .then(() => {
        setLogin(true);
      })
      .catch((err) => {
        console.log("로그인 정보 가져오기 실패:", err);
      });
  }, []);

  return (
    <div className="flex justify-between m-2 items-center">
      <img src={logo} alt="로고" className="h-10" />
      <div className="flex gap-2">
      {/* 
        로그인을 하면 MyPage, 로그인을 하지 않았다면 Login, Join
        React Router 사용 예정
       */}
      </div>
    </div>
  );
}

export default Nav;