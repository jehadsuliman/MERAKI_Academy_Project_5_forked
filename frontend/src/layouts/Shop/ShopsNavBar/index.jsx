import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>shop</h1>
      <NavLink to="/shopRegister">Register Shop</NavLink>
      <br></br>
      <NavLink to="/shopLogin">Login Shop</NavLink>
      <br></br>
      <NavLink to="/shopUpdate">Update User Shop</NavLink>
      <br></br>
      <NavLink to="/shopDelete">Delete Shop</NavLink>
      <br></br>
      <NavLink to="/categories">Category Shop</NavLink>
    </nav>
  );
};

export default Navbar;
