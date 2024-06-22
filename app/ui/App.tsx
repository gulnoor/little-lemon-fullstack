"use client";
import { useContext, useEffect, useRef, useState } from "react";
import NavRail, { NavLink } from "./NavRail";
import Footer from "./footer";
import AlertProvider from "@/app/lib/contexts/AlertContext";
import { ThemeContext } from "../lib/contexts/themeContext";
import TokenProvider from "../lib/contexts/tokenContext";
import CartProvider from "../lib/contexts/cartContext";
import MyAppBar from "./MyAppBar";
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
    <div
      ref={appRef}
      suppressHydrationWarning
      className={`${theme} text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-background)] `}
      id="app"
    >
      <AlertProvider>
        <TokenProvider>
          <CartProvider>
            <NavRail links={LINKS}></NavRail>
            <main
              id="main"
              className="min-h-screen p-2 pt-[65px] md:p-6 md:pl-0 overflow-clip md:ml-[110px]"
            >
              <MyAppBar />
              {children}
            </main>
            <Footer />
          </CartProvider>
        </TokenProvider>
      </AlertProvider>
    </div>
  );
};

export default App;
