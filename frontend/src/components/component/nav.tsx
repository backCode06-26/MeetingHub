import { useState } from "react";
// import axios from "axios";
import logo from "@/assets/pnjl44_j6pb-0_logo.jpg";
import Login from "@/components/component/form/login";
import Join from "@/components/component/form/join";
import MyPage from "./form/myPage";

type User = {
  id: string;
  name: string;
  // 필요하면 더 추가
};

function Nav() {
  const [user] = useState<User | null>(null);

//   useEffect(() => {
//     axios
//       .get("/api/user/me", { withCredentials: true })
//       .then((res) => setUser(res.data as User))
//       .catch((err) => console.log("로그인되지 않음음", err));
//   }, []);

  return (
    <div className="flex justify-between m-2 items-center">
      <img src={logo} alt="로고" className="h-10" />
      <div className="flex gap-2">
        {user ? (
          <MyPage />
        ) : (
          <>
            <Login />
            <Join />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
