"use client";

// import {
//   Experimental_CssVarsProvider,
//   experimental_extendTheme,
// } from "@mui/material";
import ThemeProvider from "../lib/contexts/themeContext";
import HtmlComponent from "./HtmlComponent";

const RootComponent = ({ children }) => {
  // const cssvarstheme = useMemo(
  //   () =>
  //     experimental_extendTheme({
  //       colorSchemes: {
  //         light: {
  //           palette: {
  //             primary: {
  //               main: "rgb(111 93 14)",
  //               contrastText: "rgb(255 255 255)",
  //             },
  //             secondary: {
  //               main: "rgb(103 94 64)",
  //             },
  //             error: {
  //               main: "rgb(186 26 26)",
  //             },
  //           },
  //         },
  //         dark: {
  //           palette: {
  //             primary: {
  //               main: "rgb(221 198 110)",
  //               contrastText: "rgb(58 48 0)",
  //             },
  //             secondary: {
  //               main: "rgb(210 198 161)",
  //             },
  //             error: {
  //               main: "rgb(255 180 171)",
  //             },
  //           },
  //         },
  //       },
  //       components: {
  //         MuiButton: {
  //           variants: [
  //             {
  //               props: {
  //                 variant: "contained",
  //               },
  //               style: {
  //                 borderRadius: "999px",
  //                 minHeight: "48px",
  //               },
  //             },
  //             {
  //               props: {
  //                 variant: "outlined",
  //               },
  //               style: {
  //                 border: "2px solid",
  //                 borderRadius: "999px",
  //                 boxSizing: "border-box",
  //                 minHeight: "48px",
  //                 "&:hover": {
  //                   border: "2px solid",
  //                 },
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     }),
  //   []
  // );

  return (
    <ThemeProvider>
      <HtmlComponent>{children}</HtmlComponent>
    </ThemeProvider>
  );
};

export default RootComponent;
