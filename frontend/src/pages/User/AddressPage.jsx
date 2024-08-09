import React from 'react'
import NavbarAnotherPage from "../../layouts/User/NavbarAnotherPage";
import FooterComponent from "../../layouts/User/Footer";
import { Outlet } from "react-router-dom";
const AddressPage = () => {
  return (
    <div>   <header>
    <NavbarAnotherPage />
  </header>
  <main>
    <Outlet />
  </main>
  <FooterComponent /></div>
  )
}

export default AddressPage