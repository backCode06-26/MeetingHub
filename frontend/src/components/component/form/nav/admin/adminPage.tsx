import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserProfile from "@/components/component/form/nav/admin/userProfile";
import { useState, useEffect } from "react";

type User = {
  username : string;
  email : string;
  role : string;
}

function adminPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    // 로그인 되었는지 확인
    axios
      .get("/api/user/info", { withCredentials: true })
      .then((response) => {
        console.log("로그인한 사용자 정보:", response.data);

        const { username, email, role } = response.data;
        setUser({ username: username, email: email, role: role });
      })
      .catch((err) => {
        console.log("로그인 정보 가져오기 실패:", err);
        navigate("/");
      });
  }, []);

  // 로그아웃
  const handleLogout = () => {
    if (confirm("정말로 로그아웃을 하시겠습니까?")) {
      axios.post("/api/logout", {}, { withCredentials: true }).then(() => {
        navigate("/");
      });
    }
  };

  if (!user?.username) return <div>로그인 정보를 불러오는 중...</div>;

  return (
    <UserProfile user={user} onLogout={handleLogout} />
  );
}

export default adminPage;
