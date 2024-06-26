"use client";
import { useColorScheme } from "@mui/material";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

function getTheme() {
  if (typeof window !== "undefined" && !window.localStorage.getItem("theme")) {
    window.localStorage.setItem("theme", "light");
    return "light";
  } else if (typeof window !== "undefined") {
    return window.localStorage.getItem("theme");
  }
  return "";
}

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme());
  const { mode, setMode } = useColorScheme();
  const [checked, setchecked] = useState(() =>
    theme === "dark" ? true : false
  );

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme(() => "dark");
      setMode("dark");
    } else {
      setTheme(() => "light");
      setMode("light");
    }
  };
  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, checked, setchecked }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
