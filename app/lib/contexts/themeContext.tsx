import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  if (!window.localStorage.getItem("theme")) {
    window.localStorage.setItem("theme", "dark");
  }
  const [theme, setTheme] = useState(window.localStorage.getItem("theme"));
  const toggleTheme = () => {
    theme === "light" ? setTheme(() => "dark") : setTheme(() => "light");
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
