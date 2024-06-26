import Image from "next/image";
import OurSpecials from "./ui/OurSpecials";
import localFont from "next/font/local";
import logo from "../public/assets/images/Asset 9@4x.png";
import bros from "../public/assets/images/Mario and Adrian A.jpg";
import MyButton from "./ui/MyButton";
import Link from "next/link";
import { Button } from "@mui/material";

const displayFont = localFont({ src: "../public/fonts/jellies.regular.ttf" });
//TODO: fetch specials from server
const specials = [
  {
    name: "Baklava",
    description:
      "Traditional Greek dessert with flaky phyllo dough filled with nuts and honey.",
    price: 12,
    category: "Dessert",
    image: "/assets/images/menu/105a4e88dca44f4a81dbaf6ccb7b83bc.jpg",
  },

  {
    name: "Lamb Chops",
    description:
      "Grilled lamb chops served with a mint yogurt sauce and roasted potatoes.",
    price: 24,
    category: "Entree",
    image: "/assets/images/menu/Lamb-Chops-ONE-1.jpg",
  },
  {
    name: "Brushetta",
    description:
      "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. Toppings of tomato, veggies, beans, cured pork, or cheese are examples of variations.",
    image:
      "/assets/images/menu/54165-balsamic-bruschetta-DDMFS-4x3-e2b55b5ca39b4c1783e524a2461634ea.webp",
    price: "$7.99",
    category: "Appetizer",
  },
  {
    name: "Pasta Primavera",
    description:
      "Fresh pasta with seasonal vegetables and a creamy tomato sauce.",
    price: 26,
    category: "Entree",
    image: "/assets/images/menu/pasta-primavera-1-768x1152.jpg",
  },
];
export default function Home() {
  return (
    <>
      <section
        className="
        bg-[var(--md-sys-color-primary-container)] 
        flex flex-row justify-evenly 
        min-h-[520px] md:min-h-[670px]
        animate__animated animate__zoomIn animate__faster"
      >
        <div
          className="
        flex flex-col 
        gap-2 sm:gap-0 
        justify-center items-center sm:items-start"
        >
          <h1
            className={` sm:text-left  text-center  ${displayFont.className}  mb-6 text-6xl sm:text-7xl md:text-8xl text-[var(--md-sys-color-primary)]`}
          >
            LITTLE LEMON
          </h1>
          <h2 className="text-4xl md:text-6xl sm:mb-8 text-[var(--md-sys-color-on-primary-container))]">
            Chicago
          </h2>
          <h5 className="text-center sm:text-left sm:mb-5">
            traditional recipes served with a modern twist
          </h5>
          <Link className=" sm:mb-4 w-full xsm:w-fit" href={"/menu"}>
            <Button
              sx={{
                fontSize: "1.3rem",
                width: "100%",
                maxWidth: "450px",
                minHeight: "48px",
              }}
              variant="outlined"
            >
              Order Online
            </Button>
          </Link>
          <Link className="w-full xsm:w-fit" href={"/booking"}>
            <Button
              sx={{
                fontSize: "1.3rem",
                width: "100%",
                maxWidth: "450px",
                minHeight: "48px",
              }}
              variant="contained"
            >
              Reserve a Table
            </Button>
          </Link>
        </div>
        <Image
          className="hidden sm:block"
          src={logo}
          alt={`Little Lemon Logo`}
          style={{ objectFit: "contain", maxWidth: "150px" }}
        />
      </section>
      <OurSpecials items={specials} />
      <section
        className="
      
      mb-[60px] md:mb-0 
      flex flex-wrap-reverse 
      justify-between items-center 
      max-w-[1000px] mx-auto
      "
      >
        <article className="flex flex-col w-full lg:w-3/5 my-4">
          <h1 className="my-6 md:my-10">About Us</h1>
          <p className="text-justify text-lg">
            Based in Chicago, Illinois, Little Lemon is a family-owned
            Mediterranean restaurant, focused on traditional recipes served with
            a modern twist. The chefs draw inspiration from Italian, Greek, and
            Turkish culture and have a menu of 12-15 items that they rotate
            seasonally. The restaurant has a rustic and relaxed atmosphere with
            moderate prices, making it a popular place for a meal any time of
            the day.
          </p>
          <br />
          <p className="text-justify text-lg">
            Little Lemon is owned by two Italian brothers, Mario and Adrian, who
            moved to the United States to pursue their shared dream of owning a
            restaurant. To craft the menu, Mario relies on family recipes and
            his experience as a chef in Italy. Adrian does all the marketing for
            the restaurant and led the effort to expand the menu beyond classic
            Italian to incorporate additional cuisines from the Mediterranean
            region.
          </p>
        </article>
        <Image
          className="w-full h-full lg:w-[35%] lg:h-[400px]"
          style={{
            objectFit: "cover",
            borderRadius: "26px",
          }}
          src={bros}
          alt="Mario and Adrian"
        />
      </section>
    </>
  );
}
