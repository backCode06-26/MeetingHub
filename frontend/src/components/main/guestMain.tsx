import LoginPage from "../component/form/nav/loginPage";

function GuestMain() {

  return (
    <>
      <LoginPage></LoginPage>
      
      <div className="text-center">
        <h3 className="text-[20px] mt-[10px]">환영합니다!</h3>
        <p>로그인을 한 후에 예약내역을 확인해주세요.</p>
      </div>

    </>
  );
}

export default GuestMain;