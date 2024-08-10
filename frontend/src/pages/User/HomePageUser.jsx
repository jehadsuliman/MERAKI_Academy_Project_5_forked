import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../../layouts/User/Navbar";
import FooterComponent from "../../layouts/User/Footer";
import SlideImage from "../../layouts/User/SlideImage";
import Categories from "../../layouts/User/Categories";

const HomePageUser = () => {
  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <header>
        <NavbarComponent />
        <SlideImage />
        <Categories />
      </header>
      <main style={{ backgroundColor: "#F5F5F5" }}>
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
};

export default HomePageUser;
