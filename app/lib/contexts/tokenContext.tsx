"use client";
import { createContext, useEffect, useState } from "react";

export const TokenContext = createContext({ token: "" });

const TokenProvider = ({ children }) => {
  function getToken() {
    if (
      typeof window !== "undefined" &&
      !window.localStorage.getItem("token")
    ) {
      // window.localStorage.setItem("token", "");
      return "";
    } else if (typeof window !== "undefined") {
      return window.localStorage.getItem("token");
    }
    return "";
  }
  // TODO: use isClient state and verify token from server after reading it from local storage
  const [token, setToken] = useState(getToken());

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