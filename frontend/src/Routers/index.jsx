import { createBrowserRouter } from "react-router-dom";
import ShopRegister from "../Pages/Shops/Register";
import ShopLogin from "../Pages/Shops/Login";
import UpdateShop from "../Pages/Shops/UpdateShop";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <ShopRegister />,
  },
  {
    path: "/login",
    element: <ShopLogin />,
  },
  {
    path: "/:id",
    element: <UpdateShop />,
  },
]);
