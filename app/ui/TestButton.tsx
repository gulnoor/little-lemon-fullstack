"use client";
import { useDispatch } from "react-redux";
import { ReactNode } from "react";
import { addToCart } from "../lib/reduxStore/cartSlice";

const TestButton = ({ children }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart("gg"));
  };

  return <button onClick={handleClick}>{children}</button>;
};

export default TestButton;
