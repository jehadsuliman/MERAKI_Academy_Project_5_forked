import { createBrowserRouter } from "react-router-dom";
import ShopLogin from "../layouts/Shop/Login";
import UpdateShop from "../layouts/Shop/UpdateShop";
import RegisterUserOrAdmin from "../layouts/Admin/RegisterAdmin&User";
import ShopRegister from "../layouts/Shop/Register";
import LoginUserOrAdmin from "../layouts/Admin/LoginAdmin&User";
import ProductsBySubCategory from "../layouts/Shop/ProductsBySubCategory";
import ProductDetail from "../layouts/Shop/ProductDetail";
import HomePageAdmin from "../pages/Admin/HomePageAdmin";
import SlideImage from "../layouts/User/SlideImage";
import HomePageShop from "../pages/Shop/HomePageShop";
import Navbar from "../layouts/User/Navbar";
import Logout from "../layouts/Shop/Logout";
import ProfileShop from "../layouts/Shop/ProfileShop";

import FooterComponent from "../layouts/User/Footer";
import Products from "../layouts/User/Products";
import Categories from "../layouts/User/Categories";


export const router = createBrowserRouter([
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/product",
    element: <Products />,
  },
  {
    path: "/footer",
    element: <FooterComponent />,
  },
  {
    path: "/navbar",
    element: <Navbar />,
  },
  {
    path: "/slide",
    element: <SlideImage />,
  },

  {
    path: "/admin",
    element: <HomePageAdmin />,
  },
  {
    path: "/shop",
    element: <HomePageShop />,
  },
  {
    path: "/RegisterUserOrAdmin",
    element: <RegisterUserOrAdmin />,
  },
  {
    path: "/LoginUserOrAdmin",
    element: <LoginUserOrAdmin />,
  },
  {
    path: "/shopRegister",
    element: <ShopRegister />,
  },
  {
    path: "/shopLogin",
    element: <ShopLogin />,
  },
  {
    path: "/shopUpdate/:id",
    element: <UpdateShop />,
  },

  {
    path: "/productsBySubCategory/:subCategoryId",
    element: <ProductsBySubCategory />,
  },
  {
    path: "/products/:productId",
    element: <ProductDetail />,
  },
  {
    path: "/ProfileShop",
    element: <ProfileShop />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);
