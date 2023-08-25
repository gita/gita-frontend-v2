import { ReactNode } from "react";

import Footer from "../components/Footers/Footer";
import ChapterHeader from "../components/Headers/ChapterHeader";

type Props = {
  locale: Locale;
};

const ChapterLayout = ({
  children,
  locale,
}: React.PropsWithChildren<Props>) => {
  return (
    <div className="dark:bg-dark-bg">
      <ChapterHeader locale={locale} />
      {children}
      <Footer />
    </div>
  );
};

export default ChapterLayout;
