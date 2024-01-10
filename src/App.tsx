import "./App.css";
import LoginAuth from "./Auth/LoginAuth";
import HomePage, { LeftPanelProps } from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = (props: LeftPanelProps) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            index
            element={
              <HomePage
                cards={props.cards}
                onCardClick={props.onCardClick}
                selectedCardType={props.selectedCardType}
              />
            }
          />
          <Route path="/login" element={<LoginAuth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
