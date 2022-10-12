import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdStarRate } from "react-icons/md";
import { IoStar } from "react-icons/io";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BsFillHeartFill } from "react-icons/bs";
import EmptyWishlist from "./EmptyWishlist";

const Wishlist = ({
  addWishlist,
  setAddWishlist,
  getCardDetails,
  removeFromWishList,
  addToCart
}) => {
  // console.log(addWishlist.length, typeof addWishlist);

  const wishlistMap = addWishlist.map((product) => {
    return (
      <div className="card" key={product.id}>
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt="product"
            onClick={() => getCardDetails(product)}
          />
        </Link>
        <div className="cardDetails">
          <p className="title">
            {product.title.length > 30
              ? product.title.slice(0, 28) + "..."
              : product.title}
          </p>
          <div className="priceContainer">
            <p className="price">$ {product.price}</p>
            <div className="rating">
              <p>{product.rating.rate}</p>
              <span>
                <MdStarRate style={{ color: "#fac905" }} size={22}></MdStarRate>
              </span>
            </div>
            <div className="count">
              <p>{product.rating.count}</p>
              <span>
                <BsFillPeopleFill size={22}></BsFillPeopleFill>
              </span>
            </div>
          </div>
          <div className="btnContainer">
            <button className="addCart" onClick={() => addToCart(product)}>
              Add to Cart <FaShoppingCart size={18}></FaShoppingCart>
            </button>
            <button
              className="addWishlist"
              onClick={() => removeFromWishList(product)}
            >
              Remove from Wishlist <BsFillHeartFill size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="wishlistContainer">
      <h5>
        <span>{addWishlist.length}</span> items in your Wishlist!
      </h5>
      <q>where your finger doesnt have limits to choose</q>
      <div className="wishlistProducts">
        {addWishlist.length === 0 ? <EmptyWishlist /> : wishlistMap}
      </div>
    </div>
  );
};

export default Wishlist;
