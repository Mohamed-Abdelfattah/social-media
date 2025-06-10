import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
// import Sidebar from "../../../socialMedia/src/Components/Sidebar";
import Sidebar from "../../pages/userProfile/SideBar";
import { env } from "../../environment/environment";

const BlankLayout = () => {
  const isAuth = !!localStorage.getItem("userToken") || null;
  const profileData = env.loggedUserData;

  return !isAuth ? (
    <Navigate to="/signin" />
  ) : (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar profile={profileData} />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BlankLayout;
