import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const BlankLayout = () => {
  const isAuth = !!localStorage.getItem("userToken");
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default BlankLayout;
