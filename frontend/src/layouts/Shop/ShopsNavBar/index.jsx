import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const shopId = useSelector((state) => state.shopAuth.shopId);

  return (
    <nav>
      <h1>shop</h1>
      <NavLink to="/shopRegister">Register Shop</NavLink>
      <br></br>
      <NavLink to="/shopLogin">Login Shop</NavLink>
      <br></br>
      <NavLink to={`/shopUpdate/${shopId}`}>Update User Shop</NavLink>
      <br></br>
      <NavLink to="/categories/">Sub Category Shop</NavLink>
      <br></br>
      <NavLink to="/products">Create New Product</NavLink>
    </nav>
  );
};

export default Navbar;
