import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const shopId = useSelector((state) => state.shopAuth.shopId);
  const categories = useSelector((state) => state.categories.categories);
  const { productId } = useParams();
  const { subCategoryId } = useParams();
  
  return (
    <nav>
      <h1>Shop</h1>
      <NavLink to="/shopRegister">Register Shop</NavLink>
      <br />
      <NavLink to="/shopLogin">Login Shop</NavLink>
      <br />
      <NavLink to={`/shopUpdate/${shopId}`}>Update User Shop</NavLink>
      <br />
      <NavLink to="/categories">Sub Categories</NavLink>
      <br />
      <NavLink to="/products">Create New Product</NavLink>
      <br />
      <NavLink to={`/products/${productId}`}>Update Product</NavLink>
      <br />
      <NavLink to="/createSubCategory">Create Sub-Category</NavLink>
      <br />
      <NavLink to={`/subCategory/${subCategoryId}`}>
        product by sub category
      </NavLink>
    </nav>
  );
};

export default Navbar;
