"use client";
import { createContext, useEffect, useState } from "react";

export const TokenContext = createContext(null);

const TokenProvider = ({ children }) => {
  if (!window.localStorage.getItem("token")) {
    window.localStorage.setItem("token", "");
  }
  const [token, setToken] = useState(window.localStorage.getItem("token"));

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
