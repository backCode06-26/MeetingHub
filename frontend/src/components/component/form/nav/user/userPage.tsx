import Join from "./join";
import Login from "./login";

function userPage() {
  return (
    <>
      <div className="flex gap-2">
        <Login></Login>
        <Join></Join>
      </div>
    </>
  );
}

export default userPage;
