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

const MenuItem = ({ item }) => {
  const { updateCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
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
            className="w-[70px] h-[90px] md:w-[150px] md:h-[150px] object-cover mr-3"
            style={{ borderRadius: "18px" }}
            src={item.image}
            width={150}
            height={150}
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
              variant="outlined"
              onClick={() => {
                setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
              }}
            >
              -
            </Button>
            <span className="px-4">{quantity}</span>
            <Button
              variant="outlined"
              onClick={() => {
                setQuantity((prev) => prev + 1);
              }}
            >
              +
            </Button>
            <Button
              onClick={() =>
                updateCart({
                  type: "add",
                  payload: {
                    id: item.id,
                    price: item.price,
                    name: item.name,
                    quantity,
                  },
                })
              }
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
