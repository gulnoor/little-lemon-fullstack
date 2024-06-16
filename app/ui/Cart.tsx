"use client";

import { useContext } from "react";
import { CartContext } from "../lib/contexts/cartContext";

const Cart = ({}) => {
  const { cartState, updateCart } = useContext(CartContext);
  return (
    <div>
      cart
      <div>
        {cartState.map((item) => {
          return (
            <div key={item?.id}>
              <h2>{item?.name}</h2>
              <p>{item?.id}</p>
              <p>{item?.price}</p>
              <p>{item?.quantity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
