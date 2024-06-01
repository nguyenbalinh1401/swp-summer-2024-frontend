import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hello from "./components/Hello";
import HelloCopy from "./components/Hello copy";

function App() {
  const [count, setCount] = useState(4);

  return (
    <Routes>
      <Route path="/" element={<Hello />}></Route>
      <Route path="/op" element={<HelloCopy />} />
    </Routes>   
  );
}

export default App;
