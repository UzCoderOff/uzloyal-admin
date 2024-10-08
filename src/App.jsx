import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import MainPanel from "./components/MainPanel";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState()

  const token = localStorage.getItem("token");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://api.dezinfeksiyatashkent.uz/api/auth/me",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setIsAuth(data.success);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="*"
          element={isAuth ? <MainPanel/>  : <Navigate to={"/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
