"use client";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme());
  function getTheme() {
    if (
      typeof window !== "undefined" &&
      !window.localStorage.getItem("theme")
    ) {
      window.localStorage.setItem("theme", "light");
      return "light";
    } else if (typeof window !== "undefined") {
      return window.localStorage.getItem("theme");
    }
    return "";
  }
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme(() => "dark");
    } else {
      setTheme(() => "light");
    }
  };

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
