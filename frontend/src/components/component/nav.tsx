import logo from "@/assets/pnjl44_j6pb-0_logo.jpg"
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

function Nav() {
    return (
        <div className="flex justify-between m-2">
            <img src={logo} alt="" />
            <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">로그인</Button>
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
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                        비밀번호호
                        </Label>
                        <Input
                        id="password"
                        className="col-span-3"
                        />
                    </div>
                    </div>
                    <DialogFooter>
                    <Button type="submit">로그인</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">회원가입</Button>
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
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                        이메일
                        </Label>
                        <Input
                        id="email"
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                        비밀번호
                        </Label>
                        <Input
                        id="password"
                        className="col-span-3"
                        />
                    </div>
                    </div>
                    <DialogFooter>
                    <Button type="submit">회원가입</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            </div>
        </div>
    )
}

export default Nav