import { createContext, useEffect, useState } from "react";
interface TokenContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const TokenContext = createContext<TokenContextProps | undefined>(
  undefined
);

const TokenProvider = ({ children }) => {
  if (!window.localStorage.getItem("token")) {
    window.localStorage.setItem("token", "");
  }
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    window.localStorage.setItem("token", token!);
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
