import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import qs from 'qs';
import { ChangeEvent, useState } from "react";

function Login() {
  const [loginInfo, setLoginInfo] = useState({email : "", password : ""})
  const [open, setOpen] = useState(false);

  const loginUser = () => {
    if(!checkValidity()) {
      return
    }
    axios.post("/api/loginProc", qs.stringify(loginInfo), {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then((response) => {
        console.log(response.data);
        alert("로그인에 성공하였습니다!");
    
        setLoginInfo({
          email: "",
          password: ""
        });
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      alert("로그인에 실패하였습니다!");
    });
  }

  const checkValidity = () => {
    if(loginInfo.email === "") {
      alert("이메일를 입력해주세요!");
      return false
    } else if(loginInfo.password === "") {
      alert("비밀번호를 입력해주세요!");
      return false
    }
    return true
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {id, value} = e.target;
    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }))
  };

  return (
    <Dialog  open={open} onOpenChange={(isOpen) => {
      if(!isOpen) {
        setLoginInfo(
          {
            email : "", 
            password : ""
          }
        )
        setOpen(false)
      }
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>로그인</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
          <DialogDescription>
            회원가입을 진행한 후에 로그인을 진행해주세요!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              이메일
            </Label>
            <Input
              id="email"
              className="col-span-3"
              value={loginInfo.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              비밀번호
            </Label>
            <Input
              id="password"
              type="password"
              className="col-span-3"
              value={loginInfo.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={loginUser}>
            로그인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Login;