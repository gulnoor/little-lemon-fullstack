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
            <>
              <h2>{item.id}</h2>
              <p>{item.quantity}</p>
            </>
          );
        })}
      </div>
      <button onClick={() => updateCart({ type: "add" })}>add</button>
      <button onClick={() => updateCart({ type: "remove" })}>remove</button>
    </div>
  );
};

export default Cart;
