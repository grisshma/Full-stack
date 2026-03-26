import { Outlet } from "react-router-dom";
import Footer from "../Components/global/Footer";
import Navbar from "../Components/Navbar";

const UserLayout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  };
export default UserLayout