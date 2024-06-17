"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { CartContext } from "../lib/contexts/cartContext";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const Cart = ({}) => {
  const { cartState, updateCart } = useContext(CartContext);
  return (
    <List className="hidden rounded-xl bg-[var(--md-sys-color-surface-container)] lg:block lg:w-[40%]">
      {cartState.map((item) => {
        return (
          <ListItem
            className="m-2 rounded-lg bg-[var(--md-sys-color-surface-container-high)]"
            key={item?.id}
          >
            {/* <div className="w-4/5"> */}
            <ListItemText
              className="pl-4"
              primary={item?.name}
              secondary={item?.price}
            />
            <div className="flex items-center">
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
            {/* </div> */}
            <ListItemButton
              className="w-fit"
              onClick={() => updateCart({ type: "delete", payload: item })}
            >
              <DeleteIcon />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Cart;
