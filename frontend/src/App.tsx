import TestHome from "./pages/test-home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestHome />}></Route>
        <Route path="/example" element={<TestHome />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
