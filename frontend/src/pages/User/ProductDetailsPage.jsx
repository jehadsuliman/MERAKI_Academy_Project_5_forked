import React from "react";
import { Outlet } from "react-router-dom";
import FooterComponent from "../../layouts/User/Footer";
import Comments from "../../layouts/User/Comment";
import NavbarAnotherPage from "../../layouts/User/NavbarAnotherPage";

const HomePageUser = () => {
  return (
    <div style={{backgroundColor: "#F5F5F5"}}>
      
      <header>
      <NavbarAnotherPage />
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
