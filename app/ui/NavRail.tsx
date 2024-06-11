"use client";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { TokenContext } from "../lib/contexts/tokenContext";
import { ThemeContext } from "../lib/contexts/themeContext";

const NavLink = (props) => {
  return (
    <Link
      className="flex flex-col justify-center items-center p-2"
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
      {props.children}
    </Link>
  );
};

const NavRail = ({ links }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { token } = useContext(TokenContext);
  return (
    <nav className="flex flex-row h-fit w-full bottom-0 md:flex-col justify-between md:justify-start items-center md:w-fit md:min-h-screen md:p-4 fixed md:py-10">
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
      {
        <NavLink
          name="Toggle Theme"
          key={"theme"}
          href={""}
          image={
            "/assets/nav-icons/account_circle_FILL0_wght400_GRAD0_opsz24.svg"
          }
          onClick={toggleTheme}
        >
          {theme}
        </NavLink>
      }
    </nav>
  );
};

export default NavRail;
