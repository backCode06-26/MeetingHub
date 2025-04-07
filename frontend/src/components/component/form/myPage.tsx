import { useEffect, useState } from "react"
import axios from "axios"
import UserProfile from "@/components/component/form/userProfile"

type User = {
  username: string
  email: string
  role: string
}

function MyPage() {
  const [user, setUser] = useState<User | null>(null)

  // 로그인
  useEffect(() => {
    // axios.get("/api/user/me", { withCredentials: true })
    //   .then((res) => setUser(res.data as User))
    //   .catch((err) => console.error("로그인되지 않음", err))
  }, [])

  // 로그아웃
  const handleLogout = () => {
    // axios.post("/api/logout", { withCredentials: true }).then(() => {
    //   setUser(null)
    //   // 메인화면으로 이동
    // })
  }

  if (!user) return <div>로그인 정보를 불러오는 중...</div>

  return <UserProfile user={user} onLogout={handleLogout} />
}

export default MyPage;
