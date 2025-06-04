import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type User = {
  username: string;
  role: string;
};

interface UserProfileProps {
  user: User;
  onLogout: () => void;
}

function UserProfile({ user, onLogout }: UserProfileProps) {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>내 정보</CardTitle>
      </CardHeader>
      <CardContent>
        {user.role === "ROLE_ADMIN" && <div className="mb-5"> 관리자 화면입니다.</div>}
        <div className="flex items-center justify-center gap-3">
          <strong>닉네임:</strong> {user.username}
          <Button variant="outline" onClick={onLogout}>로그아웃</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserProfile;
