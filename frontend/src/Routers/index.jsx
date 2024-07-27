
import { createBrowserRouter } from "react-router-dom";
import ShopLogin from "../layouts/Shop/Login";
import UpdateShop from "../layouts/Shop/UpdateShop";
import DeleteShop from "../layouts/Shop/DeleteShopById";
import CategoryList from "../layouts/Shop/CategoryList";
import RegisterUserOrAdmin from "../layouts/Admin/RegisterAdmin&User"
import Main from "../pages/Shop/Main";
import ShopRegister from "../layouts/Shop/Register"
import LoginUserOrAdmin from "../layouts/Admin/LoginAdmin&User";
import ShopsList from "../layouts/Admin/ShopsList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
  },
  {
    path: "/RegisterUserOrAdmin",
    element: <RegisterUserOrAdmin />,
  },
  {
    path: "/shop",
    element: <ShopsList />,
  },
  {
    path: "/LoginUserOrAdmin",
    element: <LoginUserOrAdmin />,
  },
  {
    path: "/shopRegister",
    element: <ShopRegister/>,
  },
  {
    path: "/shopLogin",
    element: <ShopLogin />,
  },
  {
    path: "/shopUpdate",
    element: <UpdateShop />,
  },

  {
    path: "/shopDelete",
    element: <DeleteShop />
  },
  {
    path: "/categories",
    element: <CategoryList />
  }

]);

