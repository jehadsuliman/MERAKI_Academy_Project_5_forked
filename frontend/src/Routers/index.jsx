import { createBrowserRouter } from "react-router-dom";
import RegisterUserOrAdmin from "../layouts/Admin/RegisterAdmin&User";
import LoginUserOrAdmin from "../layouts/Admin/LoginAdmin&User";
import ShopRegister from "../layouts/Shop/Register";
import ShopLogin from "../layouts/Shop/Login";
import UpdateShop from "../layouts/Shop/UpdateShop";
import ProductsBySubCategory from "../layouts/Shop/ProductsBySubCategory";
import ProductDetail from "../layouts/Shop/ProductDetail";
import HomePageAdmin from "../pages/Admin/HomePageAdmin";
import SlideImage from "../layouts/User/SlideImage";
import HomePageShop from "../pages/Shop/HomePageShop";
import Logout from "../layouts/Shop/Logout";
import ProfileShop from "../layouts/Shop/ProfileShop";
import LogoutAdmin from "../layouts/Admin/LogoutAdmin";
import Products from "../layouts/User/Products";
import Categories from "../layouts/User/Categories";
import ProductDetails from "../layouts/User/ProductDetails";
import HomePageUser from "../pages/User/HomePageUser";
import ProductDetailsPage from "../pages/User/ProductDetailsPage";
import CartsPage from "../pages/User/CartsPage";
import FavoritePage from "../pages/User/FavoritePage";
import FaqComponent from "../layouts/User/FaqComponents";
import PageNotFound from "../layouts/User/PageNotFound";
import OrderAccept from "../layouts/User/OrderAccept";
import Carts from "../layouts/User/Carts";
import FavoriteList from "../layouts/User/FavoriteList";
import SupportPage from "../pages/User/SupportPage";
import Comment from "../layouts/User/Comment";
import Address from "../layouts/User/Address";
import PaymentForm from "../layouts/User/PaymentForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageUser />,
    children: [
      {
        path: "/slide",
        element: <SlideImage />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/",
        element: <Products />,
      },
    ],
  },
  {
    path: "/",
    element: <ProductDetailsPage />,
    children: [
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
    ],
  },

  {
    path: "/",
    element: <CartsPage />,
    children: [
      {
        path: "/carts",
        element: <Carts />,
      },
    ],
  },
  {
    path: "/",
    element: <FavoritePage />,
    children: [
      {
        path: "/favorite",
        element: <FavoriteList />,
      },
    ],
  },
  {
    path: "/",
    element: <SupportPage />,
    children: [
      {
        path: "/faq",
        element: <FaqComponent />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },

  {
    path: "/orderAccept",
    element: <OrderAccept />,
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
    path: "/comments",
    element: <Comment />,
  },
  {
    path: "/address",
    element: <Address />,
  },
  {
    path: "/payment",
    element: <PaymentForm />,
  },
  //Register & Login
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
]);
