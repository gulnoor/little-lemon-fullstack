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
import Cart from "../ui/Cart";
import MenuItem from "../ui/MenuItem";
import dbConnect from "../lib/connectDatabase";
import menuItem from "../lib/models/menuItem";
// import MyButton from "../ui/MyButton";

const Menu = async () => {
  // await dbConnect();

  const data = await menuItem.find({});
  const menu = data.map((item) => ({
    id: item._id.toString(),
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
  }));

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
      <section className="p-0 md:pt-6 flex overflow-clip flex-wrap justify-around ">
        <List className="lg:w-[60%] flex flex-col gap-2 ">
          {menu.map((item) => (
            <MenuItem key={item.id} item={item}></MenuItem>
          ))}
        </List>
        <Cart tailwindcss="hidden lg:flex" />

        {/* <Card className="hidden lg:block lg:w-[49%]">
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
        </Card> */}
      </section>
    </>
  );
};

export default Menu;
