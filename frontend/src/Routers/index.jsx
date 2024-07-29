import { createBrowserRouter } from "react-router-dom";
import ShopLogin from "../layouts/Shop/Login";
import UpdateShop from "../layouts/Shop/UpdateShop";

import RegisterUserOrAdmin from "../layouts/Admin/RegisterAdmin&User";

import Main from "../pages/Shop/Main";
import ShopRegister from "../layouts/Shop/Register";
import LoginUserOrAdmin from "../layouts/Admin/LoginAdmin&User";
import SubCategoryList from "../layouts/Shop/SubCategoryList";


import CategoriesList from "../layouts/Admin/CategoriesList";

import AddProduct from "../layouts/Shop/CreateProduct";
import CreateSubCategory from "../layouts/Shop/CreateSubCategory";
import ProductsBySubCategory from "../layouts/Shop/ProductsBySubCategory";
import ProductDetail from "../layouts/Shop/ProductDetail";
import HomePageAdmin from "../pages/Admin/HomePageAdmin";
import AddCategory from "../layouts/Admin/AddCategory";

export const router = createBrowserRouter([
  {
    path: "/c",
    element: <CategoriesList />,
  },
  {
    path: "/a",
    element: <AddCategory />,
  }, {
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
  {
    path: "/createSubCategory",
    element: <CreateSubCategory />,
  },
  {
    path: "/productsBySubCategory/:subCategoryId",
    element: <ProductsBySubCategory />,
  },
  {
    path: "/products/:productId",
    element: <ProductDetail />,
  },
]);
