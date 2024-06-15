import Image from "next/image";
import dbConnect from "../lib/connectDatabase";
import bgimg2 from "/public/assets/images/restauranfood.webp";
import MenuItem from "../lib/models/menuItem";
import "./menu.scss";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
// import MyButton from "../ui/MyButton";

const Menu = async () => {
  let menu = [];
  try {
    await dbConnect();
    menu = await MenuItem.find({});
  } catch (err) {
    console.log(err);
    return <h1>couldn&apos;t connect to databse :( please refresh the page</h1>;
  }
  return (
    <>
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
                  secondary={
                    <React.Fragment>{item.description}</React.Fragment>
                  }
                ></ListItemText>
                <p>{"$" + item.price}</p>
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
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
