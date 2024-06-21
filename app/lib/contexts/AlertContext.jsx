"use client";
import { createContext, useMemo, useState } from "react";
import Alert from "@mui/material/Alert";
import { Slide, Snackbar, useMediaQuery, useTheme } from "@mui/material";

export const AlertContext = createContext(null);

const AlertProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const openAlert = useMemo(() => {
    return (alert) => {
      setAlert(alert);
      setOpen(true);
    };
  }, []);
  const handleClose = useMemo(() => {
    return (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };
  }, []);

  return (
    <AlertContext.Provider value={{ openAlert }}>
      <Snackbar
        anchorOrigin={
          isMediumScreen
            ? { horizontal: "right", vertical: "bottom" }
            : { horizontal: "center", vertical: "top" }
        }
        onClose={handleClose}
        open={open}
        autoHideDuration={5000}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          sx={{
            width: "100%",
            minHeight: "80px",
            justifyContent: "center",
            alignItems: "center",
          }}
          severity={alert.type}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
