import { useEffect, useState } from "react";
import "./App.css";
import LoginAuth from "./Auth/LoginAuth";
import RegisterAuth from "./Auth/RegisterAuth";
import HomePage, { LeftPanelProps } from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import NoPageFound from "./components/NoPageFound";

const App = (props: LeftPanelProps) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const tokenData = sessionStorage.getItem("token");
    if (tokenData) {
      setToken(JSON.parse(tokenData));
    }
  }, []);

  // Store the token in sessionStorage whenever it changes
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(token));
    }
  }, [token]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginAuth />} />
        <Route path="/register" element={<RegisterAuth />} />
        {token ? (
          <Route
            path="/home"
            index
            element={
              <HomePage
                cards={props.cards}
                onCardClick={props.onCardClick}
                selectedCardType={props.selectedCardType}
              />
            }
          />
        ) : (
          <Route path="/nopage" element={<NoPageFound />} />
        )}
      </Routes>
    </>
  );
};

export default App;
