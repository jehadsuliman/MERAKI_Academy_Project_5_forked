import { createBrowserRouter } from "react-router-dom";
import ShopLogin from "../layouts/Shop/Login";
import UpdateShop from "../layouts/Shop/UpdateShop";
import RegisterUserOrAdmin from "../layouts/Admin/RegisterAdmin&User"
import Main from "../pages/Shop/Main";
import ShopRegister from "../layouts/Shop/Register"
import LoginUserOrAdmin from "../layouts/Admin/LoginAdmin&User";
import SubCategoryList from "../layouts/Shop/SubCategoryList";
import AddProduct from "../layouts/Shop/CreateProduct";
import HomePageAdmin from "../pages/Admin/HomePageAdmin";



export const router = createBrowserRouter([
 
  {
    path: "/h",
    element: <HomePageAdmin />,
  },
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