"use client";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItemButton,
} from "@mui/material";
import Image from "next/image";
import React from "react";

const MenuItem = ({ item }) => {
  return (
    <>
      <ListItem key={item.id}>
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
        <ListItemText
          primary={item.name}
          secondary={<React.Fragment>{item.description}</React.Fragment>}
        >
          <p>{"$" + item.price}</p>
        </ListItemText>
        <ListItemButton>add</ListItemButton>
        <ListItemButton>remove</ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default MenuItem;
