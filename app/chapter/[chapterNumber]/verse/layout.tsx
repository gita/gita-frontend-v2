import { ReactNode } from "react";
import PagesLayout from "../../../../layouts/PagesLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <PagesLayout>{children}</PagesLayout>;
}
