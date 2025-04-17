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
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

function Join() {
  const [open, setOpen] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required("이름을 입력해주세요!"),
    email: yup
      .string()
      .email("유효한 이메일을 입력해주세요!")
      .required("이메일을 입력해주세요!"),
    password: yup
      .string()
      .required("비밀번호를 입력해주세요!")
      .matches(
        /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
        "비밀번호는 8~20자, 대문자/소문자/숫자/특수문자를 포함해야 합니다."
      ),
  });

  const { register, handleSubmit } = useForm({
      resolver: yupResolver(schema),
    });

  const joinProc = (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    axios
      .post("/api/user/create", data)
      .then((response) => {
        console.log(response.data);
        alert("회원가입에 성공하였습니다!");
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
        alert("회원가입에 실패하였습니다!");
      });
  };

  const onError = (errors : any) => {
    if(errors.username) {
      alert(errors.username.message)
    } else if(errors.email) {
      alert(errors.email.message)
    } else if(errors.password) {
      alert(errors.password.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          회원가입
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(joinProc, onError)}>
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
                {...register("username")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                이메일
              </Label>
              <Input
                id="email"
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
                className="col-span-3"
                type="password"
                {...register("password")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              회원가입
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Join;
