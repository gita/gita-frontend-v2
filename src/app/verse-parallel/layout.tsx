import PagesLayout from "../../layouts/PagesLayout";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PagesLayout>{children}</PagesLayout>;
}
