"use client";
import { createContext, useReducer } from "react";

export const CartContext = createContext(null);

const cartReducer = (prevState, action) => {
  console.log("previous state: ", prevState);
  console.log("action: ", action);
  switch (action.type) {
    case "add":
      return [];
    case "remove":
      return [];
    default:
      return prevState;
  }
};
const CartProvider = ({ children }) => {
  const [cartState, updateCart] = useReducer(cartReducer, []);
  return (
    <CartContext.Provider value={{ cartState, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
