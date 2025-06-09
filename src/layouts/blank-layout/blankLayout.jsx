import { Navigate, Outlet } from "react-router-dom";

const BlankLayout = () => {
  const isAuth = !!localStorage.getItem("userToken") || null;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default BlankLayout;
