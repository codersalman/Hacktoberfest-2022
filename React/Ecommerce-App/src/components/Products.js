import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdStarRate } from "react-icons/md";
import { HiChevronRight } from "react-icons/hi";
// import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BsFillHeartFill } from "react-icons/bs";

const Products = ({ products, getCardDetails, addToWishList, addToCart }) => {
  //console.log(products);
  const productMap = products.map((product) => {
    // console.log(product);
    const titleString =
      product.title.length > 30
        ? product.title.slice(0, 28) + "..."
        : product.title;
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
          <p className="title">{titleString}</p>
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
              onClick={() => addToWishList(product)}
            >
              Add to Wishlist <BsFillHeartFill size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="productsContainer">
      <Link to="/">
        <button className="backBtn browseBtn">
          Browse Products <HiChevronRight />
        </button>
      </Link>
      <div style={{ textAlign: "center", margin: "0.5rem auto 1.5rem auto" }}>
        <q>Browse and choose your happiness</q>
      </div>
      <div className="cardContainer">{productMap}</div>
    </div>
  );
};

export default Products;
