import Join from "./join";
import Login from "./login";
import logo from "@/assets/pnjl44_j6pb-0_logo.jpg";

function LoginPage() {
    return (
        <>
            <div className="flex justify-between m-2 items-center">
                <img src={logo} alt="로고" className="h-10" />
                <div className="flex gap-2">
                    <Login></Login>
                    <Join></Join>
                </div>
            </div>
        </>
    );
}

export default LoginPage;