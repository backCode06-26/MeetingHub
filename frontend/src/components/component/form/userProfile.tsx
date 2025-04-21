import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type User = {
  username: string
  role: string
}

interface UserProfileProps {
  user: User
  onLogout: () => void
}

function UserProfile({ user, onLogout }: UserProfileProps) {
  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>내 정보</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <div>
          <strong>닉네임:</strong> {user.username}
        </div>
        <div>
          <strong>권한:</strong> {user.role}
        </div>
        <Button variant="outline" onClick={onLogout}>
          로그아웃
        </Button>
      </CardContent>
    </Card>
  )
}

export default UserProfile
