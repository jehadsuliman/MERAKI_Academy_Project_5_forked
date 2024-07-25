import {createBrowserRouter} from "react-router-dom"
import Register from "../layout/RegisterAdmin&User/Register"
export const router =createBrowserRouter([
    {
path:"/",
element:<Register/>,
    }
])