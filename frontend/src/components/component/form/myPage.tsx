import { useEffect, useState } from "react"
import axios from "axios"
import UserProfile from "@/components/component/form/userProfile"

function MyPage() {
  const [user, setUser] = useState({ username : "", role : "" });
  const [isLogin, setLogin] = useState(false);
  if(isLogin) {
    window.location.reload();
  }

  // 로그인
  useEffect(() => {
    axios
      .get("/api/user/info", { withCredentials: true })
      .then((response) => {
        console.log("로그인한 사용자 정보:", response.data);
        setUser({
          username: response.data.username,
          role: response.data.role
        });
        setLogin(true)
      })
      .catch((err) => {
        console.log("로그인 정보 가져오기 실패:", err);
      });
  }, []);

  // 로그아웃
  const handleLogout = () => {
    axios.post("/api/logout", { withCredentials: true }).then(() => {
      setUser({
        username: "",
        role: ""
      });
      if (!localStorage.getItem("reloaded")) {
        localStorage.setItem("reloaded", "true");
        window.location.reload();
      }
    })
  }

  if (!user) return <div>로그인 정보를 불러오는 중...</div>

  return <UserProfile user={user} onLogout={handleLogout} />
}

export default MyPage;
