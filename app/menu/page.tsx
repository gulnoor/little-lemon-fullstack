"use client";
import Image from "next/image";
import bgimg2 from "/public/assets/images/restauranfood.webp";
import "./menu.scss";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Cart from "../ui/Cart";
import MenuItem from "../ui/MenuItem";
// import MyButton from "../ui/MyButton";

const Menu = () => {
  const [menu, setmenu] = useState([]);
  useEffect(() => {
    const fetchMenu = async () => {
      const response = await fetch("/api/menu", { method: "GET" });
      const data = await response.json();
      setmenu(data);
    };
    fetchMenu();
  }, []);
  return (
    <>
      <Cart />
      <div className=" menu-hero ">
        <div className="menu-title">
          <h1>Menu</h1>
          <p>traditional recipes served with a modern twist</p>
        </div>
        <Image
          className="menuheroimg animate__animated animate__faster animate__zoomIn"
          alt={"hero image"}
          src={bgimg2}
        />
      </div>
      <section className="p-0 flex flex-wrap justify-around ">
        <List
          className="lg:w-[49%]"
          sx={{
            borderRadius: "18px",
            bgcolor: "var(--md-sys-color-surface-container-high)",
          }}
        >
          {menu.map((item) => (
            <MenuItem key={item.id} item={item}></MenuItem>
          ))}
        </List>
        <Card className="hidden lg:block lg:w-[49%]">
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </section>
    </>
  );
};

export default Menu;
