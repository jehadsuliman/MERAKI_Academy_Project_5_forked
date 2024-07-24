import React from "react";
import "./Header.css";
import defaultPic from "../../pic/defaultPic.bmp";

const Header_bottom = () => {
  return (
    <div className="Header_bottom">
      <div className="title">All categories</div>
      <div className="button_container">
        <div className="category_button">
          <div className="category_image">
            <img src={defaultPic} alt="!" />
          </div>
          <div className="category_name">Name of category</div>
        </div>
        <div className="category_button">
          <div className="category_image">
            <img src={defaultPic} alt="!" />
          </div>
          <div className="category_name">Name of category</div>
        </div>
        <div className="category_button">
          <div className="category_image">
            <img src={defaultPic} alt="!" />
          </div>
          <div className="category_name">Name of category</div>
        </div>
        <div className="category_button">
            <div className="category_image"><img src={defaultPic} alt="!" /></div>
            <div className="category_name">Name of category</div>
        </div>
        <div className="category_button">
            <div className="category_image"><img src={defaultPic} alt="!" /></div>
            <div className="category_name">Name of category</div>
        </div>
        <div className="category_button">
            <div className="category_image"><img src={defaultPic} alt="!" /></div>
            <div className="category_name">Name of category</div>
        </div>
        <div className="category_button">
            <div className="category_image"><img src={defaultPic} alt="!" /></div>
            <div className="category_name">Name of category</div>
        </div>
        
      </div>
    </div>
  );
};

export default Header_bottom;
