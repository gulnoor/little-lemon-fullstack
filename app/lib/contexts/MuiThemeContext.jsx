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
              // primary: "#6F5D0E",
              surfaceTint: "#6F5D0E",
              onPrimary: "#FFFFFF",
              primaryContainer: "#FBE187",
              onPrimaryContainer: "#221B00",
              // secondary: "#675E40",
              onSecondary: "#FFFFFF",
              secondaryContainer: "#EFE2BC",
              onSecondaryContainer: "#211B04",
              tertiary: "#44664D",
              onTertiary: "#FFFFFF",
              tertiaryContainer: "#C6ECCC",
              onTertiaryContainer: "#00210E",
              // error: "#BA1A1A",
              onError: "#FFFFFF",
              errorContainer: "#FFDAD6",
              onErrorContainer: "#410002",
              // background: "#FFF8EF",
              onBackground: "#1E1B13",
              surface: "#FFF8EF",
              onSurface: "#1E1B13",
              surfaceVariant: "#EAE2CF",
              onSurfaceVariant: "#4B4639",
              outline: "#7D7767",
              outlineVariant: "#CEC6B4",
              shadow: "#000000",
              scrim: "#000000",
              inverseSurface: "#333027",
              inverseOnSurface: "#F7F0E2",
              inversePrimary: "#DEC56E",
              primaryFixed: "#FBE187",
              onPrimaryFixed: "#221B00",
              primaryFixedDim: "#DEC56E",
              onPrimaryFixedVariant: "#554600",
              secondaryFixed: "#EFE2BC",
              onSecondaryFixed: "#211B04",
              secondaryFixedDim: "#D2C6A1",
              onSecondaryFixedVariant: "#4E462A",
              tertiaryFixed: "#C6ECCC",
              onTertiaryFixed: "#00210E",
              tertiaryFixedDim: "#AAD0B1",
              onTertiaryFixedVariant: "#2D4E37",
              surfaceDim: "#E0D9CC",
              surfaceBright: "#FFF8EF",
              surfaceContainerLowest: "#FFFFFF",
              surfaceContainerLow: "#FAF3E5",
              surfaceContainer: "#F4EDDF",
              surfaceContainerHigh: "#EFE7DA",
              surfaceContainerHighest: "#E9E2D4",
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

              // primary: "#DEC56E",
              surfaceTint: "#DEC56E",
              onPrimary: "#3B2F00",
              primaryContainer: "#554600",
              onPrimaryContainer: "#FBE187",
              // secondary: "#D2C6A1",
              onSecondary: "#373016",
              secondaryContainer: "#4E462A",
              onSecondaryContainer: "#EFE2BC",
              tertiary: "#AAD0B1",
              onTertiary: "#163722",
              tertiaryContainer: "#2D4E37",
              onTertiaryContainer: "#C6ECCC",
              // error: "#FFB4AB",
              onError: "#690005",
              errorContainer: "#93000A",
              onErrorContainer: "#FFDAD6",
              // background: "#16130B",
              onBackground: "#E9E2D4",
              surface: "#16130B",
              onSurface: "#E9E2D4",
              surfaceVariant: "#4B4639",
              onSurfaceVariant: "#CEC6B4",
              outline: "#979080",
              outlineVariant: "#4B4639",
              shadow: "#000000",
              scrim: "#000000",
              inverseSurface: "#E9E2D4",
              inverseOnSurface: "#333027",
              inversePrimary: "#6F5D0E",
              primaryFixed: "#FBE187",
              onPrimaryFixed: "#221B00",
              primaryFixedDim: "#DEC56E",
              onPrimaryFixedVariant: "#554600",
              secondaryFixed: "#EFE2BC",
              onSecondaryFixed: "#211B04",
              secondaryFixedDim: "#D2C6A1",
              onSecondaryFixedVariant: "#4E462A",
              tertiaryFixed: "#C6ECCC",
              onTertiaryFixed: "#00210E",
              tertiaryFixedDim: "#AAD0B1",
              onTertiaryFixedVariant: "#2D4E37",
              surfaceDim: "#16130B",
              surfaceBright: "#3C392F",
              surfaceContainerLowest: "#100E07",
              surfaceContainerLow: "#1E1B13",
              surfaceContainer: "#221F17",
              surfaceContainerHigh: "#2D2A21",
              surfaceContainerHighest: "#38352B",
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
                },
              },
              {
                props: {
                  variant: "text",
                },
                style: {},
              },
              {
                props: {
                  variant: "outlined",
                },
                style: {
                  border: "2px solid",
                  borderRadius: "999px",
                  boxSizing: "border-box",
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
