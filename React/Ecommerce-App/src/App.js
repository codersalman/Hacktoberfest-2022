import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import NavComp from "./components/NavComp";
import Products from "./components/Products";
import CardDetails from "./components/CardDetails";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cardDetails, setCardDetails] = useState();
  const [addWishlist, setAddWishlist] = useState([]);
  const [addCart, setAddCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const changeQuantity = (value) => {
    console.log(value);
    setQuantity(value);
  };
  const incrQuantity = () => {
    console.log(quantity);
    setQuantity(quantity + 1);
  };
  const decrQuantity = () => {
    setQuantity(quantity - 1);
  };

  function getProducts() {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setProducts(data);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  function getCardDetails(product) {
    setCardDetails(product);
  }

  function addToWishList(product) {
    // console.log(product);
    toast.success("Item added to Wishlist !", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-addWishlist"
    });
    if (!addWishlist.length) {
      setAddWishlist((prevProducts) => {
        return [...prevProducts, product];
      });
    } else {
      let uniquelist = addWishlist.filter((item) => item.id !== product.id);
      uniquelist = [...uniquelist, product];
      //console.log([...uniquelist, product]);
      setAddWishlist(uniquelist);
    }
  }

  function removeFromWishList(product) {
    // console.log(product);
    toast.error("Item removed from Wishlist !", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-removeWishlist"
    });
    setAddWishlist((prevProducts) => {
      return prevProducts.filter((item) => {
        return item.id !== product.id;
      });
    });
  }
  function addToCart(product) {
    if (!addCart.length) {
      product = { ...product, quantity: 1 };
      setAddCart((prevProducts) => {
        return [...prevProducts, product];
      });
    } else {
      let uniquelist = addCart.filter((item) => item.id !== product.id);
      product = { ...product, quantity: 1 };
      uniquelist = [...uniquelist, product];
      //console.log([...uniquelist, product]);
      setAddCart(uniquelist);
    }
    toast.success("Item added to Cart !", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-addCart"
    });
  }

  function removeFromCart(product) {
    // console.log(product.quantity, typeof product.quantity);
    product = { ...product, quantity: product.quantity - 1 };
    // console.log(product);
    setAddCart((prevProducts) => {
      return prevProducts.filter((item) => {
        return item.id !== product.id;
      });
    });
    toast.error("Item removed from Cart !", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-removeCart"
    });
  }

  return (
    <div className="App">
      <NavComp addWishlist={addWishlist} addCart={addCart} />
      <ToastContainer />
      <Routes>
        <Route
          path="/product/:ID"
          element={
            <CardDetails
              cardDetails={cardDetails}
              setCardDetails={setCardDetails}
              getCardDetails={getCardDetails}
              addToWishList={addToWishList}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/"
          element={
            <Products
              products={products}
              getCardDetails={getCardDetails}
              addToWishList={addToWishList}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <Wishlist
              addWishlist={addWishlist}
              setAddWishlist={setAddWishlist}
              getCardDetails={getCardDetails}
              removeFromWishList={removeFromWishList}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              addCart={addCart}
              setAddCart={setAddCart}
              getCardDetails={getCardDetails}
              removeFromCart={removeFromCart}
              addToWishList={addToWishList}
              quantity={quantity}
              changeQuantity={changeQuantity}
              incrQuantity={incrQuantity}
              decrQuantity={decrQuantity}
            />
          }
        />
      </Routes>
    </div>
  );
}
