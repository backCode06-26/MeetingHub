import LoginPage from "../form/loginPage";
import ReserList from "../form/reserList";

function GuestMain() {

  return (
    <>
      <LoginPage></LoginPage>
      {/* 로그인 여부에 따라 다른 UI 노출 예정 */}
      <ReserList />
    </>
  );
}

export default GuestMain;