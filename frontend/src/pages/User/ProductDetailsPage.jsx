import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../../layouts/User/Navbar";
import FooterComponent from "../../layouts/User/Footer";
import Comments from "../../layouts/User/Comment";

const HomePageUser = () => {
  return (
    <div>
      
      <header>
        <NavbarComponent />
      </header>
      
      <main>
        <Outlet />
        <Comments />
      </main>
      
      <footer>
      <FooterComponent />
      </footer>
    
    </div>
  );
};

export default HomePageUser;
