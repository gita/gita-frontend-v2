import PagesLayout from "../../layouts/PagesLayout";
import React from "react";

// @ts-ignore
export default function Layout({ children }: { children: React.ReactNode }) {
  return <PagesLayout>{children}</PagesLayout>;
}
