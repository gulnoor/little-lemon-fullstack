import { Button } from "@mui/material";
import dbConnect from "../lib/connectDatabase";
import MenuItem from "../lib/models/menuItem";

const Menu = async () => {
  await dbConnect();
  const menu = await MenuItem.find({});
  return (
    <>
      {menu.map((item) => (
        <div key={item.name}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          <Button variant="outlined">-</Button>
          <Button variant="outlined">+</Button>
        </div>
      ))}
    </>
  );
};

export default Menu;
