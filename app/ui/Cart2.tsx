"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useContext } from "react";
import { CartContext } from "../lib/contexts/cartContext";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MyButton from "./MyButton";
const Cart2 = ({ tailwindcss }) => {
  const { cartState, updateCart, cartTotal } = useContext(CartContext);
  return (
    <Card
      style={{ padding: "12px", position: "sticky",}}
      className={`
      flex-col
      
      h-[98vh]
      top-0
      rounded-xl
      bg-[var(--md-sys-color-surface-container)]
      lg:w-1/2
      ${tailwindcss}`}
    >
      <CardContent >
        <h2 className="p-4">Cart</h2>
        <List id="cartlist" className="rounded-xl overflow-scroll ">
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
      </CardContent>
      <CardActions
        style={{
          bottom: "0px",
          marginTop: "auto",
        }}
      >
        <MyButton href="/checkout">Proceed to Payment</MyButton>
      </CardActions>
    </Card>
  );
};

export default Cart2;
