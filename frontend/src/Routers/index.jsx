import {createBrowserRouter} from "react-router-dom"
import ShopRegister from "../Pages/Shops/Register";

export const router =createBrowserRouter([
    {
        path: "/register",
        element: <ShopRegister />
    }
])
