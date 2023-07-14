import { ReactNode } from "react";
import Footer from "../components/Footers/Footer";

const PagesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dark:bg-dark-bg min-h-screen flex flex-col justify-between">
      <div className="flex-1">
        {/* to fix footer when no data */}
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PagesLayout;
