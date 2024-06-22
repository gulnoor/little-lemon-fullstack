"use client";
import { createContext, useEffect, useReducer, useState } from "react";

export const CartContext = createContext(null);

const cartReducer = (prevState, action) => {
  console.clear();
  console.log("previous state: ", prevState);
  console.log("action: ", action.type);
  const payload = action.payload ? action.payload : {};
  console.log("payload:", payload);
  // //const { id, name, price } = payload;
  switch (action.type) {
    case "add":
      const existingItem = prevState.find(
        (cartItem) => cartItem.id === payload.id
      );

      if (existingItem) {
        return prevState.map((cartItem) =>
          cartItem.id === payload.id
            ? { ...cartItem, quantity: cartItem.quantity + payload.quantity }
            : cartItem
        );
      } else {
        return [...prevState, { ...payload, quantity: payload.quantity }];
      }

    case "inc":
      return prevState.map((item) =>
        item.id === payload.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    case "dec":
      return payload.quantity === 1
        ? prevState.filter((item) => item.id !== payload.id)
        : prevState.map((item) =>
            item.id === payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
    case "delete":
      return prevState.filter((item) => item.id !== payload.id);
    case "clear":
      return [];

    default:
      return prevState;
  }
};
const CartProvider = ({ children }) => {
  const [cartState, updateCart] = useReducer(cartReducer, []);
  const [cartTotal, setCartTotal] = useState(0);
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  useEffect(() => {
    setCartTotal(calculateTotal(cartState));
  }, [cartState]);
  return (
    <CartContext.Provider value={{ cartState, updateCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
