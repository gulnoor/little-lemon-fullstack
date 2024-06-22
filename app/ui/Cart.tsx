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
import { IsMountedContext } from "../lib/contexts/mountedContext";

const Cart = ({ tailwindcss }) => {
  const { cartState, updateCart, cartTotal } = useContext(CartContext);
  const { isMounted } = useContext(IsMountedContext);

  return (
    <div
      className={`
    sticky
    gap-2
    top-2
    px-6
    py-4
    rounded-xl
    bg-[var(--md-sys-color-surface-container)]
    ${tailwindcss}`}
    >
      <List
        style={{ padding: "0px" }}
        id="cartlist"
        className="rounded-xl overflow-scroll "
      >
        <h2 className="p-4">Cart</h2>
        {isMounted &&
          cartState.map((item) => {
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
      {
        <div className="flex flex-col flex-grow gap-3 b-0 mt-auto px-4">
          <h2>Total: </h2>
          <h3>{`$${cartTotal}`}</h3>
          <MyButton disable={cartState.length < 1} href="/checkout">
            Proceed to Payment
          </MyButton>
        </div>
      }
    </div>
  );
};

export default Cart;
