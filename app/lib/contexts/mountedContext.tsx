"use client";
import { createContext, useEffect, useState } from "react";

export const IsMountedContext = createContext(null);

const IsMountedProvider = ({children}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <IsMountedContext.Provider value={isMounted}>
      {children}
    </IsMountedContext.Provider>
  );
};

export default IsMountedProvider;
