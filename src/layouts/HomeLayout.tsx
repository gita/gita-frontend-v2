import { ReactNode } from "react";

import Footer from "../components/Footers/Footer";
import IndexHeader from "../components/Headers/IndexHeader";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col dark:bg-dark-bg">
      <IndexHeader />
      <div className="flex-1 pt-[84px] lg:pt-[90px]">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
