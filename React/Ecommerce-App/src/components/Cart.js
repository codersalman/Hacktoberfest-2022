import React from "react";
import EmptyCart from "./EmptyCart";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillHeartFill } from "react-icons/bs";

const Cart = ({
  addCart,
  setAddCart,
  getCardDetails,
  removeFromCart,
  addToWishList
}) => {
  // console.log(typeof setAddCart);
  // const [quantity, setQuantity] = useState(1);

  const incrQuantity = (id) => {
    let desiredItem = addCart.filter((item) => item.id === id);
    //console.log({ ...desiredItem[0], quantity: desiredItem[0].quantity + 1 });
    desiredItem = { ...desiredItem[0], quantity: desiredItem[0].quantity + 1 };
    addCart.map((product) => {
      if (product.id === desiredItem.id) {
        product.quantity = desiredItem.quantity;
      }
    });

    setAddCart((prevProducts) => {
      return [...prevProducts];
    });
  };
  const decrQuantity = (id) => {
    let desiredItem = addCart.filter((item) => item.id === id);
    desiredItem =
      desiredItem[0].quantity > 0
        ? { ...desiredItem[0], quantity: desiredItem[0].quantity - 1 }
        : { ...desiredItem[0], quantity: 0 };

    addCart.map((product) => {
      if (product.id === desiredItem.id) {
        product.quantity = desiredItem.quantity;
      }
    });
    // console.log(addCart);
    const newcartData = addCart.filter((item) => {
      return item.quantity !== 0;
    });
    console.log(newcartData);
    // setAddCart((prevProducts) => {
    //   return [...prevProducts];
    // });
    setAddCart(newcartData);
  };

  const cartlistMap = addCart.map((product) => {
    // console.log(product);
    return (
      <div className="productCard" key={product.id}>
        <img src={product.image} className="cartImage" alt="product" />
        <div className="productCard-details">
          <div className="productCard-title">
            <p className="title">
              {product.title.length > 40
                ? product.title.slice(0, 38) + "..."
                : product.title}
            </p>
            <div className="price-container">
              <p className="price">$ {product.price}</p>
              <div className="inputContainer">
                <button
                  className="incr"
                  onClick={() => incrQuantity(product.id)}
                >
                  +
                </button>
                <h4>{product.quantity}</h4>
                <button
                  className="decr"
                  onClick={() => decrQuantity(product.id, product.quantity)}
                >
                  -
                </button>
              </div>
            </div>
          </div>
          <div className="btnContainer">
            <button className="addCart" onClick={() => removeFromCart(product)}>
              Remove from Cart <FaShoppingCart size={18}></FaShoppingCart>
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

  const total = addCart.reduce((acc, product) => {
    acc += Number(product.quantity) * Number(product.price);
    return acc;
  }, 0);

  return (
    <div className="wishlistContainer cartContainer">
      <h5>
        <span>{addCart.length}</span> items in your Cart!
      </h5>
      <q>where your happiness rings your doorbell in form of our products</q>
      <div className="cartContainer">
        {addCart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="productsCart">
            <div className="cartListMap">{cartlistMap}</div>
            <div className="checkoutContainer">
              <h4>Subtotal ({addCart.length}) items</h4>
              <hr />
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {addCart.map((product) => {
                    return (
                      <tr key={product.id}>
                        <td>
                          {product.title.length > 30
                            ? product.title.slice(0, 28) + "..."
                            : product.title}
                        </td>
                        <td>{product.quantity}</td>
                        <td>$ {product.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <hr />
              <p className="total">
                Total : $ <span>{total.toFixed(2)}</span>
                /-
              </p>
              <button className="cartBtn">Proceed to CheckOut</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
