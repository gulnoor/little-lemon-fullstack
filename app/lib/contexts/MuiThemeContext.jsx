"use client";

import {
  Experimental_CssVarsProvider,
  experimental_extendTheme,
} from "@mui/material";
import { useMemo } from "react";

const MUICustomThemeProvider = ({ children }) => {
  const muiTheme = useMemo(
    () =>
      experimental_extendTheme({
        colorSchemes: {
          light: {
            palette: {
              mode: "light",
              primary: {
                main: "#6f5d0e",
              },
              secondary: {
                main: "#675e40",
              },
            },
          },
          dark: {
            palette: {
              mode: "dark",
              primary: {
                main: "#ddc66e",
              },
              secondary: {
                main: "#d2c6a1",
              },
            },
          },
        },
        components: {
          MuiButton: {
            
            variants: [
              {
                props: {
                  variant: "contained",
                },
                style: {
                  borderRadius: "999px",
                  minHeight: "48px",
                },
              },
              {
                props: {
                  variant: "text",
                },
                style: {
minWidth:"48px"
                },
              },
              {
                props: {
                  variant: "outlined",
                },
                style: {
                  border: "2px solid",
                  borderRadius: "999px",
                  boxSizing: "border-box",
                  minHeight: "48px",
                  "&:hover": {
                    border: "2px solid",
                  },
                },
              },
            ],
          },
        },
      }),
    []
  );
  return (
    <Experimental_CssVarsProvider theme={muiTheme}>
      {children}
    </Experimental_CssVarsProvider>
  );
};

export default MUICustomThemeProvider;
