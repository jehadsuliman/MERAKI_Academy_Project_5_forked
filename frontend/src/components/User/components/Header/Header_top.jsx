import React from "react";
import "./Header.css";
import logo from "../../pic/logo.bmp";

const Header_top = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="search">
        <form>
          <input type="text" placeholder="search" />
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <div className="icons">
        <div className="user">
          <i className="fa-regular fa-user"></i>
          <div>
            <div className="name">Hi,ismail</div>
            <div className="account">
              <div className="text">Account</div>
              <div className="angle">◀</div>
            </div>
          </div>
        </div>
        <div className="fav">
        <i className="fa-solid fa-heart"></i>

          <div>
            <div className="counter">0</div>
            <div className="text">Fav</div>
          </div>
        </div>
        <div className="cart">
          <i className="fa-solid fa-cart-shopping"></i>
          <div>
            <div className="counter">0</div>
            <div className="text">Cart</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header_top;
