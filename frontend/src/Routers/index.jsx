import {createBrowserRouter} from "react-router-dom"
import shopRegister from "../Pages/shops/shopRegister";

export const router =createBrowserRouter([
    {
        path: "/register",
        element: <shopRegister />
    }
])