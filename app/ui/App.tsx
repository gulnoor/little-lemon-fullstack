"use client";
import { useContext, useEffect, useRef } from "react";
import NavRail from "./NavRail";
import Footer from "./footer";
import AlertProvider from "@/app/lib/contexts/AlertContext";
import { ThemeContext } from "../lib/contexts/themeContext";
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
    href: "/booking",
    image: "/assets/nav-icons/table_restaurant_FILL0_wght400_GRAD0_opsz24.svg",
  },
];
const App = ({ children }) => {
  const appRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    appRef.current.classList.add(theme);
  }, []);

  return (
    <AlertProvider>
      <div
        ref={appRef}
        suppressHydrationWarning
        className={`${theme}  text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface)]`}
        id="app"
      >
        <NavRail links={LINKS}></NavRail>
        <main id="main" className=" overflow-hidden md:ml-[110px]">
          {children}
        </main>
        <Footer />
      </div>
    </AlertProvider>
  );
};

export default App;
