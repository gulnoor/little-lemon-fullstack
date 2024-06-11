"use client"
import { createContext, useReducer } from "react";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const cartReducer = (prevState, action) => {
    switch (action.type) {
      case "add":
        console.log(action);
        break;
      default:
        console.log(action);
        break;
    }
  };
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: {} });
  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
