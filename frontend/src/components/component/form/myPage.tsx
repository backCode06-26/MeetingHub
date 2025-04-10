import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserProfile from "@/components/component/form/userProfile";
import logo from "@/assets/pnjl44_j6pb-0_logo.jpg";
import { useState, useEffect } from "react";

type pageProps = {
  username: string;
  role: string;
};

function MyPage({ username, role }: pageProps) {
  const navigate = useNavigate();

  const [user, setUser] = useState({ username: "", role: "" });

  useEffect(() => {
    setUser({
      username: username,
      role: role
    });
  }, [username, role]);

  // 로그아웃
  const handleLogout = () => {
    if (confirm("정말로 로그아웃을 하시겠습니까?")) {
      axios
        .post("/api/logout", {}, { withCredentials: true })
        .then(() => {
          navigate("/");
        });
    }
  };

  if (!user.username) return <div>로그인 정보를 불러오는 중...</div>;

  return (
    <div className="flex justify-between m-2 items-center">
      <img src={logo} alt="로고" className="h-10" />
      <div className="flex gap-2">
        <UserProfile user={user} onLogout={handleLogout} />
      </div>
    </div>
  );
}

export default MyPage;
