import React from "react";
import { BsFillCartXFill } from "react-icons/bs";

const EmptyWishlist = () => {
  return (
    <div className="">
      <BsFillCartXFill style={{ color: "green" }} size={160}></BsFillCartXFill>
    </div>
  );
};
export default EmptyWishlist;
