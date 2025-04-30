import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
const MainLayout = () => (
  <div>
    <Header />
    <Outlet />
  </div>
);

export default MainLayout;
