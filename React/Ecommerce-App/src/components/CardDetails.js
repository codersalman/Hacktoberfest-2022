import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdStarRate } from "react-icons/md";
import { BsFillHeartFill } from "react-icons/bs";

const CardDetails = ({
  cardDetails,
  setCardDetails,
  getCardDetails,
  addToWishList,
  addToCart
}) => {
  const { ID } = useParams();
  // console.log(cardDetails, ID);
  return (
    <div className="container">
      <Link to="/">
        <button className="backBtn">‹ Back to Products</button>
      </Link>
      <div className="card1">
        <div className="imageContainer">
          <img src={cardDetails.image} className="image" alt="product" />
        </div>
        <div className="details">
          <div className="title">
            <h2>
              {cardDetails.title} <span>{cardDetails.category}</span>
            </h2>
          </div>
          <p>{cardDetails.description}</p>
          <div className="priceContainer">
            <p className="price">$ {cardDetails.price}</p>
            <div className="rating">
              <p>{cardDetails.rating.rate}</p>
              <span>
                <MdStarRate style={{ color: "#fac905" }} size={22}></MdStarRate>
              </span>
            </div>
            <div className="count">
              <p>{cardDetails.rating.count}</p>
              <span>
                <BsFillPeopleFill size={22}></BsFillPeopleFill>
              </span>
            </div>
          </div>
          <div className="btnContainer">
            <button className="addCart" onClick={() => addToCart(cardDetails)}>
              Add to Cart <FaShoppingCart size={18}></FaShoppingCart>
            </button>
            <button
              className="addWishlist"
              onClick={() => addToWishList(cardDetails)}
            >
              Add to Wishlist <BsFillHeartFill size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
