import React from "react";
import { Outlet } from "react-router-dom";
import FooterComponent from "../../layouts/User/Footer";
import NavbarSupport from "../../layouts/User/NavbarSupport";
const HomePageUser = () => {
  return (
    <div>
      <header>

        <NavbarSupport  />
      </header>
      <main>
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
};

export default HomePageUser;
