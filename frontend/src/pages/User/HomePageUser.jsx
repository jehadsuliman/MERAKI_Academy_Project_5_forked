import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../../layouts/User/Navbar";
import FooterComponent from "../../layouts/User/Footer";
import SlideImage from "../../layouts/User/SlideImage";
import Categories from "../../layouts/User/Categories";
const HomePageUser = () => {
  return (
    <div>
      <header>
        <NavbarComponent  />
        <SlideImage />
        <Categories />
      </header>
      <main>
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
};

export default HomePageUser;
