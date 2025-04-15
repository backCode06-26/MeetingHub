import LoginPage from "../form/loginPage";
import List from "../form/list";

function GuestMain() {

  return (
    <>
      <LoginPage></LoginPage>
      {/* 로그인 여부에 따라 다른 UI 노출 예정 */}
      <List></List>
    </>
  );
}

export default GuestMain;