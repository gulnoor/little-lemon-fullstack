"use client";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  //   if (!window.localStorage.getItem("theme")) {
  //     window.localStorage.setItem("theme", "dark");
  //   }
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    theme === "light" ? setTheme(() => "dark") : setTheme(() => "light");
  };

  useEffect(() => {
    const t = window.localStorage.getItem("theme");
    if (t) {
      setTheme(t);
    } else {
      window.localStorage.setItem("theme", "dark");
    }
  }, []);


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
