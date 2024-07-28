import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import SubCategoriesList from "../SubCategoryList";

const Navbar = () => {
  const shopId = useSelector((state) => state.shopAuth.shopId);
  const categories = useSelector((state) => state.categories.categories);
  const { productId, subCategoryId } = useParams();
  const [showNavLinks, setShowNavLinks] = useState(false);

  return (
    <nav style={{margin: '30px'}}>
      <h1>Shop</h1>
      
      <SubCategoriesList />
      
      <NavLink to="/shopRegister">Register Shop</NavLink>
      <br/>
      
      <NavLink to="/shopLogin">Login Shop</NavLink>
      <br/>
      
      <NavLink to={`/shopUpdate/${shopId}`}>Update User Shop</NavLink>
      <br/>
      
      <NavLink to="/createSubCategory">Create Sub-Category</NavLink>
      <br/>
      
      <NavLink to="/categories">Sub Categories</NavLink>
      <br/>
      
      <NavLink to="/products">Create New Product</NavLink>
    </nav>
  );
};

export default Navbar;
