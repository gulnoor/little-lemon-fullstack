"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AlertContext } from "./AlertContext";

export const TokenContext = createContext({ token: "" });
const TokenProvider = ({ children }) => {
  const { openAlert } = useContext(AlertContext);
  const [token, setToken] = useState(getToken());
  const [loggedin, setLoggedin] = useState(false);
  const authenticate = async () => {
    let response = null;
    try {
      response = await fetch("/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 500) {
        return openAlert({
          type: "error",
          message: `user authentication failed due to : ${response.statusText}`,
        });
      }
      response = await response.json();
      //FIXME: //!if there's internal server error other than authentication e.g database => setLoggenin is not executed
      response.type === "success" ? setLoggedin(true) : setLoggedin(false);
      // openAlert(response);
    } catch (err) {
      // openAlert({ type: "error", message: err.message });
    }
  };
  function getToken() {
    if (
      typeof window !== "undefined" &&
      !window.localStorage.getItem("token")
    ) {
      // window.localStorage.setItem("token", "");
      return "";
    } else if (typeof window !== "undefined") {
      return window.localStorage.getItem("token");
    }
    return "";
  }
  // // TODO: use isClient state and verify token from server after reading it from local storage

  useEffect(() => {
    authenticate();
  }, []);
  useEffect(() => {
    window.localStorage.setItem("token", token);
  }, [token]);
  return (
    <TokenContext.Provider value={{ token, setToken, loggedin, setLoggedin }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
