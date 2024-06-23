"use client";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { CartContext } from "../lib/contexts/cartContext";
import { AlertContext } from "../lib/contexts/AlertContext";
export const CartButtons = ({ quantity, plusClick, minusClick, variant }) => {
  const style = {
    minWidth: "25px",
    height: "25px",
    padding: "0px",
  };
  return (
    <>
      <Button variant={variant} style={style} onClick={minusClick}>
        -
      </Button>
      <span className="px-2 md:px-4">{quantity}</span>
      <Button style={style} variant={variant} onClick={plusClick}>
        +
      </Button>
    </>
  );
};

const MenuItem = ({ item }) => {
  const { updateCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const { openAlert } = useContext(AlertContext);
  return (
    <>
      <ListItem
        sx={{
          "@media screen and (min-width: 768px)": {
            padding: "16px",
          },
        }}
        className=" rounded-lg bg-[var(--md-sys-color-surface-container-high)]"
        alignItems="flex-start"
        key={item.id}
      >
        <ListItemAvatar>
          <Image
            className="w-[70px] h-[90px] md:w-[100px] md:h-[100px] object-cover mr-3"
            style={{ borderRadius: "18px" }}
            src={item.image}
            width={100}
            height={100}
            alt={item.name}
          ></Image>
        </ListItemAvatar>
        <div className="w-full h-full flex flex-col">
          <ListItemText
            primary={item.name}
            secondary={<React.Fragment>{item.description}</React.Fragment>}
          >
            <p>{"$" + item.price}</p>
          </ListItemText>
          <div className="flex mt-auto justify-end items-center">
            <Button
              variant="contained"
              style={{
                minWidth: "25px",
                height: "25px",
                padding: "0px",
              }}
              onClick={() => {
                setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
              }}
            >
              -
            </Button>
            <span className="px-4">{quantity}</span>
            <Button
              style={{
                minWidth: "25px",
                height: "25px",
                padding: "0px",
              }}
              variant="contained"
              onClick={() => {
                setQuantity((prev) => prev + 1);
              }}
            >
              +
            </Button>
            <Button
              className="!ml-3"
              onClick={() => {
                updateCart({
                  type: "add",
                  payload: {
                    id: item.id,
                    price: item.price,
                    name: item.name,
                    quantity,
                  },
                });
                openAlert({
                  type: "success",
                  message: `${quantity}x ${item.name} added to cart`,
                });
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </ListItem>
    </>
  );
};

export default MenuItem;
