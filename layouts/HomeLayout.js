import React from "react";
import Footer from "../components/Footers/Footer";
import IndexHeader from "../components/Headers/IndexHeader";

const HomeLayout = ({ children }) => {
  return (
    <>
      <IndexHeader />
      {children}
      <Footer />
      {/* <FooterBar/> */}
    </>
  );
};

export default HomeLayout;
