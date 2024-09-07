const { configureStore } = require("@reduxjs/toolkit");

import cartReducer from "@/app/lib/reduxStore/cartSlice";
import { useSelector } from "react-redux";
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(() => {
  console.log(store.getState())
  window.localStorage.setItem(
    "cart",
    JSON.stringify(store.getState().cart)
  );
});
export default store;
