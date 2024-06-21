"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useContext } from "react";
import { CartContext } from "../lib/contexts/cartContext";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MyButton from "./MyButton";

const Cart = ({ tailwindcss }) => {
  
  const { cartState, updateCart, cartTotal } = useContext(CartContext);
  return (
    <div
      style={{ padding: "12px", position: "sticky" }}
      className={`
    flex-col
    gap-2
    h-[100vh]
    top-2
    rounded-xl
    bg-[var(--md-sys-color-surface-container)]
    lg:w-1/2
    ${tailwindcss}`}
    >
      <h2 className="p-4">Cart</h2>
      <List id = "cartlist" className="rounded-xl overflow-scroll ">
        {cartState.map((item) => {
          return (
            <ListItem
              divider
              className=" bg-[var(--md-sys-color-surface-container-high)]"
              key={item?.id}
            >
              <ListItemText
                className="pl-4 w-full"
                primary={item?.name}
                secondary={item?.price}
              />
              <div className="ml-auto flex items-center">
                <Button
                  onClick={() => updateCart({ type: "inc", payload: item })}
                >
                  +
                </Button>
                <p>{item?.quantity}</p>
                <Button
                  onClick={() => updateCart({ type: "dec", payload: item })}
                >
                  -
                </Button>
              </div>
              <ListItemButton
                className="w-fit"
                onClick={() => updateCart({ type: "delete", payload: item })}
              >
                <DeleteIcon className="w-fit" />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <h2>Total: </h2>
      <h3>{`$${cartTotal}`}</h3>
      <MyButton href="/checkout">Proceed to Payment</MyButton>
    </div>
  );
};

export default Cart;
