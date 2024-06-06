"use client";

import ThemeProvider from "../lib/contexts/themeContext";
import HtmlComponent from "./HtmlComponent";

const RootComponent = ({ children }) => {
  
  return (
    <ThemeProvider>
        <HtmlComponent>{children}</HtmlComponent>
    </ThemeProvider>
  );
};

export default RootComponent;
