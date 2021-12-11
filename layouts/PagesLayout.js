import React from "react";
import Footer from "../components/Footers/Footer";
import PageHeader from "../components/Headers/PageHeader";

const PagesLayout = ({ children }) => {
  return (
    <>
      <PageHeader />
      {children}
      <Footer />
    </>
  );
};

export default PagesLayout;
