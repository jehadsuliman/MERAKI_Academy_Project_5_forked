import React from "react";
import { Outlet } from "react-router-dom";
import NavbarAnotherPage from "../../layouts/User/NavbarAnotherPage";
import FooterComponent from "../../layouts/User/Footer";
const HomePageUser = () => {
  return (
    <div>
      <header>

      <NavbarAnotherPage />
      </header>
      <main>
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
};

export default HomePageUser;
