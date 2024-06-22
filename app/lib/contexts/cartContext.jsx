"use client";
import { createContext, useEffect, useReducer, useState } from "react";

export const CartContext = createContext(null);

const cartReducer = (prevState, action) => {
  console.log("previous state: ", prevState);
  console.log("action: ", action.type);
  const payload = action.payload ? action.payload : {};
  console.log("payload:", payload);
  // //const { id, name, price } = payload;
  switch (action.type) {
    case "load":
      return action.payload;
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
const readLocal = () => {
  let localCart = [];
  if (typeof window !== undefined) {
    try {
      localCart = JSON.parse(window.localStorage.getItem("cart"));
      return localCart === null ? [] : localCart;
    } catch (e) {
      console.log("couldn't parse local cart");
    }
  }
  return localCart;
};
const CartProvider = ({ children }) => {
  const [cartState, updateCart] = useReducer(cartReducer, readLocal());
  const [cartTotal, setCartTotal] = useState(0);
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  useEffect(() => {
    let localCart = [];
    try {
      localCart = JSON.parse(window.localStorage.getItem("cart"));
    } catch (e) {
      console.log("couldn't parse local cart");
    }
    localCart?.length > 1
      ? updateCart({ type: "load", payload: localCart })
      : window.localStorage.setItem("cart", JSON.stringify([]));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cartState));
    setCartTotal(calculateTotal(cartState));
  }, [cartState]);
  return (
    <CartContext.Provider value={{ cartState, updateCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
