import dbConnect from "../lib/connectDatabase";
import MenuItem from "../lib/models/menuItem";

const Menu = async () => {
  await dbConnect();
  const menu = await MenuItem.find({});
  return (
    <div>
      {menu.map((item) => (
        <p key={item.name}>{item.name}</p>
      ))}
    </div>
  );
};

export default Menu;
