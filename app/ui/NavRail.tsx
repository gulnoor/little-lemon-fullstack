"use client";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../lib/contexts/tokenContext";
import { ThemeContext } from "../lib/contexts/themeContext";
import sun from "@/public/assets/nav-icons/light_mode_FILL0_wght400_GRAD0_opsz24.svg";
import moon from "@/public/assets/nav-icons/dark_mode_FILL0_wght400_GRAD0_opsz24.svg";
import cart from "@/public/assets/nav-icons/shopping_cart_FILL0_wght400_GRAD0_opsz24.svg";
import { Badge } from "@mui/material";
import { CartContext } from "../lib/contexts/cartContext";
import { usePathname } from "next/navigation";

export const NavLink = (props) => {
  return (
    <Link
      className={`
        ${props.className}
        flex flex-col 
        py-3
        justify-center items-center
        ${props.path === props.href ? "text-[var(--md-sys-color-primary)]" : ""}`}
      key={props.name}
      href={props.href}
      onClick={props.onClick}
    >
      {
        <Image
          className={`nav-icon transition-all ${
            props.path === props.href ? "active-nav scale-125" : ""
          }`}
          src={props.image}
          width={25}
          height={25}
          alt={`${props.name} icon`}
        />
      }
      <p>{props.name}</p>
      <p>{props.children}</p>
    </Link>
  );
};

const NavRail = ({ links }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { token, loggedin } = useContext(TokenContext);
  const { cartState } = useContext(CartContext);
  const [isMounted, setIsMounted] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav
      className="
    fixed
    bottom-0 md:top-0 md:bottom-0
    flex flex-row md:flex-col
    justify-evenly md:justify-start
    items-center
    h-fit md:h-full
    w-full md:w-[140px] 
    bg-[var(--md-sys-color-surface-container-highest)] md:bg-transparent
    md:p-4 md:py-20
    z-50
    "
    >
      {links.map(
        (link: { key: String; name: String; href: String; image: String }) => (
          <NavLink
            path={path}
            key={link.name}
            href={link.href}
            name={link.name}
            image={link.image}
            theme={theme}
          ></NavLink>
        )
      )}
      {(
        <Badge
          invisible={cart.length > 0}
          badgeContent={cartState.length}
          color="primary"
          style={{
            width: "fit-content",
          }}
          sx={{
            "& span": {
              top: "14px",
              right: "8px",
            },
          }}
        >
          <NavLink
            path={path}
            className="p-0"
            key={"cart"}
            href={"/checkout"}
            image={cart}
            theme={theme}
          >
            Cart
          </NavLink>
        </Badge>
      )}
      {isMounted && (
        <NavLink
          path={path}
          className="
          hidden md:flex 
          md:mt-auto "
          key={"theme"}
          href={""}
          image={theme === "dark" ? sun : moon}
          theme={theme}
          onClick={toggleTheme}
        ></NavLink>
      )}
      {isMounted ? (
        loggedin ? (
          <NavLink
            path={path}
            className="hidden md:flex"
            name="Dashboard"
            key={"dashboard"}
            href={"/dashboard"}
            theme={theme}
            image="/assets/nav-icons/account_circle_FILL0_wght400_GRAD0_opsz24.svg"
          ></NavLink>
        ) : (
          <NavLink
            path={path}
            className="hidden md:flex"
            name="Login"
            key={"login"}
            theme={theme}
            href={"/login"}
            image={
              "/assets/nav-icons/account_circle_FILL0_wght400_GRAD0_opsz24.svg"
            }
          ></NavLink>
        )
      ) : null}
    </nav>
  );
};

export default NavRail;
