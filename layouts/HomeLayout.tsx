import { ReactNode } from "react";
import Footer from "../components/Footers/Footer";
import IndexHeader from "../components/Headers/IndexHeader";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dark:bg-dark-bg min-h-screen flex flex-col">
      <IndexHeader />
      <div className="pt-24 lg:pt-28 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
