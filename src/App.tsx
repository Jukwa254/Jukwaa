import { useEffect, useState } from "react";
import "./App.css";
import LoginAuth from "./Auth/LoginAuth";
import RegisterAuth from "./Auth/RegisterAuth";
import HomePage from "./pages/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import NoPageFound from "./components/NoPageFound";
import { SkeletonTheme } from "react-loading-skeleton";
import AdminAuth from "./admin/AdminAuth";
import Dashboard from "./admin/Dashboard";

interface RestrictedRouteProps {
  element: React.ComponentType<any>;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({ element: Element, ...rest }) => {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const userIsSuperAdmin = true;
    setIsSuperAdmin(userIsSuperAdmin);
  }, []);

  if (!isSuperAdmin) {
    return <Navigate to="/dashboard" />;
  }
  return <Element {...rest} />;
};

const App = () => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const tokenData = sessionStorage.getItem("token");
    if (tokenData) {
      setToken(JSON.parse(tokenData));
    }
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(token));
    }
  }, [token]);

  return (
    <>
      <SkeletonTheme baseColor="#F9F9F9" highlightColor="#F4EEE9">
        <Routes>
          <Route path="/" element={<LoginAuth />} />
          <Route path="/register" element={<RegisterAuth />} />
          {token ? (
            <Route path="/home" index element={<HomePage />} />
          ) : (
            <Route path="/nopage" element={<NoPageFound />} />
          )}
          <Route path="/super" element={<AdminAuth />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route
            path="/dashboard"
            element={<RestrictedRoute element={Dashboard} />}
          />
        </Routes>
      </SkeletonTheme>
    </>
  );
};

export default App;
