"use client";
import { createContext, useEffect, useState } from "react";

export const TokenContext = createContext({ token: "" });

const TokenProvider = ({ children }) => {
  // function readToken() {
  //   if (
  //     typeof window !== "undefined" &&
  //     !window.localStorage.getItem("theme")
  //   ) {
  //     window.localStorage.setItem("token", "");
  //     return "";
  //   } else if (typeof window !== "undefined") {
  //     return window.localStorage.getItem("token");
  //   }
  // }

  // TODO: use isClient state and verify token from server after reading it from local storage
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(() => window.localStorage.getItem("token"));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("token", token);
  }, [token]);
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
