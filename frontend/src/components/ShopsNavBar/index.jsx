import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>shops</h1>
      <NavLink to="/register">Register</NavLink>
      <br></br>
      <NavLink to="/login">Login</NavLink>
      <br></br>
      <NavLink to="/:id">Update User Shop</NavLink>
      <br></br>
      <NavLink to="/shop/:shopId">Delete</NavLink>
    </nav>
  );
};

export default Navbar;
