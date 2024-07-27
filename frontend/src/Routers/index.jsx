import { createBrowserRouter } from "react-router-dom";
import ShopLogin from "../layouts/Shop/Login";
import UpdateShop from "../layouts/Shop/UpdateShop";

import DeleteShop from "../layouts/Shop/DeleteShopById";
import CategoryList from "../layouts/Shop/CategoryList";
import RegisterUserOrAdmin from "../layouts/Admin/RegisterAdmin&User"
import Main from "../pages/Shop/Main";
import ShopRegister from "../layouts/Shop/Register"
import LoginUserOrAdmin from "../layouts/Admin/LoginAdmin&User";
import SubCategoryList from "../layouts/Shop/SubCategoryList";
import RegisterUserOrAdmin from "../layouts/Admin/RegisterAdmin&User/Register";
import Main from "../pages/Shop/Main";
import ShopRegister from "../layouts/Shop/Register";
import LoginUserOrAdmin from "../layouts/Admin/LoginAdmin&User/Login";

import AddProduct from "../layouts/Shop/CreateProduct";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
    path: "/categories",
    element: <SubCategoryList />,
  },
  {
    path: "/products",
    element: <AddProduct />,
  },
]);