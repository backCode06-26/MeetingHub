import "./App.css";
import { Route, Routes } from "react-router-dom";
import GuestMain from "./components/component/main/guestMain";
import AdminMain from "./components/component/main/adminMainMain";
import LoginMain from "./components/component/main/loginMain";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GuestMain />}></Route>
      <Route path="/login" element={<LoginMain />}></Route>
      <Route path="/admin" element={<AdminMain />}></Route>
    </Routes>
  );
}

export default App;
