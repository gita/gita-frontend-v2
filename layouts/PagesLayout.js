import React from "react";
import Footer from "../components/Footers/Footer";
import PageHeader from "../components/Headers/PageHeader";

const PagesLayout = ({ children }) => {
  return (
    <div className="dark:bg-dark-bg">
      <PageHeader />
      {children}
      <Footer />
    </div>
  );
};

export default PagesLayout;
