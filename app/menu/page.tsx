import dbConnect from "../lib/connectDatabase";
import MenuItem from "../lib/models/menuItem";
import MyButton from "../ui/MyButton";

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
          <MyButton variant="outlined">-</MyButton>
          <MyButton variant="outlined">+</MyButton>
        </div>
      ))}
    </>
  );
};

export default Menu;
