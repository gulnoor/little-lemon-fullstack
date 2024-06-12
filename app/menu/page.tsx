import Image from "next/image";
import dbConnect from "../lib/connectDatabase";
import bgimg2 from "/public/assets/images/restauranfood.webp";
import MenuItem from "../lib/models/menuItem";
import "./menu.scss";
// import MyButton from "../ui/MyButton";

const Menu = async () => {
  let menu = [];
  try {
    await dbConnect();
    menu = await MenuItem.find({});
  } catch (err) {
    console.log(err);
    return <h1>couldn't connect to databse :( please refresh the page</h1>;
  }
  return (
    <>
      <div className=" menu-hero">
        <div className="menu-title">
          <h1>Menu</h1>
          <p>traditional recipes served with a modern twist</p>
        </div>
        <Image className="menuheroimg" alt={"hero image"} src={bgimg2} />
      </div>
      <section className="p-0 flex flex-wrap justify-center gap-3 md:gap-0">
        {menu.map((item) => (
          <div
            className=" max-h-[220px] rounded-2xl flex items-center w-full xl:w-[43%] bg-[var(--md-sys-color-surface-container-high)] md:p-2 md:m-4 "
            key={item.name}
          >
            <div>
              <Image
                className="ml-3 w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
                width={200}
                height={200}
                src={item.image}
                alt={item.name}
                style={{
                  objectFit: "cover",
                  maxWidth: "200px",
                  borderRadius: "32px",
                }}
              />
            </div>
            <div className="flex flex-col justify-center m-4">
              <h2>{item.name}</h2>
              <p className="line-clamp-2">{item.description}</p>
              <p>Price: ${item.price}</p>
            </div>
            {/* <MyButton variant="outlined">-</MyButton>
            <MyButton variant="outlined">+</MyButton> */}
          </div>
        ))}
      </section>
    </>
  );
};

export default Menu;
