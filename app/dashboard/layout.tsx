"use client";
import React, { useContext } from "react";
import { TokenContext } from "../lib/contexts/tokenContext";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const { setToken, setLoggedin } = useContext(TokenContext);
  const router = useRouter();

  return (
    <>
      <section className="animate__animated animate__zoomIn animate__faster">
        <h1>Dashboard</h1>
        <button
          className="
              bg-[var(--md-sys-color-primary)] 
              min-h-[48px] 
              my-4
              text-xl text-[var(--md-sys-color-on-primary)] 
              rounded-full  
              flex justify-center items-center 
              px-4 py-3"
          onClick={() => {
            setToken("");
            setLoggedin(false);
            router.push("/login");
          }}
        >
          Log out
        </button>
        {children}
      </section>
    </>
  );
};

export default Layout;
