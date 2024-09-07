"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, increment } from "../lib/reduxStore/cartSlice";
const TestPage = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(addToCart("gg"))}>gg</button>
    </div>
  );
};

export default TestPage;
