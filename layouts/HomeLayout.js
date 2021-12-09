import React, { useEffect } from "react";
import Footer from "../components/Footers/Footer";
import IndexHeader from "../components/Headers/IndexHeader";
import { useDispatch, useSelector } from "react-redux";

const HomeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    console.log(settings);
  });

  return (
    <div className="">
      <IndexHeader />
      <div className="pt-24 lg:pt-28">{children}</div>
      <Footer />
      {/* <FooterBar/> */}
    </div>
  );
};

export default HomeLayout;
