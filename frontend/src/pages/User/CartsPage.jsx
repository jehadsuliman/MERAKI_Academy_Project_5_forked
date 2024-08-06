import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../../layouts/User/Navbar";
import FooterComponent from "../../layouts/User/Footer";

const HomePageUser = () => {
  return (
    <div>
      <header>
        <NavbarComponent />
      </header>
      <main>
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
};

export default HomePageUser;
