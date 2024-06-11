"use client";
import { useContext } from "react";
import NavRail from "../NavRail";
import Footer from "../footer";
import { ThemeContext } from "../../lib/contexts/themeContext";
const LINKS = [
  {
    name: "Home",
    href: "/",
    image: "/assets/nav-icons/home_FILL0_wght400_GRAD0_opsz24 (1).svg",
  },
  {
    name: "Menu",
    href: "/menu",
    image: "/assets/nav-icons/restaurant_menu_FILL0_wght400_GRAD0_opsz24.svg",
  },
  {
    name: "Reservation",
    href: "/reservation",
    image: "/assets/nav-icons/table_restaurant_FILL0_wght400_GRAD0_opsz24.svg",
  },
];
const App = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`${theme} text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface)]`}
      id="app"
    >
      <NavRail links={LINKS}></NavRail>
      <main id="main" className=" overflow-hidden md:ml-[136px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default App;
