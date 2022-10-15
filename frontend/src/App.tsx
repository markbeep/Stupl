import TestHome from "./pages/test-home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Konsti } from "./pages/konsti";
import { Yanick } from "./pages/Yanick";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/example" element={<TestHome />}></Route>
        <Route path="/konsti" element={<Konsti />}></Route>
        <Route path="/yanick" element={<Yanick />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
