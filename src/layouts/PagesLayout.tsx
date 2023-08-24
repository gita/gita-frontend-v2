import { ReactNode } from "react";

import Footer from "../components/Footers/Footer";

const PagesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col justify-between dark:bg-dark-bg">
      <div className="flex-1">
        {/* to fix footer when no data */}
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PagesLayout;
