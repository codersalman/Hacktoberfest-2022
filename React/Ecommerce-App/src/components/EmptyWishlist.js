import React from "react";
import { HiShoppingBag } from "react-icons/hi";

const EmptyWishlist = () => {
  return (
    <div className="">
      <HiShoppingBag
        style={{ color: "rgb(240, 41, 74)" }}
        size={160}
      ></HiShoppingBag>
    </div>
  );
};
export default EmptyWishlist;
