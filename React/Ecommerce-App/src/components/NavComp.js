import React from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Badge, Button } from "react-bootstrap";
import { BsFillHeartFill } from "react-icons/bs";

const NavComp = ({ addWishlist, addCart }) => {
  return (
    <>
      <nav>
        <NavLink to="/">
          <h2>ECart</h2>
        </NavLink>
        <div className="links">
          <NavLink to="cart">
            <FaShoppingCart size={28} className="cartIcon" />
            <p className="badge1">{addCart.length}</p>
          </NavLink>
          <NavLink to="wishlist">
            <BsFillHeartFill size={28} className="wishlistIcon" />
            <p className="badge2">{addWishlist.length}</p>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default NavComp;
