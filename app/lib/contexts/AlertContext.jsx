"use client";
import { createContext, useMemo, useState } from "react";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

export const AlertContext = createContext(null);

const AlertProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const openAlert = useMemo(() => {
    return (alert) => {
      setAlert(alert);
      setOpen(true);
    };
  }, []);

  return (
    <AlertContext.Provider value={{ openAlert }}>
      <Snackbar
        onClose={() => {
          setOpen(false);
          setAlert({ type: "", message: "" });
        }}
        open={open}
        autoHideDuration={6000}
      >
        <Alert
          onClose={() => {
            setOpen(false);
            setAlert({ type: "", message: "" });
          }}
          variant="filled"
          sx={{ width: "100%" }}
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
