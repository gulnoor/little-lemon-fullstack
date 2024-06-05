import Image from "next/image";
import { Button } from "@mui/material";
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
    <main className="">
      <section className=" flex flex-col p-4 ">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>traditional recipes served with a modern twist</p>
        <Button variant="contained">Order Online</Button>
        <Button variant="contained">Reserve a Table</Button>
      </section>
      <section>
        <h1>Our Specials</h1>
        {specials.map((item) => (
          <div key={item.name}>
            <h1>{item.name}</h1>
            <Image width={200} height={200} src={item.image} alt={item.name} />
            <p>{item.description}</p>
          </div>
        ))}
      </section>
      <section>
        <h1>About Us</h1>
        <article>
          <p>
            Based in Chicago, Illinois, Little Lemon is a family-owned
            Mediterranean restaurant, focused on traditional recipes served with
            a modern twist. The chefs draw inspiration from Italian, Greek, and
            Turkish culture and have a menu of 12-15 items that they rotate
            seasonally. The restaurant has a rustic and relaxed atmosphere with
            moderate prices, making it a popular place for a meal any time of
            the day.
          </p>
          <br />
          <p>
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
          width={200}
          height={200}
          src="/assets/images/Mario and Adrian A.jpg"
          alt="Mario and Adrian"
        />
      </section>
    </main>
  );
}
