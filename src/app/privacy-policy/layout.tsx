import { ReactNode } from "react";
import HomeLayout from "../../layouts/HomeLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}
