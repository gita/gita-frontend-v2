import HomeLayout from "../../layouts/HomeLayout";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}
