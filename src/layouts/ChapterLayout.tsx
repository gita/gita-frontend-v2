import { ReactNode } from "react";

import Footer from "../components/Footers/Footer";
import ChapterHeader from "../components/Headers/ChapterHeader";

const ChapterLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dark:bg-dark-bg">
      <ChapterHeader />
      {children}
      <Footer />
    </div>
  );
};

export default ChapterLayout;
