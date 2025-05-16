import "./App.css";
import { Route, Routes } from "react-router-dom";
import GuestMain from "./components/main/guestMain";
import AdminMain from "./components/main/adminMainMain";
import BoardMain from "./components/main/boardMain";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GuestMain />}></Route>
      <Route path="/board" element={<BoardMain />}></Route>
      <Route path="/admin" element={<AdminMain />}></Route>
    </Routes>
  );
}

export default App;
