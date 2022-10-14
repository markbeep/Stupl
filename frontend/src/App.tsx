import TestHome from "./pages/test-home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useState } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestHome />}></Route>
        <Route path="/example" element={<TestHome />}></Route>
        <Route path="/konsti" element={<Konsti />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const Konsti = () => {
  const [counter, setCounter] = useState(0);

  return <div>{counter} </div>;
};
