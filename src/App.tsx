import "./App.css";
import LoginAuth from "./Auth/LoginAuth";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="/login" element={<LoginAuth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
