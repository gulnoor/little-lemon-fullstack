"use client";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../lib/contexts/tokenContext";
import { ThemeContext } from "../lib/contexts/themeContext";
import sun from "@/public/assets/nav-icons/light_mode_FILL0_wght400_GRAD0_opsz24.svg";
import moon from "@/public/assets/nav-icons/dark_mode_FILL0_wght400_GRAD0_opsz24.svg";

const NavLink = (props) => {
  return (
    <Link
      className={`${props.className} flex flex-col justify-center items-center p-2`}
      key={props.name}
      href={props.href}
      onClick={props.onClick}
    >
      <Image
        src={props.image}
        width={30}
        height={30}
        alt={`${props.name} icon`}
      />
      <p>{props.name}</p>
      <p>{props.children}</p>
    </Link>
  );
};

const NavRail = ({ links }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { token } = useContext(TokenContext);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav
      className="
    bg-[var(--md-sys-color-surface-container-highest)] md:bg-transparent
    z-50 
    flex flex-row md:flex-col
    h-fit md:h-full
    bottom-0 md:top-0 md:bottom-0 
    justify-evenly md:justify-start 
    w-full md:w-[140px]  
    md:p-4 md:py-20
    fixed 
    "
    >
      {links.map(
        (link: { key: String; name: String; href: String; image: String }) => (
          <NavLink
            key={link.name}
            href={link.href}
            name={link.name}
            image={link.image}
          ></NavLink>
        )
      )}
      {
        <NavLink
          className="hidden md:flex md:mt-auto "
          key={"theme"}
          href={""}
          image={theme === "dark" ? sun : moon}
          onClick={toggleTheme}
        ></NavLink>
      }
      {token ? (
        <NavLink
          name="Dashboard"
          key={"dashboard"}
          href={"/dashboard"}
          image="/assets/nav-icons/account_circle_FILL0_wght400_GRAD0_opsz24.svg"
        ></NavLink>
      ) : (
        <NavLink
          name="Login"
          key={"login"}
          href={"/login"}
          image={
            "/assets/nav-icons/account_circle_FILL0_wght400_GRAD0_opsz24.svg"
          }
        ></NavLink>
      )}
    </nav>
  );
};

export default NavRail;
