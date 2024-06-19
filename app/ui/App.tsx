"use client";
import { useContext, useEffect, useRef, useState } from "react";
import NavRail, { NavLink } from "./NavRail";
import Footer from "./footer";
import AlertProvider from "@/app/lib/contexts/AlertContext";
import { ThemeContext } from "../lib/contexts/themeContext";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { AppBar, IconButton, Slide, Toolbar } from "@mui/material";
import { MaterialUISwitch } from "./ToggleButton";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import logo from "@/public/assets/images/Asset 9@4x.png";
import { TokenContext } from "../lib/contexts/tokenContext";
import MyButton from "./MyButton";
import Link from "next/link";
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

  const { loggedin } = useContext(TokenContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const muitheme = useTheme();
  const [checked, setChecked] = useState(false);
  const [transparent, setTransparent] = useState(true);

  useEffect(() => {
    appRef.current.classList.add(theme);

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > 16) {
        setTransparent(false);
      } else {
        setTransparent(true);
      }
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    setIsMounted(true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={appRef}
      suppressHydrationWarning
      className={`${theme} text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface)] `}
      id="app"
    >
      <NavRail links={LINKS}></NavRail>
      <main
        id="main"
        className="p-2 pt-[65px] md:p-6 md:pl-0 overflow-clip md:ml-[110px]"
      >
        <AppBar
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(-100%)",
            transition: "transform 0.3s ease-in-out",
            // backgroundColor:transparent? "transparent":,
            background: transparent
              ? "none"
              : "var(--md-sys-color-surface-container-high)",
            boxShadow: transparent ? "none" : "0px 1px 12px #2c2828e5",
            color: "var(--md-sys-color-on-surface)",
          }}
          sx={{
            justifyContent: "center",
            minHeight: "60px",
            "@media screen and (min-width: 768px)": {
              display: "none",
            },
          }}
        >
          <Toolbar>
            <div className="flex flex-grow">
              <Image
                alt="company logo"
                src={logo}
                height={33}
                className=""
              ></Image>
              <p className="flex ml-[12px] justify-center items-center text-[var(--md-sys-color-on-surface)]">
                LITTLE LEMON
              </p>
            </div>
            {isMounted && (
              <MaterialUISwitch
                theme={muitheme}
                checked={theme === "dark" ? true : false}
                onChange={(e) => {
                  setChecked(e.target.checked);
                  toggleTheme();
                }}
              />
            )}
            {isMounted ? (
              loggedin ? (
                <NavLink
                  href={"/dashboard"}
                  theme={theme}
                  image="/assets/nav-icons/account_circle_FILL0_wght400_GRAD0_opsz24.svg"
                ></NavLink>
              ) : (
                <Link
                  style={{
                    paddingLeft: "10px",
                    color: "var(--md-sys-color-on-surface)",
                  }}
                  href={"/login"}
                >
                  Log In
                </Link>
              )
            ) : null}
            {/* <IconButton edge={"end"}>
              <ShoppingBagIcon />
            </IconButton> */}
          </Toolbar>
        </AppBar>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default App;
