"use client";
import Link from "next/link";
import { TokenContext } from "../lib/contexts/tokenContext";
import { useContext } from "react";

const NavRail = ({ links }) => {
  const { token } = useContext(TokenContext);
  return (
    <div>
      {links.map((link: { key: String; name: String; href: String }) => (
        <Link key={link.name} href={link.href}>
          <p>{link.name}</p>
        </Link>
      ))}
      {token ? (
        <Link key={"dashboard"} href={"/dashboard"}>
          <p>Dashboard</p>
        </Link>
      ) : (
        <Link key={"login"} href={"/login"}>
          <p>Login</p>
        </Link>
      )}
    </div>
  );
};

export default NavRail;
