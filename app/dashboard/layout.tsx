import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <section>
        <h1>Dashboard</h1>
        
        {children}
      </section>
    </>
  );
};

export default Layout;
