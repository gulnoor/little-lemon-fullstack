const { createSlice } = require("@reduxjs/toolkit");
import { readLocal } from "@/app/lib/utils/cartUtils";
const initialState = readLocal();
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log(state);
      const existingItem = state.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (existingItem) {
        return state.map((cartItem) =>
          cartItem.id === action.payload.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + action.payload.quantity,
              }
            : cartItem
        );
      } else {
        state.push({ ...action.payload, quantity: action.payload.quantity });
        return state;
      }
    },
    increment(state, action) {
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    },
    decrement(state, action) {
      return action.payload.quantity === 1
        ? state.filter((item) => item.id !== action.payload.id)
        : state.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
    },
    removeItem(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
    clearCart() {
      return [];
    },
  },
});
export const { addToCart, increment, decrement, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
