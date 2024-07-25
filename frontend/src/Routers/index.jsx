import { createBrowserRouter } from "react-router-dom";
import ShopRegister from "../Pages/Shops/Register";
import ShopLogin from "../Pages/Shops/Login";
import UpdateShop from "../Pages/Shops/UpdateShop";
import DeleteShop from "../Pages/Shops/DeleteShopById";
import Main from "../layouts/Main"
import CategoryList from "../Pages/Shops/CategoryList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/register",
    element: <ShopRegister />,
  },
  {
    path: "/login",
    element: <ShopLogin />,
  },
  {
    path: "/Update/:id",
    element: <UpdateShop />,
  },
  {
    path: "/shop/:shopId",
    element: <DeleteShop />
  },
  {
    path: "/categories",
    element: <CategoryList />
  }

]);
