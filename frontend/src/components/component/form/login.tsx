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
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import qs from "qs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

function Login() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("유효한 이메일을 입력해주세요!")
      .required("이메일을 입력해주세요!"),
    password: yup.string().required("비밀번호를 입력해주세요!"),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const pageNavigate = () => {
    axios
      .get("/api/user/info", { withCredentials: true })
      .then((response) => {
        const role = response.data.role;
        console.log("사용자 정보:", response.data);

        if (role === "ROLE_ADMIN") {
          navigate("/admin");
        } else {
          navigate("/board");
        }
      })
      .catch((err) => {
        console.log("로그인 정보 가져오기 실패:", err);
        navigate("/");
      });
  };

  const loginProc = (data: { email: string; password: string }) => {
    // 로그인 처리
    axios
      .post("/api/loginProc", qs.stringify(data), {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(() => {
        alert("로그인에 성공하였습니다!");
        setOpen(false);
        pageNavigate();
      })
      .catch((error) => {
        console.log(error);
        alert("로그인에 실패하였습니다!");
      });
  };

  const onError = (errors: any) => {
    if (errors.email) {
      alert(errors.email.message);
    } else if (errors.password) {
      alert(errors.password.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          로그인
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(loginProc, onError)}>
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
                type="text"
                className="col-span-3"
                {...register("email")}
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
                {...register("password")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">로그인</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
