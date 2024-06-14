import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <section className="animate__animated animate__fadeInUp animate__faster">
        <h1>Dashboard</h1>
        
        {children}
      </section>
    </>
  );
};

export default Layout;
