"use client";
import { createContext, useReducer } from "react";

export const CartContext = createContext(null);

const cartReducer = (prevState, action) => {
  console.log("previous state: ", prevState);
  console.log("action: ", action);
  switch (action.type) {
    case "add":
      return { count: prevState.count + 1 };
    case "remove":
      return { count: prevState.count - 1 };
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
