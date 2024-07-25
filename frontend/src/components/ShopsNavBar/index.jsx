import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>shop</h1>
      <NavLink to="/register">Register Shop</NavLink>
      <br></br>
      <NavLink to="/login">Login Shop</NavLink>
      <br></br>
      <NavLink to="/Update/:id">Update User Shop</NavLink>
      <br></br>
      <NavLink to="/shop/:shopId">Delete Shop</NavLink>
      <br></br>
      <NavLink to="/categories">Category Shop</NavLink>
    </nav>
  );
};

export default Navbar;
