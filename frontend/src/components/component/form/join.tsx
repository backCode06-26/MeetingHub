import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { ChangeEvent, useState } from "react"

function Join() {
  const [joinInfo, setjoinInfo] = useState({username : "", email : "", password : ""});
  const [open, setOpen] = useState(false);

  const joinUser = () => {
    if(!checkValidity()) {
      return
    }
    axios.post("/api/user/create", joinInfo)
    .then((response) => {
      console.log(response.data);
      alert("회원가입에 성공하였습니다!");

      setjoinInfo(
        {
          username : "", 
          email : "", 
          password : ""
        }
      )
      setOpen(false)
    })
    .catch((error) => {
      console.log(error);
      alert("회원가입에 실패하였습니다!");
    });
  };

  const checkValidity = () => {
    if(joinInfo.username === "") {
      alert("닉네임를 입력해주세요!");
      return false
    } else if(joinInfo.email === "") {
      alert("이메일를 입력해주세요!");
      return false
    } else if(joinInfo.password === "") {
      alert("비밀번호를 입력해주세요!");
      return false
    }
    return true
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setjoinInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if(!isOpen) {
        setjoinInfo(
          {
            username : "", 
            email : "", 
            password : ""
          }
        )
        setOpen(false)
      }
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>회원가입</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>회원가입</DialogTitle>
          <DialogDescription>
            회원가입이 되었다면 로그인을 해주세요!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              닉네임
            </Label>
            <Input 
              id="username" 
              className="col-span-3" 
              value={joinInfo.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              이메일
            </Label>
            <Input 
              id="email" 
              className="col-span-3" 
              value={joinInfo.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              비밀번호
            </Label>
            <Input 
              id="password" 
              className="col-span-3" 
              type="password"
              value={joinInfo.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={joinUser}>회원가입</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Join;