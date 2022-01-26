import React from "react";
import Footer from "../components/Footers/Footer";
import ChapterHeader from "../components/Headers/ChapterHeader";

const PagesLayout = ({ children }) => {
  return (
    <div className="dark:bg-dark-bg">
      <ChapterHeader />
      {children}
      <Footer />
    </div>
  );
};

export default PagesLayout;
