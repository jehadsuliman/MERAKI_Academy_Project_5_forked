import { createBrowserRouter } from "react-router-dom";
import ShopRegister from "../Pages/Shops/Register";
import ShopLogin from "../Pages/Shops/Login";
import ShopsList from "../Pages/Shops/ShopsList";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <ShopRegister />,
  },
  {
    path: "login",
    element: <ShopLogin />,
  },
  {
    path: "/all",
    element: <ShopsList />,
  },
]);
