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
import LogoutAdmin from "../layouts/Admin/LogoutAdmin";
import FooterComponent from "../layouts/User/Footer";
import Products from "../layouts/User/Products";
import Categories from "../layouts/User/Categories";
import ProductDetails from "../layouts/User/ProductDetails";
import HomePageUser from "../pages/User/HomePageUser";
import FaqComponent from "../layouts/User/FaqComponents";
import PageNotFound from "../layouts/User/PageNotFound";
import OrderAccept from "../layouts/User/OrderAccept";
import HomePageRegister from "../pages/Register/HomePageRegister";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageUser />,
    children: [
      {
        path: "/",
        element: <Products />,
      },
    ],
  },
  {
    path: "/not",
    element: <PageNotFound />,
  },
  {
    path: "/faq",
    element: <FaqComponent />,
  },
  {
    path: "/acc",
    element: <OrderAccept />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/categories",
    element: <Categories />,
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
  {
    path: "/LogoutAdmin",
    element: <LogoutAdmin />,
  },
  {
    path: "/R",
    element: <HomePageRegister />,
  },
]);
