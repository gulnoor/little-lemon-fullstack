"use client";

import { useContext } from "react";
import { CartContext } from "../lib/contexts/cartContext";

const Cart = ({}) => {
  const { cartState } = useContext(CartContext);
  return <div>{}</div>;
};

export default Cart;
