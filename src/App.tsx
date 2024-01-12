import { useEffect, useState } from "react";
import "./App.css";
import LoginAuth from "./Auth/LoginAuth";
import RegisterAuth from "./Auth/RegisterAuth";
import HomePage, { LeftPanelProps } from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";

const App = (props: LeftPanelProps) => {
  const [token, setToken] = useState(false);

  // if (token) {
  //   sessionStorage.setItem("token", JSON.stringify(token));
  // }

  // useEffect(() => {
  //   if (sessionStorage.getItem("token")) {
  //     let data = JSON.parse(sessionStorage.getItem("token"));
  //     setToken(data);
  //   }
  // }, []);
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
        <Route path="/" element={<LoginAuth setToken={setToken} />} />
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
          ""
        )}
      </Routes>
    </>
  );
};

export default App;
